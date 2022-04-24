import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1649692599656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users (
            id uuid DEFAULT uuid_generate_v4(),
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255) not null,
            invited BOOLEAN DEFAULT false,
            invite_token VARCHAR(255) DEFAULT null,
            registered BOOLEAN DEFAULT false,
            password VARCHAR(255) not null,
            created_date timestamptz(6) not null DEFAULT NOW(),
            updated_date timestamptz(6) not null DEFAULT NOW(),
            CONSTRAINT unique_email UNIQUE (email),
            PRIMARY KEY (id) 
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE users `);
  }
}
