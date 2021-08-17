import {} from "jasmine"

import { meta } from '../meta'

import { after } from './after'


let o;
fdescribe('after decorator', () => {

    afterEach( () => {
        o = undefined;
    })


    it('should have the declaration in the meta data', () => {

        class SimpleTrait  { 
            @after foo() { }

        }

        let p: any = SimpleTrait.prototype

        expect(  p.Δmeta.methods.has('foo') ).toBeTrue()
        expect(  p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()

    })


    it('should add the after method modifier to the class meta data', () => {

        class SimpleTrait  { 

            @after foo() { }

        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject  {

        }

        meta(SimpleObject).include(SimpleTrait)

        let p: any = SimpleTrait.prototype
        let q: any = SimpleObject.prototype

        expect( p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
        expect( q.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()

    })


    it('should call the after modifier', () => {
        class SimpleTrait  { 

            bar: boolean
            after: boolean

            @after
            foo() {
                this.after = true
            }
        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject {

            bar: boolean

            foo() {
                this.bar = true
            }

         }

         meta(SimpleObject).include(SimpleTrait)

         let p: any = SimpleTrait.prototype
         let q: any = SimpleObject.prototype

         expect( p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
         expect( q.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
        //  expect(meta(SimpleObject).methods.has('foo')).toBeTrue()
        //  expect(meta(SimpleObject).methods.has('foo')['ʘafter']).toBeTruthy()
        
        o = new SimpleObject()
        o.foo()
        expect( o.bar ).toBeTrue()
        expect( o.after ).toBeTrue()
    })

    it('should run multiple before modifiers', () => {
        class ATrait { 

            count: number

            @after
            foo() {
                this.count || ( this.count = 0 )
                this.count += 1
            }
        }

        class BTrait { 

            count: number

            @after
            foo() {
                this.count || ( this.count = 0 )
                this.count += 1
            }
        }


        interface SimpleObject extends ATrait, BTrait {};

        class SimpleObject  {


            foo() {}

         }

         meta(SimpleObject).include(ATrait,BTrait)

        
        o = new SimpleObject()
        o.foo()
        expect( o.count ).toEqual(2)
    })

})