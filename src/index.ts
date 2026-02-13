import CLI from "./core/cli/cli";

async function main() {
    const cli = new CLI(process.argv);
    cli.run();
}

main();