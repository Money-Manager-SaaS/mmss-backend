import {MigrationInterface, QueryRunner} from "typeorm";

export class renameToCustomer1594891600791 implements MigrationInterface {
    name = 'renameToCustomer1594891600791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`DROP INDEX "IDX_a21c3af32b2379186183e0c71b"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "UQ_c19f04f83dfe9cb88f959188445"`);
        await queryRunner.query(`ALTER TABLE "ledger" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "role" character varying NOT NULL DEFAULT 'basic', "userName" character varying(64) NOT NULL, "active" boolean NOT NULL DEFAULT true, "lastLogin" date NOT NULL, "profile" text, "firstName" character varying(64), "lastName" character varying(64), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "UQ_e4b1309a24ee5a827390027b888" UNIQUE ("userName"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_19468a0ccfcf3e76cbb7789cb7" ON "customer" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_6042277b62323ae370b2d79681" ON "customer" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e4b1309a24ee5a827390027b88" ON "customer" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fdb2f3ad8115da4c7718109a6e" ON "customer" ("email") `);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT -1`);
        await queryRunner.query(`CREATE INDEX "IDX_9154b65074239097fff76c99b0" ON "ledger" ("customerId") `);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "UQ_1c9f2ecd1c6371c3b4d1e52e6be" UNIQUE ("name", "customerId", "deletedAt")`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_9154b65074239097fff76c99b0b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_9154b65074239097fff76c99b0b"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "UQ_1c9f2ecd1c6371c3b4d1e52e6be"`);
        await queryRunner.query(`DROP INDEX "IDX_9154b65074239097fff76c99b0"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT '-1'`);
        await queryRunner.query(`DROP INDEX "IDX_fdb2f3ad8115da4c7718109a6e"`);
        await queryRunner.query(`DROP INDEX "IDX_e4b1309a24ee5a827390027b88"`);
        await queryRunner.query(`DROP INDEX "IDX_6042277b62323ae370b2d79681"`);
        await queryRunner.query(`DROP INDEX "IDX_19468a0ccfcf3e76cbb7789cb7"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "ledger" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "UQ_c19f04f83dfe9cb88f959188445" UNIQUE ("deletedAt", "name", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_a21c3af32b2379186183e0c71b" ON "ledger" ("userId") `);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "CustomUser"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
