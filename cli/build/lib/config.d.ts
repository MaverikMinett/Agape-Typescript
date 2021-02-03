/**
 * For reading/writing the ag-cli configuration to the user preferences directory.
 */
export declare class Config {
    all: any;
    constructor();
    getSettingsPath(): string;
    readConfigFile(): any;
    writeConfig(): void;
}
declare const _default: Config;
export default _default;
