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
exports.StartCommand = void 0;
const util_1 = require("../lib/util");
const project_1 = require("../projects/angular/project");
const start_1 = require("../projects/angular/commands/start");
const project_2 = require("../projects/django/project");
const start_2 = require("../projects/django/commands/start");
class StartCommand {
    run(args = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = util_1.load_closest_project();
            console.log("START--->", project);
            if (!project)
                throw new Error("Must be run inside an existing project");
            const command = this.getHandler(project);
            command.run(args);
        });
    }
    getHandler(project) {
        if (project instanceof project_1.AngularProject) {
            return new start_1.StartAngularProjectCommand(project);
        }
        else if (project instanceof project_2.DjangoProject) {
            return new start_2.StartDjangoProjectCommand(project);
        }
        else {
            throw new Error(`Project of type ${project.type} has no handler for start command`);
        }
    }
}
exports.StartCommand = StartCommand;
