import { Module } from '@nestjs/common';
import { AdapterService } from '@services';
import { NetworkDatabaseController } from './network-database.controller';
import { networkDatabaseProviders } from './network-database.providers';
import { NetworkDatabaseService } from './network-database.service';

@Module({
  controllers: [NetworkDatabaseController],
  providers: [
    NetworkDatabaseService,
    AdapterService,
    ...networkDatabaseProviders,
  ],
  exports: [NetworkDatabaseService],
})
export class NetworkDatabaseModule {}
