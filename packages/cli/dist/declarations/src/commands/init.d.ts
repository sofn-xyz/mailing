import { ArgumentsCamelCase } from "yargs";
export declare type CliArguments = ArgumentsCamelCase<{
    port?: number;
    typescript?: "true" | "false" | boolean;
    "emails-dir"?: "./emails" | "./src/emails";
}>;
export declare const command: string[];
export declare const describe = "initialize mailing in your app";
export declare const builder: {
    typescript: {
        description: string;
    };
    "emails-dir": {
        description: string;
    };
};
export declare const handler: (args: CliArguments) => Promise<void>;
