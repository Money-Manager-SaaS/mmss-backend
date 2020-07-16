import {MigrationInterface, QueryRunner} from "typeorm";

export class setNull1594891166232 implements MigrationInterface {
    name = 'setNull1594891166232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT -1`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "CustomUser"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "transferType" SET DEFAULT '-1'`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "CustomUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
