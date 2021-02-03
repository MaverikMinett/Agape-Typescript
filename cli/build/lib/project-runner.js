"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRunner = void 0;
const child_process = require("child_process");
class ProjectRunner {
    constructor(scope) {
        this.scope = scope;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = this.scope.project;
            if (p.type == "django") {
                const host = p.host ? p.host : 'localhost';
                const port = p.port ? p.port : '8000';
                console.log(`Starting ${p.name}...`);
                let child = child_process.spawn('venv/bin/python', ['manage.py', 'runserver', `${host}:${port}`], {
                    cwd: p.path,
                    stdio: [null, process.stdout, null]
                });
            }
            else if (p.type == "angular") {
                const host = p.host ? p.host : 'localhost';
                const port = p.port ? p.port : '4200';
                console.log(`Starting ${p.name}...`);
                let child = child_process.spawn('ng', ['serve'], {
                    cwd: p.path,
                    stdio: [null, process.stdout, null]
                });
            }
        });
    }
}
exports.ProjectRunner = ProjectRunner;
