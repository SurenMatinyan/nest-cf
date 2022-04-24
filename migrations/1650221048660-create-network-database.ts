import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNetworkDatabase1650221048660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS network_database (
                  id uuid DEFAULT uuid_generate_v4(),
                  type VARCHAR(128)  DEFAULT 'postgres',
                  database VARCHAR(128) NOT NULL,
                  network_id UUID NOT NULL, 
                  created_date timestamptz(6) not null DEFAULT NOW(),
                  updated_date timestamptz(6) not null DEFAULT NOW(),
                  FOREIGN KEY (network_id) REFERENCES network (id) ON DELETE CASCADE,
                  PRIMARY KEY (id)
              );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE network_database`);
  }
}
