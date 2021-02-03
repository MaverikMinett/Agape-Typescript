export declare class Templateer {
    sources: Array<string>;
    constructor(...sources: any[]);
    getAppDataDir(): string;
    renderFile(templatePath: string, outputPath: string, stash: {
        [key: string]: any;
    }): void;
    findTemplate(template: string): string;
}
