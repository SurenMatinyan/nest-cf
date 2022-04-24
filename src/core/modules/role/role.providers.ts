import { MASTER_DATABASE_CONNECTION, ROLE_REPOSITORY } from '@constant';
import { Connection } from 'typeorm';
import { RoleEntity } from './role.entity';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(RoleEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
