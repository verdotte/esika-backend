import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPropertyCurrency1632515818241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE property ADD COLUMN currency ENUM('usd', 'cf')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE property DROP COLUMN currency
      `);
  }
}
