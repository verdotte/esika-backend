import {MigrationInterface, QueryRunner} from "typeorm";

export class PackageTable1625613659626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS package (
            package_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(250) NOT NULL,
            description VARCHAR(250) NULL,
            price VARCHAR(250) NOT NULL,
            validity INTEGER NOT NULL,
            active BOOL NOT NULL DEFAULT 1,
            unit ENUM('year', 'month'),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (package_id)
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE package`);
    }

}
