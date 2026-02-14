import CLI from "./core/cli/cli";

async function main() {
    const cli = new CLI(process.argv);

    cli.registerCommand("help", "a help command")
        .action(() => { console.log("help")});

    cli.run();
}

main();