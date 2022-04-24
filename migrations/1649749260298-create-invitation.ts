import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInvitation1649749260298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS invitation (
            id uuid DEFAULT uuid_generate_v4(),
            email VARCHAR(255),
            network_id UUID,
            token VARCHAR(255) not null,
            status VARCHAR(255),
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            created_date timestamptz(6) not null DEFAULT NOW(),
            updated_date timestamptz(6) not null DEFAULT NOW(),
            purpose VARCHAR(255) DEFAULT 'member',
            FOREIGN KEY (network_id) REFERENCES network (id) ON DELETE CASCADE,
            PRIMARY KEY (id) 
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE invitation `);
  }
}
