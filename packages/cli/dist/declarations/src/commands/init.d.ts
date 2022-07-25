import { ArgumentsCamelCase } from "yargs";
export declare const command: string[];
export declare const describe = "initialize mailing in your app";
export declare const handler: (args: ArgumentsCamelCase<{
    port?: number;
}>) => Promise<void>;
