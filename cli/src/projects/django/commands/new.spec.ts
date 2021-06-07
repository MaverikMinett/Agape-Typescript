import {} from "jasmine"

import { NewDjangoProjectCommand } from './new'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('NewDjangoProjectCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new NewDjangoProjectCommand()
        expect(p).toBeTruthy()
    })


})


