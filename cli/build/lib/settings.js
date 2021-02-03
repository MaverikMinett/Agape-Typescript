"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const path = require("path");
const object_1 = require("@agape/object");
const descriptors_1 = require("./descriptors");
const util_1 = require("../lib/util");
class Settings {
    _build_appDataDir() {
        const system_appdata_dir = process.env.APPDATA
            || (process.platform == 'darwin'
                ? process.env.HOME + '/Library/Preferences'
                : process.env.HOME + "/.local/share");
        return path.join(system_appdata_dir, 'agape');
    }
    _build_author() {
        const filepath = path.join(this.appDataDir, 'author.json');
        return util_1.load_author_file(filepath);
    }
}
__decorate([
    object_1.lazy,
    object_1.build,
    __metadata("design:type", String)
], Settings.prototype, "appDataDir", void 0);
__decorate([
    object_1.lazy,
    object_1.build,
    __metadata("design:type", descriptors_1.AuthorDescriptor)
], Settings.prototype, "author", void 0);
exports.Settings = Settings;
