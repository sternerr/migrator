import fs from "fs";
import path from "path";
import pg from "pg";

import parseSqlStatements from "../parser/parser.js";

export default class CLI {
    private args: string[];
    private migrationDir: string;

    constructor(args: string[], migrationDir: string = "/migrations") {
        this.args = args.slice(2);
        this.migrationDir = path.join(process.cwd(), migrationDir)
    }

    async run() {
        const [file, connectionString] = this.args;

        if (!file || !connectionString) {
            this.help();
            return;
        }

        const client = new pg.Client({ connectionString });

        try {
            await client.connect();

            const buffer = fs.readFileSync(path.join(this.migrationDir, file));
            const stmts = parseSqlStatements(buffer);

            for (const s of stmts) {
                console.log(s);
                await client.query(s);
            }
        } catch (err) {
            console.error("Migration failed:", err);
        } finally {
            await client.end();
        }
    }

    private help() {
        console.log("Usage: <file> <connectionstring>");
    }
}