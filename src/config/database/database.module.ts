import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './databases.providers';
import { MasterDatabaseEnvironment } from './environment-master';
// import { NetworkDatabaseEnvironment } from './environment-network';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ...databaseProviders,
    MasterDatabaseEnvironment,
    // NetworkDatabaseEnvironment,
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
