import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1749449116595 implements MigrationInterface {
    name = 'Migrations1749449116595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "linkClicks" ("id" SERIAL NOT NULL, "alias" character varying NOT NULL, "ipAddress" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4ecf060ed8bca38c3f4daa8fc6" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "linkClicks"`)
    }
}
