import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDefaultConstraint1594251419811 implements MigrationInterface {
    name = 'updateDefaultConstraint1594251419811'

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
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer NOT NULL, "date" datetime NOT NULL, "accountId" integer, "toAccountId" integer, "categoryId" integer, "payeeId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer, "date" datetime NOT NULL, "accountId" integer NOT NULL, "toAccountId" integer, "categoryId" integer, "payeeId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer, "date" datetime NOT NULL, "accountId" integer NOT NULL, "toAccountId" integer, "categoryId" integer, "payeeId" integer, CONSTRAINT "FK_3d6e89b14baa44a71870450d14d" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ac8efff1e2135ddfd0ab1796c5a" FOREIGN KEY ("toAccountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_70815d35b9b0fe366cc9014cb9e" FOREIGN KEY ("payeeId") REFERENCES "payee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer, "date" datetime NOT NULL, "accountId" integer NOT NULL, "toAccountId" integer, "categoryId" integer, "payeeId" integer)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer NOT NULL, "date" datetime NOT NULL, "accountId" integer, "toAccountId" integer, "categoryId" integer, "payeeId" integer)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "description" text, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "version" integer NOT NULL, "transferType" varchar CHECK( transferType IN ('0','-1','1') ) NOT NULL DEFAULT (-1), "amount" integer NOT NULL, "toAmount" integer NOT NULL, "date" datetime NOT NULL, "accountId" integer, "toAccountId" integer, "categoryId" integer, "payeeId" integer, CONSTRAINT "FK_3d6e89b14baa44a71870450d14d" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId") SELECT "id", "uuid", "description", "deletedAt", "createdAt", "updatedAt", "version", "transferType", "amount", "toAmount", "date", "accountId", "toAccountId", "categoryId", "payeeId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
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
