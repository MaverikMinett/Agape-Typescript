import {} from "jasmine"

import { Project } from './project'


import { Templateer } from '@agape/templateer'
Templateer.prototype.sources = [ `${__dirname}/../templates` ]

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('Project', () => {

    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new Project()
        expect(p).toBeTruthy()
    })


    it('should create the project.json file', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new Project()
        p.path = sourcePath
        p.name = "Foo Bar"
        p.author = "Maverik Minett"
        p.email  = ""

        await p.writeProjectFile()

        expect( fs.existsSync( path.join(p.path, "project.json") ) ).toBeTrue()
    })

    it('should create the README.md file', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new Project()
        p.path    = sourcePath
        p.name    = "Foo Bar"
        p.author  = "Maverik Minett"
        p.email   = ""
        p.license = "MIT"

        await p.writeReadmeFile()

        expect( fs.existsSync( path.join(p.path, "README.md") ) ).toBeTrue()
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