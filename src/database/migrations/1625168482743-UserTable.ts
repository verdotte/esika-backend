import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1625168482743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE user (
            user_id bigint(11) NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            email VARCHAR(250) NULL,
            phone_number VARCHAR(250) NOT NULL,
            picture VARCHAR(250) NULL,
            user_type ENUM('normal', 'host') DEFAULT 'normal',
            active BOOL NOT NULL DEFAULT 1,
            verified BOOL NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (user_id)
        ) 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
