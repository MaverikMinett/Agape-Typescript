"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs = require("fs");
const path = require("path");
/**
 * For reading/writing the ag-cli configuration to the user preferences directory.
 */
class Config {
    // public author: object
    constructor() {
        this.all = this.readConfigFile();
        // this.author = this.readAuthorFile();
    }
    getSettingsPath() {
        const system_appdata_dir = process.env.APPDATA
            || (process.platform == 'darwin'
                ? process.env.HOME + '/Library/Preferences'
                : process.env.HOME + "/.local/share");
        return path.join(system_appdata_dir, 'agape');
    }
    readConfigFile() {
        const filepath = path.join(this.getSettingsPath(), 'config.json');
        if (!fs.existsSync(filepath)) {
            return {};
        }
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }
    // public readAuthorFile() {
    //     const filepath = path.join( this.getSettingsPath(), 'author.json' );
    //     if ( ! fs.existsSync(filepath) ) {
    //         return { }
    //     }
    //     return JSON.parse( fs.readFileSync(filepath, 'utf-8') );
    // }
    writeConfig() {
        const settings_path = this.getSettingsPath();
        const filepath = path.join(settings_path, 'config.json');
        if (!fs.existsSync(settings_path)) {
            fs.mkdirSync(settings_path);
        }
        return fs.writeFileSync(filepath, JSON.stringify(this.all, null, 4));
    }
}
exports.Config = Config;
exports.default = new Config();
