import {
  MASTER_DATABASE_CONNECTION,
  NETWORK_DATABASE_REPOSITORY,
} from '@constant';
import { Connection } from 'typeorm';
import { NetworkDatabaseEntity } from './network-database.entity';

export const networkDatabaseProviders = [
  {
    provide: NETWORK_DATABASE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(NetworkDatabaseEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
