import {} from "jasmine"

import { coerce } from './coerce'
import { readonly } from './readonly'
import { lazy } from './lazy'



let o;
describe('coerce decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should set the coerce value on a property descriptor to a class', () => {

        class Foo {

        }

        class Bar {
            @coerce( Foo )
            foo: Foo
        }

        const m = (<any>Bar.prototype).Δmeta
        expect( m.property('foo').ʘcoerce ).toEqual(Foo)
    })

    it('should set the coerce value on a property descriptor to an array', () => {
        class Foo {

        }

        class Bar {
            @coerce( [Foo] )
            foos: Foo
        }

        const m = (<any>Bar.prototype).Δmeta
        expect( m.property('foos').ʘcoerce ).toEqual([Foo])
    })

})