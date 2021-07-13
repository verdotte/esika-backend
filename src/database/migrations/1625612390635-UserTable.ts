import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1625612390635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user (
            user_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            email VARCHAR(250) NULL,
            phone_number VARCHAR(250) NOT NULL,
            picture VARCHAR(250) NULL,
            user_type ENUM('normal', 'host'),
            active BOOL NOT NULL DEFAULT 1,
            verified BOOL NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (user_id)
        ) 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE user`);
  }
}
