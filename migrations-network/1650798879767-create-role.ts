import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRole1650798879767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS role (
                        id uuid DEFAULT uuid_generate_v4(),
                        title VARCHAR(255) not null,
                        email VARCHAR(255) not null UNIQUE,
                        metadata jsonb NOT NULL default '{}'::jsonb,
                        created_date timestamptz(6) not null DEFAULT NOW(),
                        updated_date timestamptz(6) not null DEFAULT NOW(),
                        PRIMARY KEY (id) 
                    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE role`);
  }
}
