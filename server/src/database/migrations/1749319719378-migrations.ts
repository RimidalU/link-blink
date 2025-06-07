import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1749319719378 implements MigrationInterface {
    name = 'Migrations1749319719378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "lastIps"`)
        await queryRunner.query(`ALTER TABLE "links" ADD "lastIps" text array`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "lastIps"`)
        await queryRunner.query(`ALTER TABLE "links" ADD "lastIps" text`)
    }
}
