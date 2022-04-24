import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExtensions1647872635787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP EXTENSION "uuid-ossp";
`);
  }
}
