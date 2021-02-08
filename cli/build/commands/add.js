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
const chalk = require("chalk");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs");
const commander = require("commander");
const child_process_1 = require("child_process");
const command_1 = require("../lib/command");
const string_1 = require("@agape/string");
class AddCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.scope.project) {
                console.log(chalk.red("Must be run inside an existing project"));
                return;
            }
            this.displayBanner();
            // console.log( "\n" )
            // console.log( chalk.blueBright( "Create a new project in " ) + chalk.cyanBright(this.scope.project.slug) );
            // console.log( "\n" )
            // const response = await this.promptForProjectType()
            let args = commander.args;
            args.pop();
            const arg = commander.args[1];
            try {
                let cmd;
                switch (this.scope.project.type) {
                    // case 'django':
                    // cmd = new NewDjangoProjectCommand( this.scope )
                    // return cmd.run()
                    // break;
                    case 'angular':
                        switch (arg) {
                            case 'material-icons':
                                return yield this.addMaterialIconsToAngularProject();
                        }
                }
                console.log(chalk.red("Could not add ")
                    + chalk.cyan(arg)
                    + chalk.red(" to ")
                    + chalk.cyan(this.scope.project.token), +chalk.red(", no handler exists."));
            }
            catch (error) {
                console.log(chalk.red("Error: " + error));
            }
            return;
        });
    }
    // public async prompt() {
    //     const questions = [
    //     ]
    //     return { }
    // }
    displayBanner() {
        console.log(chalk.blueBright(figlet.textSync('Agape', { horizontalLayout: 'full' })));
    }
    addFontToAngularProject(fontName) {
        return __awaiter(this, void 0, void 0, function* () {
            let cmd;
            let token = string_1.tokenize(fontName);
            let p = this.scope.project;
            process.stdout.write(chalk.blue(`Installing font ${fontName}... `));
            cmd = child_process_1.spawnSync('npm', ['install', '@fontsource/${token}'], { cwd: p.path });
            process.stdout.write(chalk.blue("done\n"));
            try {
                fs.appendFileSync(path.join(p.path, 'src', 'styles.scss'), "\n" + `import "@fontsource/${token}"` + "\n");
                process.stdout.write(chalk.blue("done\n"));
            }
            catch (error) {
                process.stdout.write(chalk.red("error\n"));
                process.stdout.write(chalk.red(`  ${error}error\n`));
            }
        });
    }
    addMaterialIconsToAngularProject() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding material icons to project");
            this.addFontToAngularProject("material-icons");
        });
    }
}
exports.AddCommand = AddCommand;
