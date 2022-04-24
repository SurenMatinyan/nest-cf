import { IResponse, IResponseMessage, IUser } from '@intrefaces';
import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseService, FileUploadService } from '@services';
import { NetworkEntity } from './network.entity';
import { Connection, Not, Repository } from 'typeorm';
import * as dto from './network.dto';
import {
  INVITATION_REPOSITORY,
  MASTER_DATABASE_CONNECTION,
  NETWORK_DATABASE_REPOSITORY,
  NETWORK_ONE_TIME_PAYMENT_REPOSITORY,
  NETWORK_REPOSITORY,
  USER_REPOSITORY,
} from '@constant';
import { NetworkOneTimePaymentEntity } from '../network-one-time-payment/network-one-time-payment.entity';
import { UserEntity } from '../user/user.entity';
import { InvitationEntity } from '../invitation/invitation.entity';
import { InvitationStatus } from '@enum';
import { GenerateTokenHelper } from '@helper';
import { MailerService } from 'src/common/services/mailer.service';
import { AdapterService } from '@services';
import { NetworkDatabaseService } from '../network-database/network-database.service';
import { NetworkDatabaseEntity } from '../network-database/network-database.entity';

@Injectable()
export class NetworkService extends BaseService<NetworkEntity> {
  constructor(
    @Inject(NETWORK_REPOSITORY)
    private readonly networkRepository: Repository<NetworkEntity>,
    @Inject(MASTER_DATABASE_CONNECTION)
    private readonly connection: Connection,
    @Inject(NETWORK_ONE_TIME_PAYMENT_REPOSITORY)
    private readonly networkOneTimePaymentRepository: Repository<NetworkOneTimePaymentEntity>,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @Inject(NETWORK_DATABASE_REPOSITORY)
    private readonly networkDatabaseRepository: Repository<NetworkDatabaseEntity>,
    private readonly mailerService: MailerService,
    private readonly adapterService: AdapterService,
    private readonly networkDatabaseService: NetworkDatabaseService,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(networkRepository);
  }

  /**
   * @description For get networks list, intended crossforce super admin
   *
   * @param user Request sent by this
   *
   * @returns List networks
   */
  async findAll(user: IUser): Promise<IResponse<NetworkEntity[]>> {
    const [data, count] = await this.networkRepository.findAndCount();
    return { data, metadata: { total: count } };
  }

  /**
   * @description Get a network info
   *
   * @param user
   * @param networkId network id
   * @returns
   */
  async findOne(
    user: IUser,
    networkId: string,
  ): Promise<IResponse<NetworkEntity>> {
    const network = await this.networkRepository
      .createQueryBuilder('network')
      .select()
      .leftJoinAndSelect('network.oneTimePayments', 'oneTimePayments')
      .where('network.id = :id', { id: networkId })
      .getOne();

    return { data: network, metadata: {} };
  }

  async update(
    user: IUser,
    dto: dto.UpdateNetworkDTO,
    networkId: string,
    file?,
  ): Promise<IResponseMessage> {
    const checkNetworkExistes = await this.networkRepository.findOne({
      subDirectory: dto.subDirectory,
      id: Not(networkId),
    });

    if (checkNetworkExistes) {
      throw new BadGatewayException({
        message: 'Sub directory alredy existes',
      });
    }

    let uploadObject: Partial<{ url: string }>;

    if (file) {
      uploadObject = await this.fileUploadService.uploadPublicFile({
        bufferData: file.buffer,
        fileName: file.originalname,
        folder: 'logo',
        mimetype: file.mimetype,
      });
    }

    const updateDatas = file
      ? {
          icon: uploadObject.url,
          name: dto.name,
          subDirectory: dto.subDirectory,
          maxMember: dto.maxMember,
          billingType: dto.billingType,
        }
      : {
          name: dto.name,
          subDirectory: dto.subDirectory,
          maxMember: dto.maxMember,
          billingType: dto.billingType,
        };

    const updateData = await this.networkRepository.update(
      { id: networkId },
      updateDatas,
    );

    if (dto.oneTimePayments && dto.oneTimePayments.length) {
      for (let i = 0; i < dto.oneTimePayments.length; i++) {
        await this.networkOneTimePaymentRepository.insert({
          paid: false,
          price: dto.oneTimePayments[i].price,
          description: dto.oneTimePayments[i].description,
          network: { id: networkId },
        });
      }
    }

    return { status: 1, message: 'Updated' };
  }

  /**
   * @description For create new network, intended crossforce super admin
   *
   * @param user Request sent by this
   * @param dto Body requested
   *
   * @returns Returns status created
   */
  async create(
    user: IUser,
    dto: dto.CreateNetworkDTO,
  ): Promise<IResponseMessage> {
    const checkNetworkExistes = await this.networkRepository.findOne({
      subDirectory: dto.subDirectory,
    });

    if (checkNetworkExistes) {
      throw new BadGatewayException({
        message: 'Sub directory alredy existes',
      });
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const newNetwork = await queryRunner.manager.save(NetworkEntity, {
        name: dto.name,
        subDirectory: dto.subDirectory,
        maxMember: dto.maxMember,
        billingType: dto.billingType,
        billingPrice: dto.billingPrice,
      });

      if (dto.oneTimePayments && dto.oneTimePayments.length) {
        for (let i = 0; i < dto.oneTimePayments.length; i++) {
          await queryRunner.manager.save(NetworkOneTimePaymentEntity, {
            paid: false,
            price: dto.oneTimePayments[i].price,
            description: dto.oneTimePayments[i].description,
            network: newNetwork,
          });
        }
      }

      if (dto.superAdmin && dto.superAdmin.length) {
        await Promise.all(
          dto.superAdmin.map(async (admin) => {
            const token = await GenerateTokenHelper.generateToken();

            await queryRunner.manager.save(InvitationEntity, {
              email: admin.email,
              firstName: admin.firstName,
              lastName: admin.lastName,
              purpose: 'admin',
              network: newNetwork,
              status: InvitationStatus.Pending,
              token,
            });

            await this.mailerService.sendEmail({
              from: 'support@webus.io',
              text: `You have invitation for ${dto.name} network
                        please Click here ${process.env.FRONT_BASE_URL}/signup?token=${token}`,
              subject: 'Invitation',
              to: admin.email,
            });

            await this.networkDatabaseService.create({
              database: `${
                dto.name
              }_${GenerateTokenHelper.generateUnixId().toString()}`,
              network: newNetwork,
              queryRunner,
            });
          }),
        );
      }
      await queryRunner.commitTransaction();
      return { status: 1, message: 'Created' };
    } catch ({ message }) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ message });
    } finally {
      await queryRunner.release();
    }
  }

  async delete(user: IUser, networkId: string): Promise<IResponseMessage> {
    const database = await this.networkDatabaseRepository.findOne({
      where: { network: networkId },
    });
    await this.adapterService.dropDatabase(database.database);
    const remove = await this.networkRepository.delete({ id: networkId });
    if (remove.affected > 0) {
      return { status: 1, message: 'Deleted' };
    } else {
      return { status: 0, message: 'Not found' };
    }
  }
}
