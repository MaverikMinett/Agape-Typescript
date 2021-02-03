"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var descriptors_1 = require("./descriptors");
var d;
describe('ProjectDescriptor', function () {
    afterEach(function () {
        d = undefined;
    });
    it('should instantiate', function () {
        d = new descriptors_1.ProjectDescriptor();
    });
});
describe('AuthorDescriptor', function () {
    afterEach(function () {
        d = undefined;
    });
    it('should instantiate', function () {
        d = new descriptors_1.AuthorDescriptor();
    });
});
