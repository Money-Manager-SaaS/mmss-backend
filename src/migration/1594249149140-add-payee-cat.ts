import {MigrationInterface, QueryRunner} from "typeorm";

export class addPayeeCat1594249149140 implements MigrationInterface {
    name = 'addPayeeCat1594249149140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_c0a4b3ac31488c0c40a91c6533c" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86ee096735ccbfa3fd319af183" ON "category" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_c15e0393f5bebfb602fb077897" ON "category" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`CREATE TABLE "payee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_6547b08ba601a8abbbd10c9e883" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e71d4e5c776c2210a6c00033e" ON "payee" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_07e969c162fe18103ef44dd074" ON "payee" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_09f0437c922d2ab625f650a6b6" ON "payee" ("name") `);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_86ee096735ccbfa3fd319af183"`);
        await queryRunner.query(`DROP INDEX "IDX_c15e0393f5bebfb602fb077897"`);
        await queryRunner.query(`DROP INDEX "IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_c0a4b3ac31488c0c40a91c6533c" UNIQUE ("name", "ledgerId"), CONSTRAINT "FK_060e989c9ab11a9995d95cf7343" FOREIGN KEY ("ledgerId") REFERENCES "ledger" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86ee096735ccbfa3fd319af183" ON "category" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_c15e0393f5bebfb602fb077897" ON "category" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`DROP INDEX "IDX_3e71d4e5c776c2210a6c00033e"`);
        await queryRunner.query(`DROP INDEX "IDX_07e969c162fe18103ef44dd074"`);
        await queryRunner.query(`DROP INDEX "IDX_09f0437c922d2ab625f650a6b6"`);
        await queryRunner.query(`CREATE TABLE "temporary_payee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_6547b08ba601a8abbbd10c9e883" UNIQUE ("name", "ledgerId"), CONSTRAINT "FK_294557973b2301e41a7896b4218" FOREIGN KEY ("ledgerId") REFERENCES "ledger" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payee"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId" FROM "payee"`);
        await queryRunner.query(`DROP TABLE "payee"`);
        await queryRunner.query(`ALTER TABLE "temporary_payee" RENAME TO "payee"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e71d4e5c776c2210a6c00033e" ON "payee" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_07e969c162fe18103ef44dd074" ON "payee" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_09f0437c922d2ab625f650a6b6" ON "payee" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_09f0437c922d2ab625f650a6b6"`);
        await queryRunner.query(`DROP INDEX "IDX_07e969c162fe18103ef44dd074"`);
        await queryRunner.query(`DROP INDEX "IDX_3e71d4e5c776c2210a6c00033e"`);
        await queryRunner.query(`ALTER TABLE "payee" RENAME TO "temporary_payee"`);
        await queryRunner.query(`CREATE TABLE "payee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_6547b08ba601a8abbbd10c9e883" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`INSERT INTO "payee"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId" FROM "temporary_payee"`);
        await queryRunner.query(`DROP TABLE "temporary_payee"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_09f0437c922d2ab625f650a6b6" ON "payee" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_07e969c162fe18103ef44dd074" ON "payee" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e71d4e5c776c2210a6c00033e" ON "payee" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`DROP INDEX "IDX_c15e0393f5bebfb602fb077897"`);
        await queryRunner.query(`DROP INDEX "IDX_86ee096735ccbfa3fd319af183"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_c0a4b3ac31488c0c40a91c6533c" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`INSERT INTO "category"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "ledgerId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_c15e0393f5bebfb602fb077897" ON "category" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86ee096735ccbfa3fd319af183" ON "category" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`DROP INDEX "IDX_09f0437c922d2ab625f650a6b6"`);
        await queryRunner.query(`DROP INDEX "IDX_07e969c162fe18103ef44dd074"`);
        await queryRunner.query(`DROP INDEX "IDX_3e71d4e5c776c2210a6c00033e"`);
        await queryRunner.query(`DROP TABLE "payee"`);
        await queryRunner.query(`DROP INDEX "IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`DROP INDEX "IDX_c15e0393f5bebfb602fb077897"`);
        await queryRunner.query(`DROP INDEX "IDX_86ee096735ccbfa3fd319af183"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

}
