import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAddress1632512394377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user ADD COLUMN address VARCHAR(250) NULL
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user DROP COLUMN address
      `);
  }
}
