import {MigrationInterface, QueryRunner} from "typeorm";

export class user1593921211532 implements MigrationInterface {
    name = 'user1593921211532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL, "lastLogin" datetime NOT NULL, "about" text NOT NULL, "age" integer NOT NULL, "firstName" varchar(64) NOT NULL, "lastName" varchar(64) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
