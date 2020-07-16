import {MigrationInterface, QueryRunner} from "typeorm";

export class auto1594892066133 implements MigrationInterface {
    name = 'auto1594892066133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_9154b65074239097fff76c99b0b"`);
        await queryRunner.query(`DROP INDEX "IDX_9154b65074239097fff76c99b0"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "UQ_1c9f2ecd1c6371c3b4d1e52e6be"`);
        await queryRunner.query(`ALTER TABLE "ledger" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "role" character varying NOT NULL DEFAULT 'basic', "userName" character varying(64) NOT NULL, "active" boolean NOT NULL DEFAULT true, "lastLogin" date NOT NULL, "profile" text, "firstName" character varying(64), "lastName" character varying(64), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT -1`);
        await queryRunner.query(`CREATE INDEX "IDX_a21c3af32b2379186183e0c71b" ON "ledger" ("userId") `);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "UQ_c19f04f83dfe9cb88f959188445" UNIQUE ("name", "userId", "deletedAt")`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "UQ_c19f04f83dfe9cb88f959188445"`);
        await queryRunner.query(`DROP INDEX "IDX_a21c3af32b2379186183e0c71b"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT '-1'`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "ledger" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "UQ_1c9f2ecd1c6371c3b4d1e52e6be" UNIQUE ("deletedAt", "name", "customerId")`);
        await queryRunner.query(`CREATE INDEX "IDX_9154b65074239097fff76c99b0" ON "ledger" ("customerId") `);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_9154b65074239097fff76c99b0b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
