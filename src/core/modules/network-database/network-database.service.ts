import { NETWORK_DATABASE_REPOSITORY } from '@constant';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AdapterService } from '@services';
import { QueryRunner, Repository } from 'typeorm';
import { NetworkEntity } from '../network/network.entity';
import { NetworkDatabaseEntity } from './network-database.entity';

interface ICreate {
  database: string;
  network: NetworkEntity;
  queryRunner: QueryRunner;
}

@Injectable()
export class NetworkDatabaseService {
  constructor(
    @Inject(NETWORK_DATABASE_REPOSITORY)
    private readonly networkDatabaseRepository: Repository<NetworkDatabaseEntity>,
    private readonly adapterService: AdapterService,
  ) {}

  async create(database: ICreate) {
    try {
      await database.queryRunner.manager.save(NetworkDatabaseEntity, database);
      await this.adapterService.createNetworkDatabase({
        name: database.database,
      });
    } catch ({ message }) {
      await this.adapterService.dropDatabase(database.database);
      throw new InternalServerErrorException({ message });
    }
  }
}
