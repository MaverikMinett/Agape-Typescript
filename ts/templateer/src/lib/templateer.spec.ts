// <reference types="node"/>

import {} from "jasmine"
import { Templateer } from './templateer'

import * as fs from 'fs'
import * as fse from 'fs-extra'

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

    it('should find a template in the source directory', () => {
        o = new Templateer('test/templates')
        expect( o.find('foo.md') ).toEqual('test/templates/foo.md')
    })

    it('should NOT find a template in the source directory', () => {
        o = new Templateer('test/templates')
        expect( o.find('bar.md') ).toEqual(undefined)
    })

    it('should add a source methodically', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.sources ).toEqual( ['test/templates','test/overrides'] )
    })
    
    it('should find templates in the correct source folder', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.find('foo.md') ).toEqual('test/templates/foo.md')
        expect( o.find('bar.md') ).toEqual('test/overrides/bar.md')
    })

    it('should use the template in the override folder', () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        expect( o.find('baz.md') ).toEqual('test/overrides/baz.md')
    })

    it('should render a template to a file', () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        o.renderFile( 'foo.md', 'test/output/foo.md', data )

        expect( fs.existsSync('test/output/foo.md') ).toBeTrue()
    })

    it("should throw an error if the file doesn't exist", () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        

        expect( () => { o.renderFile( 'boo.md', 'test/output/boo.md', data ) } ).toThrowError()
    })

    it("should replace the template variables", () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }
        
        o.renderFile( 'foo.md', 'test/output/foo.md', data )
        let filedata = fs.readFileSync('test/output/foo.md')       
        expect( `${filedata}` ).toEqual("# Foo\n\nbar\n\n")
    })


    it("should gather all templates in directory across all sources", async () => {
        o = new Templateer('test/templates')
        o.addSource('test/overrides')
        
        let templates = o.gather('grouped')
        expect( templates ).toEqual({ 'b.md': 'test/templates/grouped/b.md',
                                      'c.md': 'test/overrides/grouped/c.md',
                                      'a.md': 'test/overrides/grouped/a.md' })


        o = new Templateer('test/templates')
        o.addSource('test/overrides')
                                                                
    })


    it("should render an entire directory", async () => {
        o = new Templateer('test/templates')
        let data = { 'name': 'Foo', 'description': 'bar' }

        o.renderPath( '.', 'test/output', data )
        expect( fs.existsSync('test/output/foo.md') ).toBeTrue()
    })



})