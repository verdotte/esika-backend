import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBio1632512435727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE user ADD COLUMN bio TEXT NULL
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user DROP COLUMN bio
      `);
  }
}
