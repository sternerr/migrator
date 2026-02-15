import CLI from "./core/cli/cli";
import { ParsedArgs } from "./core/cli/parseArguments";
import Migrator from "./core/migrator/migrator";

async function main() {
    const cli = new CLI(process.argv);

    cli.registerCommand("create", "Creates a migration file")
        .action(() => {
            const migrator = new Migrator();
            migrator.create();
        });

    cli.run();
}

main();