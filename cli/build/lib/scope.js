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
exports.Scope = void 0;
const object_1 = require("@agape/object");
const templateer_1 = require("@agape/templateer");
const util_1 = require("../lib/util");
const descriptors_1 = require("./descriptors");
const settings_1 = require("./settings");
/**
 * Cli application state
 */
class Scope {
    /**
     * @param stash For holding user responses and temporary data
     */
    constructor(project, stash = {}) {
        this.stash = stash;
        if (project != undefined)
            this.project = project;
    }
    _build_templateer() {
        let t = new templateer_1.Templateer();
        // t.addSource( path.join( this.settings.appDataDir, 'templates' ) )
        // t.addSource( path.join( path.dirname(__dirname), 'templates' ) )
        return t;
    }
    renderFile(filepath, outpath) {
        let templatePath = filepath;
        let targetPath = outpath || templatePath;
        this.templateer.renderFile(templatePath, targetPath, this);
    }
}
__decorate([
    object_1.lazy(o => util_1.load_closest_project()),
    __metadata("design:type", descriptors_1.ProjectDescriptor)
], Scope.prototype, "project", void 0);
__decorate([
    object_1.lazy(o => new settings_1.Settings()),
    __metadata("design:type", settings_1.Settings)
], Scope.prototype, "settings", void 0);
__decorate([
    object_1.nonenumerable,
    object_1.lazy,
    object_1.build,
    __metadata("design:type", templateer_1.Templateer
    /**
     * @param stash For holding user responses and temporary data
     */
    )
], Scope.prototype, "templateer", void 0);
exports.Scope = Scope;
