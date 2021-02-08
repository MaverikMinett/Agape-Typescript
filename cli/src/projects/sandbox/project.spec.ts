import {} from "jasmine"

import { SandboxProject } from './project'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('SandboxProject', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new SandboxProject()
        expect(p).toBeTruthy()
    })

    it('should create the project.json file', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )


        p = new SandboxProject()
        p.path = sourcePath

        // await p.create( 'ui', sourcePath )

        // expect( fs.existsSync(p.path) ).toBeTrue()
        // expect( fs.existsSync( path.join( p.path, 'angular.json' ) ) ).toBeTrue()
    })

})






// describe('AngularTypography', () => {
//     afterEach( () => {
//         d = undefined;
//     })

//     it('should instantiate', () => {
//         d = new AuthorDescriptor()
//     })
// })