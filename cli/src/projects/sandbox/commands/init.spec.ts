import {} from "jasmine"

import { InitSandboxCommand } from './init'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('InitSandboxCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new InitSandboxCommand()
        expect(p).toBeTruthy()
    })

    // it('should initialize a new sandbox', async() => {
    //     const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
    //     fs.mkdirSync( sourcePath, { recursive: true } )

    //     p = new SandboxProject()
    //     p.name = "Foo Bar"
    //     p.slug = "foo-bar"
    //     p.path = sourcePath

    //     await p.init(  )
    //     expect( fs.existsSync( path.join(sourcePath, "project.json") ) ).toBeTrue()
    //     expect( fs.existsSync( path.join(sourcePath, "README.md") ) ).toBeTrue()

    // })


})


