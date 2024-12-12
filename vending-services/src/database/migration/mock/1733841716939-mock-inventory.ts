import { MigrationInterface, QueryRunner } from "typeorm";
const fs = require('fs');
const path = require('path');

export class MockInventory1733841716939 implements MigrationInterface {
    name = 'MockInventory1733841716939'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sqlFilePath = path.join(__dirname, './sql/inventory.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        await queryRunner.query(sql);
    }
    public async down(): Promise<void> {
        // No need to rollback
    }
}