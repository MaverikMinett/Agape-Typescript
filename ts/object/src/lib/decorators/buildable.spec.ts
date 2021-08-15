import {} from "jasmine"

import { build } from './build'
import { readonly } from './readonly'
import { lazy } from './lazy'
import { Class } from "../types";
import { meta } from "../meta";
import { include } from "./include";



let o;
describe('buildable decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should return a class with an augmented constructor', () => {

        // // @buildable
        // class Buildable {
        //     Δdecorate( target:Class ) {
        //         class decorated extends target {
        //             constructor( ...args ) {
        //                 super(...args)
        //                 meta(this).build(this)
        //             }   
        //         }
        //         return decorated
        //     }
        // }

        // @include( Buildable )
        // class Home {

        //     constructor() {
        //         console.log("This is our home")
        //     }

        //     @build( o => 42 )
        //     answer: number
        // }

        

    })


    it('should build a property', () => {

        class SimpleObject { 
            @build 
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should build a property using a custom method name', () => {

        class SimpleObject { 
            @build('_build_bar')
            foo: string

            _build_bar() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })


    it('should work with read only', () => {

        class SimpleObject { 
            @readonly @build
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should work with lazy', () => {

        class SimpleObject { 
            @lazy @build
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })
})