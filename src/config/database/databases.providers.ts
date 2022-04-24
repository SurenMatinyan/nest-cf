import { MASTER_DATABASE_CONNECTION } from '@constant';
import { InvitationEntity } from 'src/core/modules/invitation/invitation.entity';
import { NetworkDatabaseEntity } from 'src/core/modules/network-database/network-database.entity';
import { NetworkMemberEntity } from 'src/core/modules/network-member/network-member.entity';
import { NetworkOneTimePaymentEntity } from 'src/core/modules/network-one-time-payment/network-one-time-payment.entity';
import { NetworkEntity } from 'src/core/modules/network/network.entity';
import { RoleEntity } from 'src/core/modules/role/role.entity';
import { UserEntity } from 'src/core/modules/user/user.entity';
import { createConnection } from 'typeorm';
import { MasterDatabaseEnvironment } from './environment-master';
// import { NetworkDatabaseEnvironment } from './environment-network';

export const databaseProviders = [
  {
    provide: MASTER_DATABASE_CONNECTION,
    useFactory: async (environment: MasterDatabaseEnvironment) =>
      await createConnection({
        type: 'postgres',
        host: environment.databaseHost,
        port: environment.databasePort,
        username: environment.databaseUser,
        password: environment.databasePassword,
        database: environment.databaseName,
        entities: [
          RoleEntity,
          UserEntity,
          NetworkEntity,
          NetworkMemberEntity,
          NetworkOneTimePaymentEntity,
          InvitationEntity,
          NetworkDatabaseEntity,
        ],
        migrationsRun: true,
        synchronize: false,
      }),
    inject: [MasterDatabaseEnvironment],
  },
  // {
  //   provide: NETWORK_DATABASE_CONNECTION,
  //   useFactory: async (environment: NetworkDatabaseEnvironment) =>
  //     await createConnection({
  //       type: 'postgres',
  //       host: environment.databaseHost,
  //       port: environment.databasePort,
  //       username: environment.databaseUser,
  //       password: environment.databasePassword,
  //       database: environment.databaseName,
  //       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //       synchronize: false,
  //     }),
  //   inject: [NetworkDatabaseEnvironment],
  // },
];
