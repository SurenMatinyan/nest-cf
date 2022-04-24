import { DATABASE_MASTER } from '@constant';
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
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'network_member', database: DATABASE_MASTER })
export class NetworkMemberEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => NetworkEntity, (network) => network.id)
  @JoinColumn({ name: 'network_id' })
  network: NetworkEntity;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
