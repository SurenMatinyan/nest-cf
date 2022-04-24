import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { invitationProviders } from './invitation.providers';
import { InvitationService } from './invitation.service';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService, ...invitationProviders],
})
export class InvitationModule {}
