import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRole1649692595410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `
      CREATE TABLE IF NOT EXISTS role (
                    id uuid DEFAULT uuid_generate_v4(),
                    name VARCHAR(128) NOT NULL,
                    created_date timestamptz(6) not null DEFAULT NOW(),
                    updated_date timestamptz(6) not null DEFAULT NOW(),
                    PRIMARY KEY (id),
                    CONSTRAINT constraint_role UNIQUE (name)
                    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE role `);
  }
}
