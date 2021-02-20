import {} from "jasmine"

import { DjangoProject } from '../project'
import { StartDjangoProjectCommand } from './start'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, c;
describe('StartDjangoProjectCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new DjangoProject()
        c = new StartDjangoProjectCommand( p )
        expect(c).toBeTruthy()
    })

})


