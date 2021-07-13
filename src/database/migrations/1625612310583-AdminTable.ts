import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminTable1625612310583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS admin (
            admin_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            username VARCHAR(250) NOT NULL,
            password VARCHAR(250) NOT NULL,
            email VARCHAR(250) NULL,
            phone_number VARCHAR(250) NOT NULL,
            picture VARCHAR(250) NULL,
            role ENUM('manager', 'admin'),
            active BOOL NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (admin_id)
          ) 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE admin`);
  }
}
