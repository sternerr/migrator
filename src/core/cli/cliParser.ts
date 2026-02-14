export interface ParsedArgs {
    subcommand: string;
    options: Record<string, string | boolean>;
}

export function cliParser(args: string[]): ParsedArgs {
    const parsedArgs: ParsedArgs = { subcommand: "", options: {}}

    for(let i = 0; i < args.length; i++) {
        if(!args[i].startsWith("--") && !args[i].startsWith("-")) {
            parsedArgs.subcommand = args[i];
            continue;
        }

        if(args[i].startsWith("--")) {
            const [option, value] = args[i].split("=");

            parsedArgs.options[option] = value ?? true;
            continue;
        }
        
        if(args[i].startsWith("-")) {
            const nextArg = args[i + 1];
            const option = args[i];

            if(nextArg && !(nextArg.startsWith("--") || nextArg.startsWith("-"))) {
                parsedArgs.options[option] = nextArg;
                i++;
                continue;
            } else {
                parsedArgs.options[option] = true;
            }
        }
    }

    return parsedArgs
}