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
/* Text */
const chalk = require("chalk");
const figlet = require("figlet");
const command_1 = require("../lib/command");
const new_project_command_1 = require("../projects/angular/new-project.command");
const new_project_command_2 = require("../projects/django/new-project.command");
const Enquirer = require("enquirer");
class NewCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.scope.project) {
                console.log(chalk.red("Must be run inside an existing project"));
                return;
            }
            this.displayBanner();
            console.log("\n");
            console.log(chalk.blueBright("Create a new project in ") + chalk.cyanBright(this.scope.project.slug));
            console.log("\n");
            const response = yield this.promptForProjectType();
            let cmd;
            switch (response['projectType']) {
                case 'django':
                    cmd = new new_project_command_2.NewDjangoProjectCommand(this.scope);
                    return cmd.run();
                case 'angular':
                    cmd = new new_project_command_1.NewAngularProjectCommand(this.scope);
                    return cmd.run();
            }
        });
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = [];
            return {};
        });
    }
    displayBanner() {
        console.log(chalk.blueBright(figlet.textSync('Agape', { horizontalLayout: 'full' })));
    }
    promptForProjectType() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = new Enquirer();
            return p.prompt([{
                    name: 'projectType',
                    type: 'select',
                    message: 'Select a project type',
                    choices: ['angular', 'django', 'sandbox', 'node', 'typescript']
                }]);
        });
    }
}
exports.NewCommand = NewCommand;
