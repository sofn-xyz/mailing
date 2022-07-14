export declare function log(message?: any, ...optionalParams: any[]): void;
export declare function error(message?: any, ...optionalParams: any[]): void;
export declare function debug(message?: any, ...optionalParams: any[]): void;
declare const _default: {
    log: typeof log;
    debug: typeof debug;
    error: typeof error;
};
export default _default;
