import { describe, it } from "node:test";
import { parseArguments, ParsedArgs } from "./parseArguments";
import assert from "node:assert";

describe("argument parser", () => {
    it("parser", () => {
        const tests = [
            {
                data: ["--help"],
                expected: {
                    subcommand: "",
                    options: { "--help": true },
                }
            },
            {
                data: ["subcommand"],
                expected: {
                    subcommand: "subcommand",
                    options: {},
                }
            },
            {
                data: ["subcommand", "--help"],
                expected: {
                    subcommand: "subcommand",
                    options: { "--help": true }
                }
            },
            {
                data: ["subcommand", "--flag=data", "-f", "data"],
                expected: {
                    subcommand: "subcommand",
                    options: { "--flag": "data", "-f": "data" },
                }
            },
            {
                data: ["subcommand", "-h", "-f", "data"],
                expected: {
                    subcommand: "subcommand",
                    options: { "-h": true, "-f": "data" },
                }
            },
        ];

        for(let i = 0; i < tests.length; i++) {
            const result = parseArguments(tests[i].data);
            assert.deepStrictEqual(
                result,
                tests[i].expected
            )
        }

    })
});

function areParsedArgsEqual(a: ParsedArgs, b: ParsedArgs): boolean {
    if (a.subcommand !== b.subcommand) return false;

    const aKeys = Object.keys(a.options);
    const bKeys = Object.keys(b.options);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if (a.options[key] !== b.options[key]) return false;
    }

    return true;
}