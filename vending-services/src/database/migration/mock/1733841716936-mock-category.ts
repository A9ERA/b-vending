import { MigrationInterface, QueryRunner } from "typeorm";
const fs = require('fs');
const path = require('path');

export class MockCategory1733841716936 implements MigrationInterface {
    name = 'MockCategory1733841716936'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sqlFilePath = path.join(__dirname, './sql/category.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        await queryRunner.query(sql);
    }
    public async down(): Promise<void> {
        // No need to rollback
    }
}