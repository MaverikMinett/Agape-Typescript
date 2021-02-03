"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("./scope");
var o;
describe('Scope', function () {
    afterEach(function () {
        o = undefined;
    });
    it('should instantiate', function () {
        o = new scope_1.Scope();
    });
    it('should load the project.json file in the current directory', function () {
        process.chdir('test-project');
        o = new scope_1.Scope();
        expect(o.project.name).toEqual('Test');
        process.chdir('..');
    });
});
