import { ArgumentsCamelCase } from "yargs";
declare type Args = ArgumentsCamelCase<{
    port?: number;
}>;
export declare const command = "preview";
export declare const describe = "start the email preview server";
export declare const builder: {
    port: {
        default: number;
    };
};
export declare const handler: (argv: Args) => Promise<void>;
export {};
