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
exports.AddCommand = void 0;
const util_1 = require("../lib/util");
const project_1 = require("../projects/angular/project");
const add_1 = require("../projects/angular/commands/add");
class AddCommand {
    run(args = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = util_1.load_closest_project();
            if (!project)
                throw new Error("Must be run inside an existing project");
            const command = this.getHandler(project);
            command.run(args);
        });
    }
    getHandler(project) {
        if (project instanceof project_1.AngularProject) {
            return new add_1.AddToAngularProjectCommand(project);
        }
        else {
            throw new Error(`Project of type ${project.type} has no handler for add command`);
        }
    }
}
exports.AddCommand = AddCommand;
