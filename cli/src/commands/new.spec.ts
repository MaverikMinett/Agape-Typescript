import {} from 'jasmine'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

import { NewCommand } from './new'
import { AngularProject } from '../projects/angular/project' 

import { NewAngularProjectCommand } from '../projects/angular/commands/new'
// import { NewDjangoProjectCommand } from '../project/django/commands/new'

import { chdir } from 'process';

let cwd = process.cwd()

let c,p,h;
describe("NewCommand", () => {


    beforeEach( () => {

        c = undefined
        p = undefined

        chdir( cwd )
    })
    

    it('Should instantiate', () => {
        c = new NewAngularProjectCommand()
        expect(c).toBeTruthy()
    })  

    it ('Should return a handler for a new Angular Project', () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )

        c = new NewCommand()
        let h = c.getHandler( 'angular' )

        expect( h instanceof NewAngularProjectCommand ).toBeTrue()
    })



})