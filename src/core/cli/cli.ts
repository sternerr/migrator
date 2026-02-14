import path from "path";
import { parseArguments } from "./parseArguments.js";
import Command from "./command";


export default class CLI {
    private args: string[];
    private migrationDir: string;
    private commands: Command[] = [];

    constructor(args: string[], migrationDir: string = "/migrations") {
        this.args = args.slice(2);
        this.migrationDir = path.join(process.cwd(), migrationDir)
    }

    registerCommand(name: string, description: string) {
        const newCommand = new Command(name, description);
        this.commands.push(newCommand);
        return newCommand
    }

    run() {
        const parsedArgs = parseArguments(this.args);
        let command: Command;

        for(const cmd of this.commands) {
            if(cmd.getName.toLowerCase() == parsedArgs.subcommand.toLowerCase()) {
                command = cmd;
                break;
            }
        }

        if(command) {
            command.execute();
        } else {
            this.help();
        }
    }

    private help() {
        console.log("Usage: <SUBCOMMAND> [OPTIONS]\n");
        console.log("Commands");
        for(const cmd of this.commands) {
            console.log(`${cmd.getName}\t${cmd.getDescription}`)
        }
    }
}