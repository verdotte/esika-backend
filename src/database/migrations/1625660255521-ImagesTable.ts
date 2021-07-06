import {MigrationInterface, QueryRunner} from "typeorm";

export class ImagesTable1625660255521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS images (
            image_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            url VARCHAR(250) NOT NULL,
            active BOOL NOT NULL DEFAULT 1,
            property BIGINT(11) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (image_id),
            FOREIGN KEY (property)
                REFERENCES property(property_id)
                ON DELETE CASCADE
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE images`);
    }

}
