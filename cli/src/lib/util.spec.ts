import {} from 'jasmine'


import { load_project, load_closest_project } from './util'
import { Project } from '../projects/project'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';





let p, q;

describe("util", () => {
    
    afterEach( () => {
        p = undefined
        q = undefined
    })

    it('should load a project from a directory', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new Project()
        p.path = sourcePath
        p.name = "Foo Bar"
        p.author = "Maverik Minett"
        p.email  = ""

        await p.writeProjectFile()

        q = load_project( sourcePath )
        expect( q ).toBeTruthy()
    })

    it('should load the closest project from parent directory', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        const subDir     = path.join( sourcePath, 'deeper' )
        fs.mkdirSync( subDir, { recursive: true } )

        p = new Project()
        p.path = sourcePath
        p.name = "Foo Bar"
        p.author = "Maverik Minett"
        p.email  = ""
        await p.writeProjectFile()

        q = load_closest_project( subDir )
        expect( q ).toBeTruthy()
    })

    it('should load a parent project', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), 'foobar' )
        const subDir     = path.join( sourcePath, 'deeper' )
        fs.mkdirSync( subDir, { recursive: true } )

        p = new Project()
        p.path = sourcePath
        p.name = "Foo Bar"
        p.author = "Maverik Minett"
        p.email  = ""
        await p.writeProjectFile()

        let p2 = new Project()
        p2.path = subDir
        p2.name = "Child Project"
        p2.author = "Maverik Minett"
        await p2.writeProjectFile()

        q = load_project( subDir )
        expect( q.parent ).toBeTruthy()
        expect( q.parent.parent ).toBeFalsy()
    })


})
