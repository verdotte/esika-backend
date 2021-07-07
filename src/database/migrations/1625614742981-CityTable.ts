import {MigrationInterface, QueryRunner} from "typeorm";

export class CityTable1625614742981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS city (
            city_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            name VARCHAR(250) NOT NULL,
            active BOOL NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (city_id)
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE city`);
    }

}
