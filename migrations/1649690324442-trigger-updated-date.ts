// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class triggerUpdatedDate1649690324442 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     return await queryRunner.query(`CREATE OR REPLACE FUNCTION trigger_set_timestamp()
//         RETURNS TRIGGER AS $$
//         BEGIN
//           NEW.updated_at = NOW();
//           RETURN NEW;
//         END;
//         $$ LANGUAGE plpgsql;

//         CREATE TRIGGER set_timestamp
//             BEFORE UPDATE ON todos
//             FOR EACH ROW
//             EXECUTE PROCEDURE trigger_set_timestamp();
//         `);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     return await queryRunner.query(`DROP FUNCTION trigger_set_timestamp();
//         DROP TRIGGER set_timestamp
//     `);
//   }
// }
