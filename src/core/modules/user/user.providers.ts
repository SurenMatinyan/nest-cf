import { MASTER_DATABASE_CONNECTION, USER_REPOSITORY } from '@constant';
import { Connection } from 'typeorm';
import { UserEntity } from './user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
