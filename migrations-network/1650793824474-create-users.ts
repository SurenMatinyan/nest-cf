import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1650793824474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users (
                  id uuid DEFAULT uuid_generate_v4(),
                  amplify_user_id VARCHAR(255) NOT NULl UNIQUE,
                  email VARCHAR(255) not null UNIQUE,
                  metadata jsonb NOT NULL default  '{}'::jsonb,
                  created_date timestamptz(6) not null DEFAULT NOW(),
                  updated_date timestamptz(6) not null DEFAULT NOW(),
                  PRIMARY KEY (id) 
              );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE users`);
  }
}
