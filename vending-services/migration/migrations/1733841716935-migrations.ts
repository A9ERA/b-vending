import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733841716935 implements MigrationInterface {
    name = 'Migrations1733841716935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" text NOT NULL, "file_type" character varying(128) NOT NULL, "product_id" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "price" smallint NOT NULL DEFAULT '0', "desc" text, "preview_pic_id" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying(20) NOT NULL, "amount_paid" smallint NOT NULL DEFAULT '0', "change_given" smallint NOT NULL DEFAULT '0', "transaction_cash_log" json, "product_id" uuid NOT NULL, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cash" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying(20) NOT NULL, "type" character varying(20) NOT NULL, "value" smallint NOT NULL, "quantity" smallint NOT NULL DEFAULT '0', CONSTRAINT "CHK_d700c6f893b00a77f40b92367b" CHECK (
    (type = 'coin' AND value IN (1, 2, 5, 10)) OR
    (type = 'banknote' AND value IN (20, 50, 100, 500, 1000))
), CONSTRAINT "PK_4c783e1bd52fcdfacfb74499a13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "parent_id" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" smallint NOT NULL DEFAULT '0', "product_id" uuid NOT NULL, "category_id" uuid, CONSTRAINT "REL_732fdb1f76432d65d2c136340d" UNIQUE ("product_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6ebf55ebdf712845934e882cb1a" FOREIGN KEY ("preview_pic_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_8f8fa9c4a20b839a9272d908b87" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_697de7a94023ebb8a8e62c14f0a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`
            INSERT INTO cash (id, type, value, quantity) VALUES
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
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_697de7a94023ebb8a8e62c14f0a"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_8f8fa9c4a20b839a9272d908b87"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6ebf55ebdf712845934e882cb1a"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "cash"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
