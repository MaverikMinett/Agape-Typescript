"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const descriptors_1 = require("./descriptors");
let d;
describe('AuthorDescriptor', () => {
    afterEach(() => {
        d = undefined;
    });
    it('should instantiate', () => {
        d = new descriptors_1.AuthorDescriptor();
    });
});
