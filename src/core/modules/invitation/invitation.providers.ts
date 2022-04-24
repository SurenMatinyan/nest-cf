import { INVITATION_REPOSITORY, MASTER_DATABASE_CONNECTION } from '@constant';
import { Connection } from 'typeorm';
import { InvitationEntity } from './invitation.entity';

export const invitationProviders = [
  {
    provide: INVITATION_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(InvitationEntity),
    inject: [MASTER_DATABASE_CONNECTION],
  },
];
