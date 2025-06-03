import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1748976051958 implements MigrationInterface {
    name = 'Migrations1748976051958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "links" ("id" SERIAL NOT NULL, "alias" character varying NOT NULL, "originalUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clickCount" integer NOT NULL DEFAULT '0', "lastIps" text, "expiresAt" TIMESTAMP, CONSTRAINT "UQ_5a2507a408bd33a2431ebc48f86" UNIQUE ("alias"), CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "links"`)
    }
}
