import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNetwork1649686916169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `     DROP TYPE IF EXISTS billing_ENUM;
            CREATE TYPE billing_ENUM AS ENUM('monthly','quarterly','biannually', 'yearly');
            
            CREATE TABLE IF NOT EXISTS network (
                id uuid DEFAULT uuid_generate_v4(),
                sub_directory VARCHAR(128)  NOT NULL,
                max_member INTEGER NOT NULL,
                name VARCHAR(128) NOT NULL,
                billing_type billing_ENUM NOT NULL,
                billing_price INTEGER,
                is_pause BOOLEAN DEFAULT false,
                network_icon VARCHAR(128) DEFAULT null,
                created_date timestamptz(6) not null DEFAULT NOW(),
                updated_date timestamptz(6) not null DEFAULT NOW(),
                PRIMARY KEY (id),
                CONSTRAINT constraint_name UNIQUE (sub_directory)
                );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
    DROP TABLE network;
    DROP TYPE IF EXISTS billing_ENUM;
    `);
  }
}
