import { coerce } from "./decorators/coerce"
import { ObjectDescriptor } from "./descriptors"
import { inflate } from "./inflate"
import { Dictionary } from "./types"

describe('inflate', () => {

    let o, m

    beforeEach( () => {
        o = undefined
        m = undefined
    })

    it('should inflate a simple object', () => {

        class SimpleObject { 

            foo: string

            bar: number

            baz: Array<string>

            biz: Dictionary

        }

        const data = { 
            foo: 'string value',
            bar: 1,
            baz: ['a','b','c','d'],
            biz: { a:1 , b:2 }
        }

        const o = inflate<SimpleObject>( SimpleObject, data )

        expect(o).toBeInstanceOf(SimpleObject)
        expect(o.foo).toEqual(data.foo)
        expect(o.bar).toEqual(data.bar)
        expect(o.baz).toEqual(data.baz)
        expect(o.biz).toEqual(data.biz)

    })



    it('should inflate a nested object', () => {

        class Foo { 
            baz:string
        }

        class Bar { 
            foo:Foo
        }

        let p: any = Bar.prototype

        if ( ! p.Δmeta ) p.Δmeta = new ObjectDescriptor(p)

        p.Δmeta.property('foo').coerce(Foo)

        const data = { foo: { baz: 'string value' } }

        o = inflate( Bar, data )

        expect( o.foo ).toBeTruthy()
        expect( o.foo.baz ).toEqual('string value')
    })

    it('should inflate an array of objects', () => {
        class SimpleObject { 

            foo: string

            bar: number

            baz: Array<string>

            biz: Dictionary

        }

        const data = [
            { 
                foo: 'string value',
                bar: 1,
                baz: ['a','b','c','d'],
                biz: { a:1 , b:2 }
            },
            {
                foo: 'string value 2',
                bar: 2,
                baz: ['e','f','g','h'],
                biz: { c:3 , d:4 }
            }
        ] 
        

        const a = inflate<SimpleObject[]>( [SimpleObject], data )

        expect(a.length).toEqual(2)

        for ( let i = 0; i < data.length; i++ ) {
            expect(a[1]).toBeInstanceOf(SimpleObject)
            expect(a[1].foo).toEqual(data[1].foo)
            expect(a[1].bar).toEqual(data[1].bar)
            expect(a[1].baz).toEqual(data[1].baz)
            expect(a[1].biz).toEqual(data[1].biz)
        }
    })

    it('should work with the coerce decorator', () => {
        class Foo { 
            baz:string
        }

        class Bar { 
            @coerce( Foo )
            foo:Foo
        }

        const data = { foo: { baz: 'string value' } }

        o = inflate( Bar, data )

        expect( o.foo ).toBeTruthy()
        expect( o.foo.baz ).toEqual('string value')
    })


})