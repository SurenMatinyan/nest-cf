import { DATABASE_MASTER } from '@constant';
import { InvitationStatus } from '@enum';
import { BaseEntityAbstract } from '@services';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NetworkEntity } from '../network/network.entity';

@Entity({ name: 'invitation', database: DATABASE_MASTER })
export class InvitationEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => NetworkEntity, (network) => network.id)
  @JoinColumn({ name: 'network_id' })
  network: NetworkEntity;

  @Column({ nullable: false, name: 'token' })
  token: string;

  @Column()
  status: InvitationStatus;

  @Column({ default: 'member' })
  purpose: 'admin' | 'member';

  @Column({ name: 'first_name', default: null })
  firstName: string;

  @Column({ name: 'last_name', default: null })
  lastName: string;

  @Column()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
