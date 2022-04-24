import { MASTER_DATABASE_CONNECTION, NETWORK_REPOSITORY } from '@constant';
import { Connection } from 'typeorm';
import { NetworkEntity } from './network.entity';

export const networkProviders = [
  {
    provide: NETWORK_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(NetworkEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
