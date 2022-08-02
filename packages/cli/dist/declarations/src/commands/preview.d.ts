import { ArgumentsCamelCase } from "yargs";
export declare type PreviewArgs = ArgumentsCamelCase<{
    port?: number;
    quiet?: boolean;
}>;
export declare const command = "preview";
export declare const describe = "start the email preview server";
export declare const builder: {
    port: {
        default: number;
    };
};
export declare const handler: (argv: PreviewArgs) => Promise<void>;
