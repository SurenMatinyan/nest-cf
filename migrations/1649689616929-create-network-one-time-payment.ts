import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNetworkOneTimePayment1649689616929
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS network_one_time_payment (
                        id uuid DEFAULT uuid_generate_v4(),
                        price INTEGER  NOT NULL,
                        description VARCHAR(128) NOT NULL,
                        paid BOOLEAN DEFAULT false,
                        network_id UUID, 
                        created_date timestamptz(6) not null DEFAULT NOW(),
                        updated_date timestamptz(6) not null DEFAULT NOW(),
                        FOREIGN KEY (network_id) REFERENCES network (id) ON DELETE CASCADE,
                        PRIMARY KEY (id) 
                    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`DROP TABLE network_one_time_payment`);
  }
}
