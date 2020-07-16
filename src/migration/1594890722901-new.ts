import {MigrationInterface, QueryRunner} from "typeorm";

export class new1594890722901 implements MigrationInterface {
    name = 'new1594890722901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CustomUser" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "role" character varying NOT NULL DEFAULT 'basic', "userName" character varying(64) NOT NULL, "active" boolean NOT NULL DEFAULT true, "lastLogin" date NOT NULL, "profile" text, "firstName" character varying(64), "lastName" character varying(64), CONSTRAINT "UQ_362072a78843deeef4343fb9429" UNIQUE ("email"), CONSTRAINT "UQ_843c586d0f05a3cb206eb3eb479" UNIQUE ("userName"), CONSTRAINT "PK_2617262deb8d2e4461e3135e45d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bc760ad18d29262bc6b51da5ce" ON "CustomUser" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac72e86743c14f094187a615b7" ON "CustomUser" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_843c586d0f05a3cb206eb3eb47" ON "CustomUser" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_362072a78843deeef4343fb942" ON "CustomUser" ("email") `);
        await queryRunner.query(`CREATE TABLE "payee" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_b82ccd31f8dce1a9caa80c22c31" UNIQUE ("name", "ledgerId", "deletedAt"), CONSTRAINT "PK_614abed06ab3176fa7c259a6a13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e71d4e5c776c2210a6c00033e" ON "payee" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_07e969c162fe18103ef44dd074" ON "payee" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_09f0437c922d2ab625f650a6b6" ON "payee" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_294557973b2301e41a7896b421" ON "payee" ("ledgerId") `);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "transferType" integer NOT NULL DEFAULT -1, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "toAmount" integer, "accountId" integer, "toAccountId" integer, "categoryId" integer, "payeeId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_83cb622ce2d74c56db3e0c29f1" ON "transaction" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_f74e18cc3832e2b39ea077a6c8" ON "transaction" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d6e89b14baa44a71870450d14" ON "transaction" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac8efff1e2135ddfd0ab1796c5" ON "transaction" ("toAccountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3951864751c5812e70d033978" ON "transaction" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying(256) NOT NULL, "ledgerId" integer, CONSTRAINT "UQ_1c705c6b6388c95c22c103d15e8" UNIQUE ("name", "ledgerId", "deletedAt"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86ee096735ccbfa3fd319af183" ON "category" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_c15e0393f5bebfb602fb077897" ON "category" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_060e989c9ab11a9995d95cf734" ON "category" ("ledgerId") `);
        await queryRunner.query(`CREATE TABLE "ledger" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying(256) NOT NULL, "userId" integer, CONSTRAINT "UQ_c19f04f83dfe9cb88f959188445" UNIQUE ("name", "userId", "deletedAt"), CONSTRAINT "PK_7a322e9157e5f42a16750ba2a20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_10f36cf762167a0b4ba11783c2" ON "ledger" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_5cd94fff677acfd7f4cd97cacf" ON "ledger" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_a21c3af32b2379186183e0c71b" ON "ledger" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46a672210083f21abc60d2866b" ON "ledger" ("name") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying(256) NOT NULL, "ledgerId" integer, "amount" integer NOT NULL, "currency" text, CONSTRAINT "UQ_1aaa9c6e960421d088610e487cd" UNIQUE ("name", "ledgerId", "deletedAt"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_31e2fd7720a2da3af586f17778" ON "account" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_f50e152d11f027ee500dbad6c9" ON "account" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_414d4052f22837655ff312168c" ON "account" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_d83bc879aa5ef4074e71031662" ON "account" ("ledgerId") `);
        await queryRunner.query(`ALTER TABLE "payee" ADD CONSTRAINT "FK_294557973b2301e41a7896b4218" FOREIGN KEY ("ledgerId") REFERENCES "ledger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3d6e89b14baa44a71870450d14d" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ac8efff1e2135ddfd0ab1796c5a" FOREIGN KEY ("toAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_70815d35b9b0fe366cc9014cb9e" FOREIGN KEY ("payeeId") REFERENCES "payee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_060e989c9ab11a9995d95cf7343" FOREIGN KEY ("ledgerId") REFERENCES "ledger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "CustomUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_d83bc879aa5ef4074e710316628" FOREIGN KEY ("ledgerId") REFERENCES "ledger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_d83bc879aa5ef4074e710316628"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_060e989c9ab11a9995d95cf7343"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_70815d35b9b0fe366cc9014cb9e"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ac8efff1e2135ddfd0ab1796c5a"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3d6e89b14baa44a71870450d14d"`);
        await queryRunner.query(`ALTER TABLE "payee" DROP CONSTRAINT "FK_294557973b2301e41a7896b4218"`);
        await queryRunner.query(`DROP INDEX "IDX_d83bc879aa5ef4074e71031662"`);
        await queryRunner.query(`DROP INDEX "IDX_414d4052f22837655ff312168c"`);
        await queryRunner.query(`DROP INDEX "IDX_f50e152d11f027ee500dbad6c9"`);
        await queryRunner.query(`DROP INDEX "IDX_31e2fd7720a2da3af586f17778"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "IDX_46a672210083f21abc60d2866b"`);
        await queryRunner.query(`DROP INDEX "IDX_a21c3af32b2379186183e0c71b"`);
        await queryRunner.query(`DROP INDEX "IDX_5cd94fff677acfd7f4cd97cacf"`);
        await queryRunner.query(`DROP INDEX "IDX_10f36cf762167a0b4ba11783c2"`);
        await queryRunner.query(`DROP TABLE "ledger"`);
        await queryRunner.query(`DROP INDEX "IDX_060e989c9ab11a9995d95cf734"`);
        await queryRunner.query(`DROP INDEX "IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`DROP INDEX "IDX_c15e0393f5bebfb602fb077897"`);
        await queryRunner.query(`DROP INDEX "IDX_86ee096735ccbfa3fd319af183"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "IDX_d3951864751c5812e70d033978"`);
        await queryRunner.query(`DROP INDEX "IDX_ac8efff1e2135ddfd0ab1796c5"`);
        await queryRunner.query(`DROP INDEX "IDX_3d6e89b14baa44a71870450d14"`);
        await queryRunner.query(`DROP INDEX "IDX_f74e18cc3832e2b39ea077a6c8"`);
        await queryRunner.query(`DROP INDEX "IDX_83cb622ce2d74c56db3e0c29f1"`);
        await queryRunner.query(`DROP INDEX "IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP INDEX "IDX_294557973b2301e41a7896b421"`);
        await queryRunner.query(`DROP INDEX "IDX_09f0437c922d2ab625f650a6b6"`);
        await queryRunner.query(`DROP INDEX "IDX_07e969c162fe18103ef44dd074"`);
        await queryRunner.query(`DROP INDEX "IDX_3e71d4e5c776c2210a6c00033e"`);
        await queryRunner.query(`DROP TABLE "payee"`);
        await queryRunner.query(`DROP INDEX "IDX_362072a78843deeef4343fb942"`);
        await queryRunner.query(`DROP INDEX "IDX_843c586d0f05a3cb206eb3eb47"`);
        await queryRunner.query(`DROP INDEX "IDX_ac72e86743c14f094187a615b7"`);
        await queryRunner.query(`DROP INDEX "IDX_bc760ad18d29262bc6b51da5ce"`);
        await queryRunner.query(`DROP TABLE "CustomUser"`);
    }

}
