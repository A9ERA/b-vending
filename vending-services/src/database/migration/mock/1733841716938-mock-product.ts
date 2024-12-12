import { MigrationInterface, QueryRunner } from "typeorm";
const fs = require('fs');
const path = require('path');

export class MockProduct1733841716938 implements MigrationInterface {
    name = 'MockProduct1733841716938'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sqlFilePath = path.join(__dirname, './sql/product.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        await queryRunner.query(sql);
    }
    public async down(): Promise<void> {
        // No need to rollback
    }
}