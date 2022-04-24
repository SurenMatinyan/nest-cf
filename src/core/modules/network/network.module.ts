import { Module } from '@nestjs/common';
import { AdapterService, FileUploadService } from '@services';
import { MailerService } from 'src/common/services/mailer.service';
import { invitationProviders } from '../invitation/invitation.providers';
import { NetworkDatabaseModule } from '../network-database/network-database.module';
import { networkDatabaseProviders } from '../network-database/network-database.providers';
import { networkOneTimePaymentProviders } from '../network-one-time-payment/network-one-time-payment.providers';
import { userProviders } from '../user/user.providers';
import { NetworkController } from './network.controller';
import { networkProviders } from './network.providers';
import { NetworkService } from './network.service';
import { MailService } from '@sendgrid/mail';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  imports: [NetworkDatabaseModule],
  controllers: [NetworkController],
  providers: [
    NetworkService,
    AdapterService,
    FileUploadService,
    ...networkProviders,
    ...networkOneTimePaymentProviders,
    ...userProviders,
    ...invitationProviders,
    ...networkDatabaseProviders,
  ],
})
export class NetworkModule {}
