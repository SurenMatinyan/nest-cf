import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { roleProviders } from './role.providers';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
})
export class RoleModule {}
