import { INVITATION_REPOSITORY } from '@constant';
import { IUser, IResponse, IResponseMessage } from '@intrefaces';
import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '@services';
import { Repository } from 'typeorm';
import { InvitationEntity } from './invitation.entity';
import * as dto from './invitation.dto';
import { GenerateTokenHelper } from '@helper';
import { InvitationStatus } from '@enum';

@Injectable()
export class InvitationService extends BaseService<InvitationEntity> {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {
    super(invitationRepository);
  }

  async findAll(
    user: IUser,
    networkId,
  ): Promise<IResponse<InvitationEntity[]>> {
    const invitations = await this.invitationRepository.find({
      select: [
        'id',
        'createdDate',
        'email',
        'firstName',
        'lastName',
        'status',
        'updatedDate',
      ],
      where: {
        network: networkId,
      },
    });

    return { data: invitations, metadata: {} };
  }

  findOne(user: IUser, ...[]: any): Promise<IResponse<InvitationEntity>> {
    throw new Error('Method not implemented.');
  }

  update(user: IUser, ...[]: any): Promise<IResponseMessage> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @description Create Invitation for admin network
   *
   * @param user Request sent by this
   * @param dto Body requested
   *
   * @returns  Returns status inveted
   */
  async create(
    user: IUser,
    dto: dto.CreateInvitationDTO,
  ): Promise<IResponseMessage> {
    await this.invitationRepository.insert({
      email: dto.email,
      purpose: 'admin',
      network: { id: dto.networkId } as any,
      lastName: dto.lastName,
      firstName: dto.firstName,
      status: InvitationStatus.Pending,
      token: await GenerateTokenHelper.generateToken(),
    });

    return { status: 1, message: 'Inveted' };
  }
}
