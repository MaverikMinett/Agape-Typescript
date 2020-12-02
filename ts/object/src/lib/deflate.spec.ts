
import {} from 'jasmine'

import { deflate } from './deflate'
import { meta } from './meta'

import { lazy } from './decorators/lazy'
import { delegate } from './decorators/delegate'

let o:any, d:any
describe('deflate', () => {
    

    beforeEach( () => {
        o = undefined
        d = undefined
    })

    it('should deflate an object', () => {
        class SimpleObject{ foo: number = 43200 }
        o = new SimpleObject()
        d = deflate( o )
        expect( d.foo ).toEqual(43200)
    })

    it('should deflate nested objects', () => {

        class AObject {
            foo: number = 43200
        }

        class BObject {
            bar: AObject
            constructor() {
                this.bar = new AObject()
            }
        }

        o = new BObject()
        d = deflate( o )
        expect( d.bar.foo).toEqual(43200)
    })

    it('should deflate agape managed properties without the special character', () => {
        class SimpleObject{  }
        meta(SimpleObject).property('bar').default('baz')

        o = new SimpleObject()
        expect( o.bar ).toEqual('baz')
        
        d = deflate( o )
        expect(d).toEqual({'bar':'baz'})
    })

    it('should deflate properties inheritied from base classes', () => {
        class AObject{ foo = 32 }

        class BObject extends AObject{ bar = 42 }

        o = new BObject()

        d = deflate( o )
        expect(d).toEqual({'foo': 32, 'bar': 42})
    })

    it('should not deflate nonenumerable properties', () => {


    })

    it('should not deflate unpopulated lazy properties', () => {


    })

    it('should not deflate inheritied properties', () => {


    })

    it('should not deflate delegated properties', () => {

        class AObject { foo:number = 32 }

        class BObject { 
            @lazy( o => new AObject() )
            bar: AObject

            @delegate( o => o.bar ) foo:number
        }

        o = new BObject()
        d = deflate(o)

        expect(d).toEqual({'bar':{'foo':32}})

    })

})