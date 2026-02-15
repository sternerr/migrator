import path from "node:path";
import fs from "node:fs";

export default class Migrator {
    private migrationDir: string = path.join(process.cwd(), "migrations");

    constructor() {}

    create() {
        try {
            const stat = fs.lstatSync(this.migrationDir);
        } catch(error) {
            fs.mkdirSync(this.migrationDir);
        }

        const timestamp = Date.now();
        const filename = `${timestamp}.sql`;
        const filepath = path.join(this.migrationDir, filename);

        fs.writeFileSync(filepath, "");
        console.log("Created:", filename);
    }
}