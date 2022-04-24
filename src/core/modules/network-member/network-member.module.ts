import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkEntity } from '../network/network.entity';
import { NetworkMemberController } from './network-member.controller';
import { NetworkMemberEntity } from './network-member.entity';
import { networkMemberProviders } from './network-member.providers';
import { NetworkMemberService } from './network-member.service';

@Module({
  controllers: [NetworkMemberController],
  providers: [NetworkMemberService, ...networkMemberProviders],
})
export class NetworkMemberModule {}
