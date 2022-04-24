import { DATABASE_MASTER } from '@constant';
import { BaseEntityAbstract } from '@services';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NetworkEntity } from '../network/network.entity';

enum DatabaseType {
  Postgres = 'postgres',
}

@Entity({ name: 'network_database', database: DATABASE_MASTER })
export class NetworkDatabaseEntity extends BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: DatabaseType, default: DatabaseType.Postgres })
  type: DatabaseType;

  @Column()
  database: string;

  @OneToOne(() => NetworkEntity, (network) => network.id)
  @JoinColumn({ name: 'network_id' })
  network: NetworkEntity;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
