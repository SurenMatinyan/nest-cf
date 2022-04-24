import { Module } from '@nestjs/common';
import { NetworkOneTimePaymentController } from './network-one-time-payment.controller';
import { networkOneTimePaymentProviders } from './network-one-time-payment.providers';
import { NetworkOneTimePaymentService } from './network-one-time-payment.service';

@Module({
  controllers: [NetworkOneTimePaymentController],
  providers: [NetworkOneTimePaymentService, ...networkOneTimePaymentProviders],
})
export class NetworkOneTimePaymentModule {}
