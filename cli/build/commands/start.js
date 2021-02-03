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
/* Text */
const chalk = require("chalk");
const figlet = require("figlet");
const command_1 = require("../lib/command");
const project_runner_1 = require("../lib/project-runner");
class StartCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.scope.project) {
                console.log(chalk.red("Must be run inside an existing project"));
                return;
            }
            // else {
            //     console.log( this.scope.project )
            // }
            this.displayBanner();
            console.log("\n");
            console.log(chalk.blueBright("Starting ") + chalk.cyanBright(this.scope.project.token));
            console.log("\n");
            // this.scope.project.start()
            let runner = new project_runner_1.ProjectRunner(this.scope);
            yield runner.run();
        });
    }
    displayBanner() {
        console.log(chalk.blueBright(figlet.textSync('Agape', { horizontalLayout: 'full' })));
    }
}
exports.StartCommand = StartCommand;
