import {
  MASTER_DATABASE_CONNECTION,
  NETWOR_MEMBER_REPOSITORY,
} from '@constant';
import { Connection } from 'typeorm';
import { NetworkMemberEntity } from './network-member.entity';

export const networkMemberProviders = [
  {
    provide: NETWOR_MEMBER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(NetworkMemberEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
