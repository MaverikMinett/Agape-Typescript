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
exports.NewCommand = void 0;
const new_1 = require("../projects/angular/commands/new");
const new_2 = require("../projects/django/commands/new");
const Enquirer = require("enquirer");
class NewCommand {
    run(args = []) {
        return __awaiter(this, void 0, void 0, function* () {
            // const project = load_closest_project()
            // console.log( args )
            let projectType = args.length > 0 ? args.pop() : yield this.promptForProjectType();
            const command = this.getHandler(projectType);
            command.run();
        });
    }
    getHandler(projectType) {
        switch (projectType) {
            case 'django':
                return new new_2.NewDjangoProjectCommand();
            case 'angular':
                return new new_1.NewAngularProjectCommand();
        }
    }
    promptForProjectType() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Enquirer();
            const response = yield p.prompt([{
                    name: 'projectType',
                    type: 'select',
                    message: 'Select a project type',
                    choices: ['angular', 'django', 'sandbox', 'node', 'typescript']
                }]);
            return response['projectType'];
        });
    }
}
exports.NewCommand = NewCommand;
