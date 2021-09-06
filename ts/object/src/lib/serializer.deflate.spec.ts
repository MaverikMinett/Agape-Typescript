
import {} from 'jasmine'

import { deflate } from './serializer'
import { meta } from './meta'

import { lazy } from './decorators/lazy'
import { delegate } from './decorators/delegate'
import { inherit } from './decorators/inherit'
import { nonenumerable } from './decorators/nonenumerable'

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
        meta(SimpleObject).property('bar').default('baz').lazy()

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
        class AClass {
            @nonenumerable
            foo:string = "bar"
        }

        o = new AClass()
        let d = deflate(o)
        expect( d.foo ).toBeUndefined()
    })

    it('should not deflate unpopulated lazy properties', () => {
        class AClass {
            @lazy("bar")
            foo:string
        }

        o = new AClass()
        let d = deflate(o)
        expect( d.foo ).toBeUndefined()

        o = new AClass()
        o.foo

        d = deflate(o)
        expect( d.foo ).toEqual("bar")

    })

    it('should not deflate inheritied properties', () => {

        class AClass {
            foo:string = "bar"
        }

        class BClass {

            a: AClass = new AClass()

            @inherit( o => o.a )
            foo:string
        }

        o = new BClass()
        expect( o.foo ).toBe( o.a.foo )

        let d = deflate(o)
        expect( d.foo ).toBeUndefined()

    })

    it('should deflate populated inheritied values', () => {

        class AClass {
            foo:string = "bar"
        }

        class BClass {

            a: AClass = new AClass()

            @inherit( o => o.a )
            foo:string
        }

        o = new BClass()
        o.foo = "biz"

        let d = deflate(o)
        expect( d.foo ).toBe("biz")

    })


    it('should not deflate delegated properties', () => {

        class AObject { foo:number = 32 }

        class BObject { 
            @lazy( o => new AObject() )
            bar: AObject

            @delegate( o => o.bar ) foo:number
        }

        o = new BObject()
        o.foo
        d = deflate(o)

        expect(d).toEqual({'bar':{'foo':32}})

    })


    it('should not include methods', () => {
        class SimpleObject {
            foo: string = "bar"

            baz():string {
                return "biz"
            }
        }

        o = new SimpleObject()

        d = deflate( o )

        expect(d).toEqual({'foo': 'bar'})
    })

})