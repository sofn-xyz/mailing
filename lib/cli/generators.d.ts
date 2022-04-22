export declare function getPagesDirPath(): string | null;
export declare function generateNextPages({ isTypescript, }: {
    isTypescript: boolean;
}): Promise<boolean>;
export declare function generateEmailsDirectory({ isTypescript, }: {
    isTypescript: boolean;
}): Promise<boolean>;
