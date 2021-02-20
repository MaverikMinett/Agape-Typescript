import {} from 'jasmine'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

import { AddCommand } from './add'
import { AngularProject } from '../projects/angular/project' 
import { AddToAngularProjectCommand } from '../projects/angular/commands/add'
import { chdir } from 'process';

let cwd = process.cwd()

let c,p,h;
describe("AddCommand", () => {


    beforeEach( () => {

        c = undefined
        p = undefined

        chdir( cwd )
    })
    

    it('Should instantiate', () => {
        c = new AddCommand()
        expect(c).toBeTruthy()
    })  

    it ('Should return a handler for an Angular Project', () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.name = "FooBar"
        p.slug = 'ui'
        p.path = sourcePath
        p.writeProjectFile()

        // chdir( sourcePath )

        c = new AddCommand()
        let h = c.getHandler( p )

        expect( h instanceof AddToAngularProjectCommand ).toBeTrue()
    })

})