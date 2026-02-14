
export default class Command {
    private name: string;
    private description: string;
    private handler: Function;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    action(handler: Function): this {
        this.handler = handler;
        return this;
    }

    execute() { this.handler() }

    get getName() { return this.name; }
    get getDescription() { return this.description; }
}