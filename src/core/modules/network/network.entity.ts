import { DATABASE_MASTER } from '@constant';
import { BillingInterval } from '@enum';
import { BaseEntityAbstract } from '@services';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NetworkDatabaseEntity } from '../network-database/network-database.entity';
import { NetworkMemberEntity } from '../network-member/network-member.entity';
import { NetworkOneTimePaymentEntity } from '../network-one-time-payment/network-one-time-payment.entity';

@Entity({ name: 'network', database: DATABASE_MASTER })
export class NetworkEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'sub_directory', nullable: false, unique: true })
  subDirectory: string;

  @Column({ name: 'max_member', nullable: false })
  maxMember: number;

  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @OneToMany(
    () => NetworkOneTimePaymentEntity,
    (oneTimePayment) => oneTimePayment.network,
  )
  oneTimePayments: NetworkOneTimePaymentEntity[];

  @OneToMany(
    () => NetworkMemberEntity,
    (NetworkMember) => NetworkMember.network,
  )
  networkMembers: NetworkMemberEntity[];

  @Column({
    enum: BillingInterval,
    nullable: false,
    name: 'billing_type',
  })
  billingType: BillingInterval;

  @Column({ name: 'billing_price' })
  billingPrice: number;

  @Column({ default: false, name: 'is_pause' })
  isPause: boolean;

  @Column({ default: null, name: 'network_icon' })
  networkIcon: string;

  @OneToOne(() => NetworkEntity, (network) => network.id)
  database: NetworkDatabaseEntity;

  // @OneToMany(() => UserEntity, (user) => user.network)
  // admin: UserEntity[];

  @Column()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
