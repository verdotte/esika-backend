import {MigrationInterface, QueryRunner} from "typeorm";

export class PropertiesTable1625660064527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS property (
            property_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(250) NOT NULL,
            description VARCHAR(250) NULL,
            price VARCHAR(250) NOT NULL,
            location VARCHAR(250) NOT NULL,
            cover_image VARCHAR(250) NOT NULL,
            active BOOL NOT NULL DEFAULT 1,
            category BIGINT(11) NOT NULL,
            user BIGINT(11) NOT NULL,
            city BIGINT(11) NOT NULL,
            verified BOOL NOT NULL DEFAULT 0,
            slug VARCHAR(250) NOT NULL,
            type ENUM('sell', 'rent'),
            unit ENUM('day', 'month'),
            bedroom VARCHAR(250) NOT NULL,
            bathroom VARCHAR(250) NOT NULL,
            square_feet VARCHAR(250) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (property_id),
            FOREIGN KEY (category)
                REFERENCES category(category_id)
                ON DELETE CASCADE,
            FOREIGN KEY (user)
                REFERENCES user(user_id)
                ON DELETE CASCADE,   
            FOREIGN KEY (city)
                REFERENCES city(city_id)
                ON DELETE CASCADE
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE property`);
    }

}
