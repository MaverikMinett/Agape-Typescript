"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = require("./scope");
let o;
describe('Scope', () => {
    afterEach(() => {
        o = undefined;
    });
    it('should instantiate', () => {
        o = new scope_1.Scope();
    });
    it('should load the project.json file in the current directory', () => {
        process.chdir('test-project');
        o = new scope_1.Scope();
        expect(o.project.name).toEqual('Test');
        process.chdir('..');
    });
});
