import { DATABASE_MASTER } from '@constant';
import { BillingInterval } from '@enum';
import { BaseEntityAbstract } from '@services';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesEnum } from '@enum';

@Entity({ name: 'role', database: DATABASE_MASTER })
export class RoleEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
    enum: RolesEnum,
  })
  name: RolesEnum;

  // @OneToMany(() => UserEntity, (user) => user.role)
  // users: UserEntity[];

  @Column()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
