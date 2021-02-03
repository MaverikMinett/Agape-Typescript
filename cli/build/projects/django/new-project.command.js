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
exports.NewDjangoProjectCommand = void 0;
const command_1 = require("../../lib/command");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const child_process_1 = require("child_process");
const inquirer = require("inquirer");
const create_readme_macro_1 = require("../../macros/create-readme.macro");
const descriptors_1 = require("../../lib/descriptors");
const scope_1 = require("../../lib/scope");
class NewDjangoProjectCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let cmd;
            const p = this.scope.project;
            let stash = { 'slug': 'api', 'primaryModule': 'app' };
            let sourcePath = process.cwd();
            if (path.resolve(p.path) == path.resolve(process.cwd()))
                sourcePath = path.join(p.path, p.childrenPath);
            let projectPath = path.join(sourcePath, stash.slug);
            fs.mkdirSync(projectPath, { recursive: true });
            const projectOptions = yield this.promptForProjectOptions();
            Object.assign(this.scope.stash, projectOptions);
            const djangoOptions = yield this.promptForDjangoOptions();
            Object.assign(this.scope.stash, djangoOptions);
            // create project from options
            // let d = bless( new ProjectDescriptor( this.scope.stash ), DjangoProject )
            let d = new descriptors_1.ProjectDescriptor(this.scope.stash);
            d.type = "django";
            d.parent = this.scope.project;
            d.path = projectPath;
            /* Create the django application */
            process.stdout.write(chalk.blue("Creating django project... "));
            cmd = child_process_1.spawnSync(`django-admin`, ['startproject', stash.primaryModule], { cwd: sourcePath });
            fs.renameSync(path.join(sourcePath, stash.primaryModule), path.join(projectPath));
            process.stdout.write(chalk.blue("done\n"));
            /* Create the virtual environment */
            process.stdout.write(chalk.blue("Creating python virtual environment... "));
            cmd = child_process_1.spawnSync(`virtualenv`, ['-p', 'python3', 'venv'], { cwd: projectPath });
            process.stdout.write(chalk.blue("done\n"));
            /* Install django into the virtual environment */
            process.stdout.write(chalk.blue("Installing python packages... "));
            cmd = child_process_1.spawnSync(`venv/bin/pip`, ['install', 'django'], { cwd: projectPath });
            process.stdout.write(chalk.blue("done\n"));
            /* Create requirements.txt file */
            process.stdout.write(chalk.blue("Creating requirements.txt file... "));
            cmd = child_process_1.spawnSync(`venv/bin/pip`, ['freeze', '>', 'requirements.txt'], { cwd: projectPath });
            process.stdout.write(chalk.blue("done\n"));
            /* Migrate */
            process.stdout.write(chalk.blue("Migrating database... "));
            cmd = child_process_1.spawnSync(`venv/bin/python`, ['manage.py', 'migrate'], { cwd: projectPath });
            process.stdout.write(chalk.blue("done\n"));
            /* Create .gitignore file */
            process.stdout.write(chalk.blue("Creating .gitignore file... "));
            fs.writeFileSync(path.join(projectPath, '.gitignore'), "venv\napp/local_settings.py\n");
            process.stdout.write(chalk.blue("done\n"));
            /* Create the agape.json file */
            this.writeProjectFile(d);
            /* Create a new scope for the new project */
            let s = new scope_1.Scope(d);
            // console.log( "---->", s.project )
            /* create readme */
            process.stdout.write(chalk.blue("Creating README.md file... "));
            const macro = new create_readme_macro_1.CreateReadmeMacro(s);
            yield macro.run();
            process.stdout.write(chalk.blue("done\n"));
            console.log("\n" + chalk.blue("Successfully created project ") + chalk.cyanBright(d.token) + "\n");
        });
    }
    promptForProjectOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = {
                'name': `${this.scope.project.sandbox.name} API`,
                'slug': 'api',
                'django': { 'primaryModule': 'app' },
                'license': this.scope.project.sandbox.license,
                'author': this.scope.project.sandbox.author,
                'email': this.scope.project.sandbox.email,
                'port': `341${this.scope.project.sandbox.port || '01'}`
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
    promptForDjangoOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let stash = {
                'name': `${this.scope.project.sandbox.name} API`,
                'slug': 'api',
                'django': { 'primaryModule': 'app' },
                'port': `431${this.scope.project.sandbox.port || '00'}`
            };
            const questions = [
                {
                    name: 'django.primaryModule',
                    type: 'input',
                    message: 'Primary module',
                    default: stash.django.primaryModule
                },
                {
                    name: 'port',
                    type: 'input',
                    message: 'Port for development server',
                    default: stash.port
                }
            ];
            return inquirer.prompt(questions);
        });
    }
    writeProjectFile(projectDescriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            /* create ag file */
            let s = new descriptors_1.ProjectDescriptorSerializer();
            let d = s.deflate(projectDescriptor);
            // console.log( projectDescriptor )
            process.stdout.write(chalk.blue("Creating projects.json file... "));
            fs.writeFileSync(path.join(projectDescriptor.path, 'project.json'), JSON.stringify(d, null, 4));
            process.stdout.write(chalk.blue("done\n"));
            // this.scope.templateer.renderFile( "README.md", )
            /* create readme */
            // const macro = new CreateReadmeMacro( this.scope )
            // await macro.run( )
            // console.log(chalk.blue("Created Readme"))
        });
    }
}
exports.NewDjangoProjectCommand = NewDjangoProjectCommand;
