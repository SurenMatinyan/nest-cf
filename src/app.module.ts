import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogsMiddleware } from '@middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { NetworkModule } from './core/modules/network/network.module';
import { NetworkMemberModule } from './core/modules/network-member/network-member.module';
import { NetworkOneTimePaymentModule } from './core/modules/network-one-time-payment/network-one-time-payment.module';
import { RoleModule } from './core/modules/role/role.module';
import { UserModule } from './core/modules/user/user.module';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationModule } from './core/modules/invitation/invitation.module';
import { ServicesModule } from './common/services/services.module';

@Module({
  imports: [
    ServicesModule,
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(),
    DatabaseModule,
    NetworkModule,
    NetworkMemberModule,
    NetworkOneTimePaymentModule,
    RoleModule,
    UserModule,
    InvitationModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
