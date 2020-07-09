import {MigrationInterface, QueryRunner} from "typeorm";

export class addAccount1594248610468 implements MigrationInterface {
    name = 'addAccount1594248610468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "amount" integer NOT NULL, "currency" text NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_7a96bf21ab8136c43b3c7099161" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_31e2fd7720a2da3af586f17778" ON "account" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_f50e152d11f027ee500dbad6c9" ON "account" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_414d4052f22837655ff312168c" ON "account" ("name") `);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`DROP INDEX "IDX_31e2fd7720a2da3af586f17778"`);
        await queryRunner.query(`DROP INDEX "IDX_f50e152d11f027ee500dbad6c9"`);
        await queryRunner.query(`DROP INDEX "IDX_414d4052f22837655ff312168c"`);
        await queryRunner.query(`CREATE TABLE "temporary_account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "amount" integer NOT NULL, "currency" text NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_7a96bf21ab8136c43b3c7099161" UNIQUE ("name", "ledgerId"), CONSTRAINT "FK_d83bc879aa5ef4074e710316628" FOREIGN KEY ("ledgerId") REFERENCES "ledger" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_account"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "amount", "currency", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "amount", "currency", "ledgerId" FROM "account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`ALTER TABLE "temporary_account" RENAME TO "account"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_31e2fd7720a2da3af586f17778" ON "account" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_f50e152d11f027ee500dbad6c9" ON "account" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_414d4052f22837655ff312168c" ON "account" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_414d4052f22837655ff312168c"`);
        await queryRunner.query(`DROP INDEX "IDX_f50e152d11f027ee500dbad6c9"`);
        await queryRunner.query(`DROP INDEX "IDX_31e2fd7720a2da3af586f17778"`);
        await queryRunner.query(`ALTER TABLE "account" RENAME TO "temporary_account"`);
        await queryRunner.query(`CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "amount" integer NOT NULL, "currency" text NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_7a96bf21ab8136c43b3c7099161" UNIQUE ("name", "ledgerId"))`);
        await queryRunner.query(`INSERT INTO "account"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "amount", "currency", "ledgerId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "amount", "currency", "ledgerId" FROM "temporary_account"`);
        await queryRunner.query(`DROP TABLE "temporary_account"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_414d4052f22837655ff312168c" ON "account" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_f50e152d11f027ee500dbad6c9" ON "account" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_31e2fd7720a2da3af586f17778" ON "account" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_414d4052f22837655ff312168c"`);
        await queryRunner.query(`DROP INDEX "IDX_f50e152d11f027ee500dbad6c9"`);
        await queryRunner.query(`DROP INDEX "IDX_31e2fd7720a2da3af586f17778"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(128) NOT NULL, "password" varchar(128) NOT NULL, "userName" varchar(64) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "lastLogin" datetime NOT NULL, "firstName" varchar(64), "lastName" varchar(64), "deletedAt" datetime, "uuid" varchar NOT NULL, "description" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "role" varchar CHECK( role IN ('admin','manager','basic') ) NOT NULL DEFAULT ('basic'), "profile" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile") SELECT "id", "email", "password", "userName", "active", "lastLogin", "firstName", "lastName", "deletedAt", "uuid", "description", "createdAt", "updatedAt", "version", "role", "profile" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
    }

}
