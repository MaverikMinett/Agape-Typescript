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
exports.Command = void 0;
const object_1 = require("@agape/object");
const scope_1 = require("./scope");
const traits_1 = require("./traits");
let Command = class Command {
    constructor(scope) {
        if (scope != undefined)
            this.scope = scope;
    }
    run() {
        throw new Error(`run method not implemented in ${this.constructor.name}`);
    }
};
Command = __decorate([
    object_1.include(traits_1.LazyScope),
    __metadata("design:paramtypes", [scope_1.Scope])
], Command);
exports.Command = Command;
