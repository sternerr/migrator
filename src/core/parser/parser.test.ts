import assert from "node:assert";
import { describe, it } from "node:test";

import parseSqlStatements from "./parser";

describe("sql parser", () => {
    it("sql statemets", () => {
        const mockSQL = `
            -- up
            CREATE TABLE IF NOT EXISTS Users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL
            );
            
            INSERT INTO Users ("name") VALUES
                ('Alice'),
                ('Bob')
            ON CONFLICT DO NOTHING;
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.up, [
            `CREATE TABLE IF NOT EXISTS Users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL
            );`,
            `INSERT INTO Users ("name") VALUES
                ('Alice'),
                ('Bob')
            ON CONFLICT DO NOTHING;`
        ]);
    });

    it("sql statemets with semiclon in value", () => {
        const mockSQL = `
            -- up
            INSERT INTO Users ("name") VALUES
                ('Al;ice'),
                ('Bo;b')
            ON CONFLICT DO NOTHING;
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.up, [
            `INSERT INTO Users ("name") VALUES
                ('Al;ice'),
                ('Bo;b')
            ON CONFLICT DO NOTHING;`
        ]);
    });

    it("sql statemets with attribute inside double quotes", () => {
        const mockSQL = `
            -- up
            CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.up, [
            `CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );`,
        ]);
    });

    it("sql statemets up", () => {
        const mockSQL = `
            -- up
            CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.up, [
            `CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );`,
        ]);
    });

    it("sql statemets down", () => {
        const mockSQL = `
            -- down
            CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.down, [
            `CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );`,
        ]);
    });

    it("sql statemets both up and down", () => {
        const mockSQL = `
            -- up
            CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );

            -- down
            DROP TABLE users;
        `;

        const result = parseSqlStatements(Buffer.from(mockSQL, "utf-8"));
        assert.deepStrictEqual(result.up, [
            `CREATE TABLE IF NOT EXISTS "Users" (
                "id" SERIAL PRIMARY KEY,
                "name" TEXT NOT NULL
            );`,
        ]);

        assert.deepStrictEqual(result.down, [
            `DROP TABLE users;`,
        ]);
    })
})