import {} from "jasmine"

import { AngularProject } from './project'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'


import { v4 as uuidv4 } from 'uuid';

let p, t;
describe('AngularProject', () => {
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new AngularProject()
        expect(p).toBeTruthy()
    })

    it('should create a new project', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.name = "FooBar"
        p.slug = 'ui'
        await p.create(  sourcePath )

        expect( fs.existsSync(p.path) ).toBeTrue()
        expect( fs.existsSync( path.join( p.path, 'angular.json' ) ) ).toBeTrue()
    })

    xit('should not create a project if it is an existing project', async () => {
        // const sourcePath = path.join( os.tmpdir(), uuidv4() )
        // fs.mkdirSync( sourcePath, { recursive: true } )

        // p = new AngularProject()
        // await p.create( 'ui', sourcePath )

        // expect( fs.existsSync(p.path) ).toBeTrue()
        // expect( fs.existsSync( path.join( p.path, 'angular.json' ) ) ).toBeTrue()
    })

    xit('should throw an error if ng command fails', async () => {
        // const sourcePath = path.join( os.tmpdir(), uuidv4() )
        // fs.mkdirSync( sourcePath, { recursive: true } )

        // p = new AngularProject()
        // await p.create( 'ui', sourcePath )

        // expect( fs.existsSync(p.path) ).toBeTrue()
        // expect( fs.existsSync( path.join( p.path, 'angular.json' ) ) ).toBeTrue()
    })

    it('should read the angular file', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.slug = "ui"
        p.name = "foobar"
        await p.create( sourcePath )

        let ng = p.readAngularFile()
        expect( ng ).toBeTruthy()
    })

    it('should read the package file', async () => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.slug = "ui"
        p.name = "foobar"
        await p.create( sourcePath )

        let ng = p.readPackageFile()
        expect( ng ).toBeTruthy()
    })


    it('should add material to the project', async() => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.slug = "ui"
        p.name = "foobar"
        await p.create( sourcePath )
        await p.installMaterial()

        expect( fs.existsSync(p.path) ).toBeTrue()
        expect( fs.existsSync(path.join( p.path, 'node_modules/@angular/material') ) )
        expect( fs.existsSync(path.join( p.path, 'node_modules/@angular/cdk') ) )
    });

    xit('should trap errors from spawnSync', async() => {
        // const sourcePath = path.join( os.tmpdir(), uuidv4() )
        // fs.mkdirSync( sourcePath, { recursive: true } )

        // p = new AngularProject()
        // await p.create( 'ui', sourcePath )
        // await p.installMaterial()

        // expect( fs.existsSync(p.path) ).toBeTrue()
        // expect( fs.existsSync(path.join( p.path, 'node_modules/@angular/material') ) )
        // expect( fs.existsSync(path.join( p.path, 'node_modules/@angular/cdk') ) )
    });



    it('should add moment to the project', async() => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.slug = "ui"
        p.name = "foobar"
        await p.create( sourcePath )
        await p.installMoment()

        expect( fs.existsSync(p.path) ).toBeTrue()
        expect( fs.existsSync(path.join( p.path, 'node_modules/moment') ) )
    });


    it('should add the material/moment adapter', async() => {
        const sourcePath = path.join( os.tmpdir(), uuidv4() )
        fs.mkdirSync( sourcePath, { recursive: true } )

        p = new AngularProject()
        p.slug = "ui"
        p.name = "foobar"
        await p.create( sourcePath )
        await p.installMaterial()
        await p.installMoment()
        await p.installMaterialMomentAdapter()

        expect( fs.existsSync(p.path) ).toBeTrue()
        expect( fs.existsSync(path.join( p.path, 'node_modules/moment') ) )
    });

})






// describe('AngularTypography', () => {
//     afterEach( () => {
//         d = undefined;
//     })

//     it('should instantiate', () => {
//         d = new AuthorDescriptor()
//     })
// })