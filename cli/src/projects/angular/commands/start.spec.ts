import {} from "jasmine"

import { AngularProject } from '../project'
import { StartAngularProjectCommand } from './start'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, c;
describe('StartAngularProjectCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new AngularProject()
        c = new StartAngularProjectCommand( p )
        expect(c).toBeTruthy()
    })



})


