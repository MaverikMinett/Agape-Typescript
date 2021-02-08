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
/* Commands */
const commander = require("commander");
const init_1 = require("./commands/init");
const add_1 = require("./commands/add");
const new_1 = require("./commands/new");
const start_1 = require("./commands/start");
/* Create a new sandbox */
commander.command('init')
    .description('Create a sandbox')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    let command = new init_1.InitCommand();
    command.run();
}));
/* Create a new project in an existing sandbox */
commander.command('new')
    .description('Create a new project')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    let command = new new_1.NewCommand();
    command.run();
}));
/* Add resources to an existing project */
commander.command('add')
    .description("Add resource to a project")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    let command = new add_1.AddCommand();
    command.run();
}));
/* "Start" a project, launching development server or executable */
commander.command('start')
    .description('Start the development server for a project')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    let command = new start_1.StartCommand();
    yield command.run();
}));
commander.parse(process.argv);
if (!commander.args.length) {
    commander.help();
}
