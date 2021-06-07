import {} from "jasmine"

import { NewAngularProjectCommand } from './new'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('NewAngularProjectCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new NewAngularProjectCommand()
        expect(p).toBeTruthy()
    })


})


