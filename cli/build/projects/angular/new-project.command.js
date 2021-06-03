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
exports.NewAngularProjectCommand = void 0;
const command_1 = require("../../lib/command");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const child_process_1 = require("child_process");
const inquirer = require("inquirer");
const create_readme_macro_1 = require("../../macros/create-readme.macro");
const object_1 = require("@agape/object");
const descriptors_1 = require("../../lib/descriptors");
const scope_1 = require("../../lib/scope");
class NewAngularProjectCommand extends command_1.Command {
    // async prompt() {
    // }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let cmd;
            const p = this.scope.project;
            let stash = { 'slug': 'ui' };
            let sourcePath = process.cwd();
            if (path.resolve(p.path) == path.resolve(process.cwd()))
                sourcePath = path.join(p.path, p.childrenPath);
            let projectPath = path.join(sourcePath, stash.slug);
            const projectOptions = yield this.promptForProjectOptions();
            Object.assign(this.scope.stash, projectOptions);
            const angularOptions = yield this.promptForAngularOptions();
            Object.assign(this.scope.stash, angularOptions);
            // create project from options
            // let d = bless( new ProjectDescriptor( this.scope.stash ), DjangoProject )
            let d = new descriptors_1.ProjectDescriptor(this.scope.stash);
            d.parent = this.scope.project;
            d.path = projectPath;
            d.type = "angular";
            fs.mkdirSync(sourcePath, { recursive: true });
            /* Create the angular application */
            process.stdout.write(chalk.blue("Creating angular workspace... "));
            cmd = child_process_1.spawnSync(`ng`, ['new', stash.slug, '--routing', '--style=scss'], { cwd: sourcePath });
            fs.renameSync(path.join(sourcePath, stash.slug), projectPath);
            process.stdout.write(chalk.blue("done\n"));
            /* Install Material */
            if (this.scope.stash.material) {
                process.stdout.write(chalk.blue("Installing material..."));
                cmd = child_process_1.spawnSync('ag', ['add', '@angular/material', '--save'], { cwd: projectPath });
                process.stdout.write(chalk.blue("done\n"));
            }
            /* Install Moment */
            if (this.scope.stash.moment) {
                process.stdout.write(chalk.blue("Installing moment..."));
                cmd = child_process_1.spawnSync('npm', ['install', 'moment', '--save'], { cwd: projectPath });
                process.stdout.write(chalk.blue("done\n"));
            }
            /* Install Material/Moment Adapter */
            if (this.scope.stash.moment && this.scope.stash.material) {
                process.stdout.write(chalk.blue("Installing moment..."));
                cmd = child_process_1.spawnSync('npm', ['install', '@angular/material-moment-adapter', '--save'], { cwd: projectPath });
                process.stdout.write(chalk.blue("done\n"));
            }
            console.log(this.scope.stash);
            /* Add Material Icons */
            if (this.scope.stash.materialIcons) {
                process.stdout.write(chalk.blue("Installing material icons... "));
                cmd = child_process_1.spawnSync('npm', ['install', 'fontsource', 'material-icons'], { cwd: projectPath });
                process.stdout.write(chalk.blue("done\n"));
                process.stdout.write(chalk.blue("Addinng material icons to styles.scss... "));
                try {
                    fs.appendFileSync(path.join(d.path, 'src', 'styles.scss'), 'import "@fontsource/material-icons"' + "\n");
                    process.stdout.write(chalk.blue("done\n"));
                }
                catch (error) {
                    process.stdout.write(chalk.red("error\n"));
                    process.stdout.write(chalk.red(`  ${error}error\n`));
                }
            }
            /* Create a new scope for the new project */
            let s = new scope_1.Scope(d);
            /* Create the agape.json file */
            this.writeProjectFile(d);
            /* Over-write the app.component.html with the agape version */
            let templateData = object_1.deflate(s.project);
            this.scope.templateer.renderFile("ui/app.component.html", path.join(projectPath, 'src/app/app.component.html'), templateData);
            /* create readme */
            process.stdout.write(chalk.blue("Creating README.md file... "));
            const macro = new create_readme_macro_1.CreateReadmeMacro(s);
            yield macro.run();
            process.stdout.write(chalk.blue("done\n"));
            /* Install Agape */
            // process.stdout.write( chalk.blue("Installing agape...") )
            // cmd = spawnSync('npm', [ 'install', '@agape/core', '@agape/auth', '--save' ], { cwd: projectPath });
            // process.stdout.write( chalk.blue("done\n") )
            // update package.json
            // update environment file
            console.log("\n" + chalk.blue("Successfully created project ") + chalk.cyanBright(d.token) + "\n");
        });
    }
    promptForProjectOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = {
                'name': `${this.scope.project.sandbox.name} UI`,
                'slug': 'ui',
                'angular': {},
                'license': this.scope.project.sandbox.license,
                'author': this.scope.project.sandbox.author,
                'email': this.scope.project.sandbox.email,
                'port': `432${this.scope.project.sandbox.port || '01'}`
            };
            const questions = [
                {
                    name: 'name',
                    type: 'input',
                    message: 'Name:',
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
                    name: 'description',
                    type: 'input',
                    message: 'Description:',
                },
            ];
            const responses = yield inquirer.prompt(questions);
            Object.assign(stash, responses);
            return stash;
        });
    }
    promptForAngularOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = {
                'port': `432${this.scope.project.sandbox.port || '01'}`
            };
            const questions = [
                {
                    name: 'port',
                    type: 'input',
                    message: 'Port for development server',
                    default: stash.port
                },
                {
                    name: 'material',
                    type: 'confirm',
                    message: 'Use material',
                    default: true
                },
                {
                    name: 'materialIcons',
                    type: 'confirm',
                    message: 'Use material icons',
                    default: true,
                },
                {
                    name: 'moment',
                    type: 'confirm',
                    message: 'Use moment.js',
                    default: false
                }
            ];
            return inquirer.prompt(questions);
        });
    }
    addMaterialIcons() {
        return __awaiter(this, void 0, void 0, function* () {
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
            /* create readme */
            // const macro = new CreateReadmeMacro( this.scope )
            // await macro.run( )
            // console.log(chalk.blue("Created Readme"))
        });
    }
}
exports.NewAngularProjectCommand = NewAngularProjectCommand;
