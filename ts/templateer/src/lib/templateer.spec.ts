// <reference types="node"/>

import {} from "jasmine"
import { Templateer } from './templateer'

import * as fs from 'fs'
import * as fse from 'fs-extra'
import { doesNotMatch } from "assert";

let o;
describe('Templateer', () => {

    beforeEach( () => {
        fs.mkdirSync('test/output')
    })

    afterEach( () => {
        fse.removeSync('test/output')
    })

    it('should instantiate', () => {
        o = new Templateer()
    })

    it('should instantiate with a source directory', () => {
        o = new Templateer('test/templates')
    })

    it('should find a template in the source directory (sync)', () => {
        o = new Templateer('test/templates')
        expect( o.findSync('foo.md') ).toEqual('test/templates/foo.md')
    })

    it('should find a template in the source directory (async)', async () => {
        o = new Templateer('test/templates')
        expect( await o.find('foo.md') ).toEqual('test/templates/foo.md')
    })

    it('should NOT find a template in the source directory (sync)', () => {
        o = new Templateer('test/templates')
        expect( o.findSync('bar.md') ).toEqual(undefined)
    })

    it('should NOT find a template in the source directory (async)', async (done) => {
        o = new Templateer('test/templates')
        try {
            await o.find('bar.md')
            done.fail()
        }
        catch {
            done()
        }
    })

    it('should add a source methodically', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.sources ).toEqual( ['test/templates','test/overrides'] )
    })
    
    it('should find templates in the correct source folder (sync)', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.findSync('foo.md') ).toEqual('test/templates/foo.md')
        expect( o.findSync('bar.md') ).toEqual('test/overrides/bar.md')
    })

    it('should find templates in the correct source folder (async)', async () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( await o.find('foo.md') ).toEqual('test/templates/foo.md')
        expect( await o.findSync('bar.md') ).toEqual('test/overrides/bar.md')
    })


    it('should use the template in the override folder (sync)', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.findSync('baz.md') ).toEqual('test/overrides/baz.md')
    })

    it('should use the template in the override folder (async)', async () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( await o.find('baz.md') ).toEqual('test/overrides/baz.md')
    })

    it('should render a template to a file (sync)', () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        o.renderFileSync( 'foo.md', 'test/output/foo.md', data )

        expect( fs.existsSync('test/output/foo.md') ).toBeTrue()
    })

    it('should render a template to a file (async)', async () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        await o.renderFile( 'foo.md', 'test/output/foo.md', data )

        expect( fs.existsSync('test/output/foo.md') ).toBeTrue()
    })

    it("should throw an error if the template file doesn't exist (sync)", () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        

        expect( () => { o.renderFileSync( 'boo.md', 'test/output/boo.md', data ) } ).toThrowError()
    })

    it("should throw an error if the template file doesn't exist (async)", async ( done ) => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }

        try {
            await o.renderFileSync( 'boo.md', 'test/output/boo.md', data )
            done.fail()
        }
        catch {
            done()
        }
        
    })

    it("should replace the template variables (sync)", () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        
        o.renderFileSync( 'foo.md', 'test/output/foo.md', data )
        let filedata = fs.readFileSync('test/output/foo.md')       
        expect( `${filedata}` ).toEqual("# Foo\n\nbar\n\n")
    })

    it("should replace the template variables (async)", async() => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        
        await o.renderFile( 'foo.md', 'test/output/foo.md', data )
        let filedata = fs.readFileSync('test/output/foo.md')       
        expect( `${filedata}` ).toEqual("# Foo\n\nbar\n\n")
    })


    it("should gather all templates in directory across all sources (sync)", () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        
        let templates = o.gatherSync('grouped')
        expect( templates ).toEqual({ 'b.md': 'test/templates/grouped/b.md',
                                      'c.md': 'test/overrides/grouped/c.md',
                                      'a.md': 'test/overrides/grouped/a.md' })                                            
    })


    it("should gather all templates in directory across all sources (async)", async () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        
        let templates = await o.gather('grouped')
        expect( templates ).toEqual({ 'b.md': 'test/templates/grouped/b.md',
                                      'c.md': 'test/overrides/grouped/c.md',
                                      'a.md': 'test/overrides/grouped/a.md' })                                            
    })




    it("should render an entire directory", async () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }

        o.renderPathSync( '.', 'test/output', data )
        expect( fs.existsSync('test/output/foo.md') ).toBeTrue()
    })

    it("should allow configuration of the default sources", async() => {
        
        Templateer.prototype.sources = [ 'appdata/dir' ]
        o = new Templateer()

        expect( o.sources ).toEqual( ['appdata/dir' ] )
        Templateer.prototype.sources = [ ]

    })



})