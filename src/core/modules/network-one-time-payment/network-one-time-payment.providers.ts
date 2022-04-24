import {
  MASTER_DATABASE_CONNECTION,
  NETWORK_ONE_TIME_PAYMENT_REPOSITORY,
  NETWORK_REPOSITORY,
} from '@constant';
import { Connection } from 'typeorm';
import { NetworkOneTimePaymentEntity } from './network-one-time-payment.entity';

export const networkOneTimePaymentProviders = [
  {
    provide: NETWORK_ONE_TIME_PAYMENT_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(NetworkOneTimePaymentEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
