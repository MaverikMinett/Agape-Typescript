"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_author_file = exports.load_closest_project = exports.load_project = void 0;
const fs = require("fs");
const path = require("path");
const descriptors_1 = require("./descriptors");
/**
 * Load the project file in the given directory. Will also load
 * all 'parent' projects by looking for project files further up
 * the directory tree until a 'sandbox' project is found.
 * @param dir The project directory to load
 */
function load_project(dir = ".") {
    dir = path.resolve(dir);
    let filepath = path.join(dir, 'project.json');
    let params = JSON.parse(fs.readFileSync(filepath));
    params.path = dir;
    let project = new descriptors_1.ProjectDescriptor(params);
    let returnValue = project;
    while (project.type != 'sandbox' && dir != "/") {
        dir = path.dirname(dir);
        filepath = path.join(dir, 'project.json');
        if (fs.existsSync(filepath)) {
            params = JSON.parse(fs.readFileSync(filepath));
            params.path = dir;
            project.parent = new descriptors_1.ProjectDescriptor(params);
            project = project.parent;
        }
    }
    if (!project.sandbox) {
        throw Error("Cannot load a project outside of a sandbox.");
    }
    return returnValue;
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
