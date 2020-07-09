import {MigrationInterface, QueryRunner} from "typeorm";

export class auto1594246379496 implements MigrationInterface {
    name = 'auto1594246379496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64), "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "about" text, "age" integer, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt") SELECT "id", "email", "password", "userName", "active", "lastLogin", "age", "firstName", "lastName", "deletedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
