import { ArgumentsCamelCase } from "yargs";
export declare const command = "preview";
export declare const describe = "start the email preview server";
export declare const builder: {
    port: {
        default: number;
    };
};
export declare const handler: (argv: ArgumentsCamelCase<{
    port?: number;
    quiet?: boolean;
}>) => Promise<void>;
