import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentTable1625661570971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS payment (
            payment_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            amount VARCHAR(250) NOT NULL,
            currency ENUM('cdf', 'usd') DEFAULT 'usd',
            user BIGINT(11) NOT NULL,
            package BIGINT(11) NOT NULL,
            expiry_date VARCHAR(250) NOT NULL,
            active BOOL NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (payment_id),
            FOREIGN KEY (user)
                REFERENCES user(user_id)
                ON DELETE CASCADE,
            FOREIGN KEY (package)
                REFERENCES package(package_id)
                ON DELETE CASCADE   
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE payment`);
  }
}
