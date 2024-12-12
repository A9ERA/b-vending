import { MigrationInterface, QueryRunner } from "typeorm";
const fs = require('fs');
const path = require('path');

export class MockMedia1733841716937 implements MigrationInterface {
    name = 'MockMedia1733841716937'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sqlFilePath = path.join(__dirname, './sql/media.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        await queryRunner.query(sql);
    }
    public async down(): Promise<void> {
        // No need to rollback
    }
}