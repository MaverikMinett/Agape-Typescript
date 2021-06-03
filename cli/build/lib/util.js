"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_author_file = exports.load_closest_project = exports.load_project = exports.appDataDir = void 0;
const fs = require("fs");
const path = require("path");
const project_1 = require("../projects/project");
const project_2 = require("../projects/sandbox/project");
const project_3 = require("../projects/angular/project");
const project_4 = require("../projects/django/project");
const descriptors_1 = require("./descriptors");
const system_appdata_dir = process.env.APPDATA
    || (process.platform == 'darwin'
        ? process.env.HOME + '/Library/Preferences'
        : process.env.HOME + "/.local/share");
exports.appDataDir = path.join(system_appdata_dir, 'agape');
/**
 * Load the project file in the given directory. Will also load
 * all 'parent' projects by looking for project files further up
 * the directory tree until a 'sandbox' project is found.
 * @param dir The project directory to load
 */
function load_project(dir = ".") {
    dir = path.resolve(dir);
    let project;
    let filepath = path.join(dir, 'project.json');
    let params = JSON.parse(fs.readFileSync(filepath));
    params.path = dir;
    switch (params.type) {
        case "angular":
            project = new project_3.AngularProject(params);
            break;
        case "django":
            project = new project_4.DjangoProject(params);
            break;
        case "sandbox":
            project = new project_2.SandboxProject(params);
            break;
        default:
            project = new project_1.Project(params);
    }
    project.parent = load_closest_project(path.dirname(dir));
    return project;
    // dir = path.dirname( dir )
    // if ( dir != "/" ) {
    //     project.parent = load_closest_project( )
    // }
    // return project
    // let returnValue = project
    // while ( project.type != 'sandbox' && dir != "/" ) {
    //     dir = path.dirname( dir )
    //     filepath = path.join( dir, 'project.json' )
    //     if ( fs.existsSync(filepath) ) {
    //         // params = JSON.parse(<any>fs.readFileSync( filepath ))
    //         // params.path = dir
    //         // project.parent = new ProjectDescriptor( params )
    //         // project = project.parent
    //     }
    // }
    // if ( ! project.sandbox ) {
    //     throw Error("Cannot load a project outside of a sandbox.")
    // }
    // return returnValue
}
exports.load_project = load_project;
function load_closest_project(dir) {
    if (dir === undefined)
        dir = process.cwd();
    while (1) {
        if (fs.existsSync(path.join(dir, 'project.json'))) {
            return load_project(dir);
        }
        if (dir == "/") {
            return null;
        }
        else {
            dir = path.dirname(dir);
        }
    }
}
exports.load_closest_project = load_closest_project;
function load_author_file(filepath) {
    if (fs.existsSync(filepath)) {
        return new descriptors_1.AuthorDescriptor(JSON.parse(fs.readFileSync(filepath, 'utf-8')));
    }
    else {
        return new descriptors_1.AuthorDescriptor();
    }
}
exports.load_author_file = load_author_file;
