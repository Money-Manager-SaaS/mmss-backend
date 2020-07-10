import {MigrationInterface, QueryRunner} from "typeorm";

export class addLedger1594247593467 implements MigrationInterface {
    name = 'addLedger1594247593467'

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
        await queryRunner.query(`CREATE TABLE "ledger" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_10f36cf762167a0b4ba11783c2" ON "ledger" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd94fff677acfd7f4cd97cacf" ON "ledger" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46a672210083f21abc60d2866b" ON "ledger" ("name") `);
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
        await queryRunner.query(`DROP INDEX "IDX_10f36cf762167a0b4ba11783c2"`);
        await queryRunner.query(`DROP INDEX "IDX_5cd94fff677acfd7f4cd97cacf"`);
        await queryRunner.query(`DROP INDEX "IDX_46a672210083f21abc60d2866b"`);
        await queryRunner.query(`CREATE TABLE "temporary_ledger" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "userId" integer, CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ledger"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "userId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "userId" FROM "ledger"`);
        await queryRunner.query(`DROP TABLE "ledger"`);
        await queryRunner.query(`ALTER TABLE "temporary_ledger" RENAME TO "ledger"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_10f36cf762167a0b4ba11783c2" ON "ledger" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd94fff677acfd7f4cd97cacf" ON "ledger" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46a672210083f21abc60d2866b" ON "ledger" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_46a672210083f21abc60d2866b"`);
        await queryRunner.query(`DROP INDEX "IDX_5cd94fff677acfd7f4cd97cacf"`);
        await queryRunner.query(`DROP INDEX "IDX_10f36cf762167a0b4ba11783c2"`);
        await queryRunner.query(`ALTER TABLE "ledger" RENAME TO "temporary_ledger"`);
        await queryRunner.query(`CREATE TABLE "ledger" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "name" varchar(256) NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "ledger"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "userId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "name", "userId" FROM "temporary_ledger"`);
        await queryRunner.query(`DROP TABLE "temporary_ledger"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46a672210083f21abc60d2866b" ON "ledger" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd94fff677acfd7f4cd97cacf" ON "ledger" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_10f36cf762167a0b4ba11783c2" ON "ledger" ("uuid") `);
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
        await queryRunner.query(`DROP INDEX "IDX_46a672210083f21abc60d2866b"`);
        await queryRunner.query(`DROP INDEX "IDX_5cd94fff677acfd7f4cd97cacf"`);
        await queryRunner.query(`DROP INDEX "IDX_10f36cf762167a0b4ba11783c2"`);
        await queryRunner.query(`DROP TABLE "ledger"`);
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