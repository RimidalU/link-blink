import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1749505518864 implements MigrationInterface {
    name = 'Migrations1749505518864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "linkClicks" RENAME COLUMN "alias" TO "linkId"`
        )
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "clickCount"`)
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "lastIps"`)
        await queryRunner.query(`ALTER TABLE "linkClicks" DROP COLUMN "linkId"`)
        await queryRunner.query(`ALTER TABLE "linkClicks" ADD "linkId" integer`)
        await queryRunner.query(
            `ALTER TABLE "linkClicks" ADD CONSTRAINT "FK_fee3b9344e099b9ddfd40e32692" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "linkClicks" DROP CONSTRAINT "FK_fee3b9344e099b9ddfd40e32692"`
        )
        await queryRunner.query(`ALTER TABLE "linkClicks" DROP COLUMN "linkId"`)
        await queryRunner.query(
            `ALTER TABLE "linkClicks" ADD "linkId" character varying NOT NULL`
        )
        await queryRunner.query(`ALTER TABLE "links" ADD "lastIps" text array`)
        await queryRunner.query(
            `ALTER TABLE "links" ADD "clickCount" integer NOT NULL DEFAULT '0'`
        )
        await queryRunner.query(
            `ALTER TABLE "linkClicks" RENAME COLUMN "linkId" TO "alias"`
        )
    }
}
