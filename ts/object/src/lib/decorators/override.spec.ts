import {} from "jasmine"

import { override } from '../decorators/override'
import { meta } from "../meta";
import { include } from "./include";
import { lazy } from "./lazy";


let o;
describe('override decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should have the property override in the meta data', () => {

        class SimpleTrait  { 

            overwritten: boolean

            @override @lazy(32)
            foo: number

        }

        let p: any = SimpleTrait.prototype
        expect(  p.Δmeta.property('foo').ʘoverride ).toBeTrue()

    })

    it('should have the method override in the meta data', () => {

        class SimpleTrait  { 

            @override
            foo() {}

        }

        let p: any = SimpleTrait.prototype
        expect(  p.Δmeta.method('foo').ʘoverride ).toBeTruthy()

    })

    it('should override the default value', () => {

        class SimpleTrait  { 

            overwritten: boolean

            @override @lazy(32)
            foo: number

        }

        class SimpleObject {

            @lazy(27)
            foo:number

        }

        meta(SimpleObject).include(SimpleTrait)

        o = new SimpleObject()

        
        expect( o.foo ).toBe(32)

    })


    it('should override the foo method', () => {

        class SimpleTrait  { 

            @override
            foo() {
                return true
            }
        }

        class SimpleObject {

            foo() {
                return false
            }
        }

        meta(SimpleObject).include(SimpleTrait)

        o = new SimpleObject()
        expect(  o.foo() ).toBeTrue()

    })

    it('should not override the foo method', () => {
        class SimpleTrait { 

            foo() { return true }
        }

        class SimpleObject {

            foo() { return false }

        }

        meta(SimpleObject).include(SimpleTrait)

        
        o = new SimpleObject()
        expect(o .foo() ).toBeFalse()
    })

    
    it('should use abstract default property for trait with inheritance', () => {

        class AbstractTrait {
            @lazy("abstract")
            foo: string
        }

        class ATrait extends AbstractTrait { 

        }

        class SimpleObject {

        }

        meta(SimpleObject).include(ATrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("abstract")

    })

    it('should use newly set default for trait with inheritance', () => {

        class AbstractTrait {
            @lazy("abstract")
            foo: string
        }

        class ATrait extends AbstractTrait { 
            @lazy("a")
            foo: string
        }

        class SimpleObject {

        }

        meta(SimpleObject).include(ATrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("a")

    })


    xit('should use first default from applied traits', () => {

        class AbstractTrait {
            @lazy("abstract")
            foo: string

            @lazy("abstract")
            bar: string
        }

        class ATrait extends AbstractTrait { 
            @lazy("a")
            foo: string
        }

        class BTrait extends AbstractTrait { 
            // @property("b")
            // foo: string
        }

        class SimpleObject {

        }


        meta(SimpleObject).include(ATrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("a")
        expect( o.bar ).toBe("abstract")

    })


    it('should use override default from applied traits', () => {

        class AbstractTrait {
            @lazy("abstract")
            foo: string
        }

        class ATrait extends AbstractTrait { 
            @lazy("a")
            foo: string
        }

        class BTrait extends AbstractTrait { 
            @override @lazy("b")
            foo: string
        }

        class SimpleObject {

        }


        let p:any = ATrait.prototype
        let q:any = 

        meta(SimpleObject).include(ATrait,BTrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("b")

    })

    it('should use override default from applied traits', () => {

        class AbstractTrait {
            @lazy("abstract")
            foo: string
        }

        class ATrait extends AbstractTrait { 
            @override @lazy("a")
            foo: string
        }

        class BTrait extends AbstractTrait { 
            @lazy("b")
            foo: string
        }

        class SimpleObject {

        }


        let p:any = ATrait.prototype
        let q:any = 

        meta(SimpleObject).include(ATrait,BTrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("a")

    })


    it('should handle abstract traits with inheritance', () => {

        class AbstractTrait {
            @override @lazy("ready")
            foo: string

            action() {
                this.foo = "hello"
                return "hello"
            }
        }

        class ATrait extends AbstractTrait { 
            action() {
                this.foo = "a"
                return "a"
            }
        }

        class BTrait extends AbstractTrait { 

            action() {
                this.foo = "b"
                return "b"
            }
        }
        class CTrait extends AbstractTrait { 

            action() {
                this.foo = "c"
                return "c"
            }
        }

        class SimpleObject {

        }

        meta(SimpleObject).include(ATrait,BTrait)

        o = new SimpleObject()
        expect( o.foo ).toBe("ready")

        o.action()
        expect( o.action() ).toBe("a")
    })

	it('removes the default method implementation', () => {
		class ATrait {

			@lazy(0)
			calls:number

			@override
			init() {
				this.calls++
			}

		}

		interface AClass extends ATrait { };
		@include( ATrait )
		class AClass {

		}

		const o = new AClass()
		o.init()
		expect( o.calls ).toBe(1)

		expect( meta(AClass).method('init').ʘdefault ).toBeUndefined()
	})

})