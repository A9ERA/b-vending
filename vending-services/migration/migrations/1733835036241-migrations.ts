import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733835036241 implements MigrationInterface {
    name = 'Migrations1733835036241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" text NOT NULL, "fileType" character varying(128) NOT NULL, "productId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "price" smallint NOT NULL DEFAULT '0', "desc" text, "previewPicId" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(20) NOT NULL, "amountPaid" smallint NOT NULL DEFAULT '0', "changeGiven" smallint NOT NULL DEFAULT '0', "transactionCashLog" json, "productId" uuid NOT NULL, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cash" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying(20) NOT NULL, "type" character varying(20) NOT NULL, "value" smallint NOT NULL, "quantity" smallint NOT NULL DEFAULT '0', CONSTRAINT "CHK_60ae77da3ee9a174f84c60fc13" CHECK (
    (type = 'coin' AND value IN (1, 2, 5, 10)) OR
    (type = 'banknote' AND value IN (20, 50, 100, 500, 1000))
), CONSTRAINT "PK_4c783e1bd52fcdfacfb74499a13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "parentId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" smallint NOT NULL DEFAULT '0', "categoryId" uuid, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_43222947f71eee4febe010e3687" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_21a1ee6cac7c6de7397b70f0f24" FOREIGN KEY ("previewPicId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_d4429ca373301f38e8df1363f27" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_4156c96b439e425420e79a78edb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`
            INSERT INTO cash (id, type, value, quantity) 
            VALUES
                ('C0001', 'coin', 1, 0),
                ('C0002', 'coin', 2, 0),
                ('C0005', 'coin', 5, 0),
                ('C0010', 'coin', 10, 0),
                ('B0020', 'banknote', 20, 0),
                ('B0050', 'banknote', 50, 0),
                ('B0100', 'banknote', 100, 0),
                ('B0500', 'banknote', 500, 0),
                ('B1000', 'banknote', 1000, 0);
            `
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_4156c96b439e425420e79a78edb"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d4429ca373301f38e8df1363f27"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_21a1ee6cac7c6de7397b70f0f24"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_43222947f71eee4febe010e3687"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "cash"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
