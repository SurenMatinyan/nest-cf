import { DATABASE_MASTER } from '@constant';
import { BaseEntityAbstract } from '@services';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { NetworkMemberEntity } from '../network-member/network-member.entity';

@Entity({ name: 'users', database: DATABASE_MASTER })
export class UserEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'invited', default: false })
  invited: boolean;

  @Column({ name: 'invite_token', default: null })
  inviteToken: string | null;

  @Column({ name: 'registered', default: false })
  registered: boolean;

  @OneToMany(() => NetworkMemberEntity, (NetworkMember) => NetworkMember.user)
  networkMember: NetworkMemberEntity[];

  // @ManyToOne(() => NetworkEntity, (network) => network.id)
  // @JoinColumn({ name: 'network_id' })
  // network: NetworkEntity;

  // @ManyToOne(() => RoleEntity, (role) => role.id)
  // @JoinColumn({ name: 'network_id' })
  // role: RoleEntity;
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
