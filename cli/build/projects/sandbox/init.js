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
exports.InitSandboxCommand = void 0;
/* Text */
const chalk = require("chalk");
const figlet = require("figlet");
/* Files */
const fs = require("fs");
const path = require("path");
/* Cli */
const inquirer = require("inquirer");
/* Strings */
const object_1 = require("@agape/object");
const string_1 = require("@agape/string");
/* Config */
const config_1 = require("../../lib/config");
const descriptors_1 = require("../../lib/descriptors");
const command_1 = require("../../lib/command");
const macro_1 = require("../../lib/macro");
class InitSandboxCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = this.scope.stash;
            /* directory must be empty to call this command */
            if (fs.readdirSync(process.cwd()).length > 0) {
                console.log(chalk.red("Directory must be empty."));
                return;
            }
            /* populate default values on the stash */
            /* get the default project name and slug from the directory name */
            stash.slug = path.basename(process.cwd());
            stash.name = string_1.verbalize(stash.slug);
            /* set the current year on the stash */
            const now = new Date();
            stash.year = now.getFullYear();
            /* get author information from configuration */
            Object.assign(stash, config_1.default.all);
            /* display banner and prompt the user */
            console.log(chalk.blueBright(figlet.textSync('Agape', { horizontalLayout: 'full' })) + "\n"
                + chalk.greenBright(figlet.textSync(stash.name, { horizontalLayout: 'full' })));
            const response = yield this.prompt(stash);
            Object.assign(stash, response);
            let macro = new InitSandboxMacro(this.scope);
            macro.run();
        });
    }
    prompt(stash) {
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Workspace name:',
                default: stash.name,
                validate: (value) => {
                    return value.length ? true : 'Required';
                }
            },
            {
                name: 'slug',
                type: 'input',
                message: 'Slug:',
                default: stash.slug,
                validate: (value) => {
                    return value.length ? true : 'Required';
                }
            },
            {
                name: 'port',
                type: 'input',
                message: 'Port',
                default: "00",
            },
            {
                name: 'description',
                type: 'input',
                message: 'Description:',
            },
            {
                name: 'license',
                type: 'input',
                message: 'License:',
                default: stash.license,
            },
            {
                name: 'author',
                type: 'input',
                message: 'Author:',
                default: stash.author,
            },
            {
                name: 'email',
                type: 'input',
                message: 'Email',
                default: stash.email,
            }
        ];
        return inquirer.prompt(questions);
    }
}
exports.InitSandboxCommand = InitSandboxCommand;
class InitSandboxMacro extends macro_1.Macro {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = this.scope.stash;
            let d = new descriptors_1.ProjectDescriptor(this.scope.stash);
            d.parent = this.scope.project;
            d.path = process.cwd();
            d.childrenPath = "src";
            d.type = "sandbox";
            yield this.writeProjectFile(d);
            yield this.writeReadmeFile(d);
            /* create readme */
            // this.scope.templateer.renderFile( "README.md", "README.md", stash )
            // console.log(chalk.blue("Created Readme"))
        });
    }
    writeProjectFile(projectDescriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            /* create ag file */
            let s = new descriptors_1.ProjectDescriptorSerializer();
            let d = s.deflate(projectDescriptor);
            process.stdout.write(chalk.blue("Creating project.json file... "));
            fs.writeFileSync(path.join(projectDescriptor.path, 'project.json'), JSON.stringify(d, null, 4));
            process.stdout.write(chalk.blue("done\n"));
        });
    }
    writeReadmeFile(projectDescriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            process.stdout.write(chalk.blue("Creating readme file... "));
            let data = object_1.deflate(projectDescriptor);
            this.scope.templateer.renderFile("README.md", path.join(projectDescriptor.path, "README.md"), { project: data });
            process.stdout.write(chalk.blue("done\n"));
        });
    }
}
