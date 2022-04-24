import { MigrationInterface, QueryRunner } from 'typeorm';

export class networkMember1649696491506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS network_member (
                  id uuid DEFAULT uuid_generate_v4(),
                  user_id UUID,
                  network_id UUID,
                  admin BOOLEAN DEFAULT false,
                  created_date timestamptz(6) not null DEFAULT NOW(),
                  updated_date timestamptz(6) not null DEFAULT NOW(),
                  FOREIGN KEY (network_id) REFERENCES network (id) ON DELETE CASCADE,
                  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                  PRIMARY KEY (id) 
              );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE network_member`);
  }
}
