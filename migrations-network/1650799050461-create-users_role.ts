import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersRole1650799050461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users_role (
                user_id UUID NOT NULl,
                role_id UUID NOT NULL,
                metadata jsonb NOT NULL default  '{}'::jsonb,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
                PRIMARY KEY (user_id, role_id)                  
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE users_role`);
  }
}
