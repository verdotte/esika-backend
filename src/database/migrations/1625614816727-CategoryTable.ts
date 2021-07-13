import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryTable1625614816727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS category (
            category_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(250) NOT NULL,
            description VARCHAR(250) NULL,
            active BOOL NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (category_id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE category`);
  }
}
