import {} from "jasmine"

import { build } from './build'
import { readonly } from './readonly'
import { lazy } from './lazy'
import { include } from "./include";
import { Buildable } from "../traits/buildable";
import { $, meta } from "../meta";
import { PropertyDescriptor } from "../descriptors";
import { override } from "./override";
import { stack } from "./stack";



let o;
describe('build decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should build a property', () => {

        @include( Buildable )
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

        @include( Buildable )
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

        @include( Buildable )
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

        @include( Buildable )
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



    describe('building', () => {
        it('should add the property to the buildProperties', () => {
            @include( Buildable )
            class SimpleObject { 
                @build
                foo: string
    
                _build_foo() {
                    return 'baz'
                }
            }
    
            o = new SimpleObject()
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect( meta(SimpleObject).buildProperties[0].name ).toBe('foo')
        })


        it('should @build with an anonymous builder function', () => {
            @include( Buildable )
            class SimpleObject { 
                @build( o => "baz" )
                foo: string
            }
    
            spyOn( meta(SimpleObject), 'performBuild' ).and.callThrough()
            o = new SimpleObject()
            
            expect( meta(SimpleObject).performBuild ).toHaveBeenCalled()
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect(o.foo).toEqual('baz')
        })

        it('should @build with a method name', () => {
            @include( Buildable )
            class SimpleObject { 
                @build( "foo_builder" )
                foo: string

                foo_builder() {
                    return "bar"
                }
            }
    
            spyOn( meta(SimpleObject).target, 'foo_builder' ).and.callThrough()
            o = new SimpleObject()
            
            expect( meta(SimpleObject).target.foo_builder ).toHaveBeenCalled()
            expect(o.foo).toEqual('bar')
        })

        it('should @build trait properties', () => {

            class ATrait {
                @build
                foo: string

                _build_foo() {
                    return "bar"
                }
            }

            @include( Buildable )
            @include( ATrait )
            class SimpleObject {  }
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect( meta(SimpleObject).buildProperties[0] ).toBeInstanceOf(PropertyDescriptor)
            o = new SimpleObject()
            expect(o.foo).toEqual('bar')
        })

        it('should add the method to the buildMethods', () => {
            @include(Buildable)
            class AClass {
                @build foo() {

                }
            }

            expect( meta(AClass).buildMethods.includes('foo') ).toBeTrue()
        })

        it('should call the build method', () => {
            @include(Buildable)
            class AClass {

                called: boolean = true

                @build foo() {
                    this.called = true
                }
                
            }

            const o = new AClass()
            expect( o.called ).toBeTrue()
        })


        // TESTS HERE
        it('should call both build methods', () => {

            class ATrait {
                at: number

                @build foo() {
                    this.at = this.at ?? 0
                    this.at++
                }

            }

            interface AClass extends ATrait { }
            @include( Buildable, ATrait )
            class AClass {
                bt:number

                @build bar() {
                    this.bt = this.bt ?? 0
                    this.bt++
                }
            }

            const o = new AClass()
            expect(o.at).toBe(1)
            expect(o.bt).toBe(1)
        })

        it('should call the build method in the class', () => {
            class ATrait {
                at: number

                @build foo() {
                    this.at = this.at ?? 0
                    this.at++
                }

            }

            interface AClass extends ATrait { }
            @include( Buildable, ATrait )
            class AClass {
                bt:number

                @build foo() {
                    this.bt = this.bt ?? 0
                    this.bt++
                }
            }

            const o = new AClass()
            expect(o.at).toBe(undefined)
            expect(o.bt).toBe(1)
        })

        fit('should call the build method in the trait via @override', () => {

            class ATrait {
                at: number

                @override foo() {
                    this.at = this.at ?? 0
                    this.at++
                }

            }

            interface AClass extends ATrait { }
            @include( Buildable, ATrait )
            class AClass {
                ac:number

                @build foo() {
                    this.ac = this.ac ?? 0
                    this.ac++
                }
            }

            // console.log( meta(AClass).method('foo') )

            const o = new AClass()
            
            spyOn( $(o).method('foo'), 'call' )
            o.foo()
            // expect(o.at).toBe(1)
            expect( $(o).method('foo').call ).toHaveBeenCalled()
            // expect(o.ac).toBe(undefined)
        })

        it('should call the both build methods via @stack', () => {

            class ATrait {
                called: number

                @stack @build foo() {

                }

            }

            class AClass {
                @build foo() {

                }
            }
        })
        it('should call the both build methods via @stack without @build in the trait', () => {

            class ATrait {
                called: number

                @stack foo() {

                }

            }

            class AClass {
                @build foo() {

                }
            }
        })


        it('should call the both build methods via @stack and @build in the trait', () => {

            class ATrait {
                called: number

                @build @stack foo() {

                }

            }

            class AClass {
                foo() {

                }
            }
        })

        it('should provide the default method from the trait', () => {
            class ATrait {
                called: number

                @build foo() {
                    // called first
                }

            }

            class AClass {
                foo() {
                    // called second
                }
            }
        })

        it('should call the build method one time', () => {
            class ATrait {
                called: number

                @build foo() {
                    // called first
                }

            }

            class AClass {
                @build foo() {
                    // called second
                }
            }
        })

        it('should call the build method one time', () => {
            class ATrait {
                called: number

                @build foo() {
                    // called first
                }

            }

            class AClass {
                @build foo() {
                    // called second
                }
            }
        })

    })

})