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
exports.ProjectDescriptorSerializer = exports.ProjectDescriptor = exports.AuthorDescriptor = void 0;
const object_1 = require("@agape/object");
class AuthorDescriptor {
    constructor(params) {
        if (params)
            Object.assign(this, params);
    }
}
exports.AuthorDescriptor = AuthorDescriptor;
class ProjectDescriptor {
    constructor(params) {
        if (params)
            Object.assign(this, params);
        this.year || (this.year = new Date().getFullYear());
    }
    get sandbox() {
        return this.type == "sandbox" ? this : this.parent ? this.parent.sandbox : undefined;
    }
}
__decorate([
    object_1.lazy(o => o.parent ? [(o.parent.token), o.slug].join('.') : o.slug),
    __metadata("design:type", String)
], ProjectDescriptor.prototype, "token", void 0);
exports.ProjectDescriptor = ProjectDescriptor;
class ProjectDescriptorSerializer {
    deflate(project) {
        let r = {};
        for (let field of Object.keys(project)) {
            if (!['parent', 'path', 'token'].includes(field)) {
                r[field] = project[field];
            }
        }
        return r;
    }
}
exports.ProjectDescriptorSerializer = ProjectDescriptorSerializer;
class DistDescriptor {
}
