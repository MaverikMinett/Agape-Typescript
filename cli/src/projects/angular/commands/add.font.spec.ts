import {} from "jasmine"

import { AngularProject } from '../project'
import { AddFontToAngularProjectCommand } from './add.font'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, c;
describe('AddFontToAngularProjectCommand', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new AngularProject()
        c = new AddFontToAngularProjectCommand( p )
        expect(c).toBeTruthy()
    })

    it('should install the font', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), "foobar" )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.name = "Foobar"
        p.slug = "foo-bar"
        p.path = sourcePath
        p.writeProjectFile()

        // create files necessary for test
        fs.mkdirSync( sourcePath + "/src/styles", { recursive: true } )
        fs.writeFileSync( sourcePath + "/src/styles.scss", "// add your styles here\n" )

        fs.writeFileSync( sourcePath + "/package.json", JSON.stringify({
            "name": "foobar",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": { },
            "author": "",
            "license": "MIT"
          }) )

        c = new AddFontToAngularProjectCommand( p )
        await c.installFont('material-icons')

        expect( fs.existsSync( path.join(sourcePath, '/node_modules/@fontsource/material-icons') ) ).toBeTrue()
    })


    it('should add the font to _typography.scss', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), "foobar" )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.name = "Foobar"
        p.slug = "foo-bar"
        p.path = sourcePath
        p.writeProjectFile()

        // create files necessary for test
        fs.mkdirSync( sourcePath + "/src/styles", { recursive: true } )
        fs.writeFileSync( sourcePath + "/src/styles.scss", "// add your styles here\n" )

        fs.writeFileSync( sourcePath + "/package.json", JSON.stringify({
            "name": "foobar",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": { },
            "author": "",
            "license": "MIT"
          }) )

        c = new AddFontToAngularProjectCommand( p )
        await c.addFontStyles('material-icons')

        expect( fs.existsSync( path.join(sourcePath, 'src/styles/_typography.scss') ) ).toBeTrue()

        const typographyContents = fs.readFileSync( path.join(sourcePath, 'src/styles/_typography.scss'), 'utf-8' )
        const regex = new RegExp('@import "@fontsource/material-icons";', 'g')
        expect( typographyContents.match(regex) ).toBeTruthy()


    })

    



    it('should run the command', () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4(), "foobar" )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.name = "Foobar"
        p.slug = "foo-bar"
        p.path = sourcePath
        p.writeProjectFile()

        // create files necessary for test
        fs.mkdirSync( sourcePath + "/src/styles", { recursive: true } )
        fs.writeFileSync( sourcePath + "/src/styles.scss", "// add your styles here\n" )

        fs.writeFileSync( sourcePath + "/package.json", JSON.stringify({
            "name": "foobar",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": { },
            "author": "",
            "license": "MIT"
          }) )

        c = new AddFontToAngularProjectCommand( p )
        c.run(["Material Icons"])
    })


})


