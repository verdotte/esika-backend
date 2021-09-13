import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDescriptionField1631574072395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE property MODIFY COLUMN description TEXT NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE property MODIFY COLUMN description VARCHAR(250) NOT NULL`,
    );
  }
}
