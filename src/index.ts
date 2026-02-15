import CLI from "./core/cli/cli";
import Migrator from "./core/migrator/migrator";

async function main() {
    const cli = new CLI(process.argv);

    cli.registerCommand("create", "Creates a migration file")
        .setOption("--filename", "")
        .setHandler((args: any) => {
            const migrator = new Migrator();
            migrator.create(args);
        });

    cli.run();
}

main();