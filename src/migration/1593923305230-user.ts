import {MigrationInterface, QueryRunner} from "typeorm";

export class user1593923305230 implements MigrationInterface {
    name = 'user1593923305230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "about" text, "age" integer, "firstName" varchar(64), "lastName" varchar(64), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_bb8c2552037cbafec3c98932e4e" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "about", "age", "firstName", "lastName") SELECT "id", "email", "password", "userName", "active", "lastLogin", "about", "age", "firstName", "lastName" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL, "lastLogin" datetime NOT NULL, "about" text NOT NULL, "age" integer NOT NULL, "firstName" varchar(64) NOT NULL, "lastName" varchar(64) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "about", "age", "firstName", "lastName") SELECT "id", "email", "password", "userName", "active", "lastLogin", "about", "age", "firstName", "lastName" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
