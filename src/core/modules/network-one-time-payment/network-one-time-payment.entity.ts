import { DATABASE_MASTER } from '@constant';
import { BillingInterval } from '@enum';
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

@Entity({ name: 'network_one_time_payment', database: DATABASE_MASTER })
export class NetworkOneTimePaymentEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ default: false, name: 'paid' })
  paid: boolean;

  @ManyToOne(() => NetworkEntity, (network) => network.id)
  @JoinColumn({ name: 'network_id' })
  network: NetworkEntity;

  @Column()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
