
import { include } from '../src/lib/decorators/include'
import { build } from '../src/lib/decorators/build'
import { lazy } from '../src/lib/decorators/lazy'
import { meta } from '../src/lib/meta'

import { Buildable } from '../src/lib/traits/buildable'

import * as Benchmark from 'benchmark';


var suite = new Benchmark.Suite;

// {
//     class Basic {
//         foo: string = "42"
//     }
//     suite.add('basic', function() {
//         const a = new Basic()
//     })
// }

// {
//     class Basic {
//         foo: string = "42"
//         bar: string = "42"
//         baz: string = "42"
//     }
//     suite.add('basic with three properties', function() {
//         const a = new Basic()
//     })
// }




{
    @include(Buildable)
    class WithBuildable {
        foo: string
    }
    suite.add('buildable', function() {
        const a = new WithBuildable()
    })
    
}


{
    class ATrait {
        @build( o => "42" )
        foo: string
    }
    
    @include( Buildable, ATrait )
    class AClass { }
    suite.add("with Buildable, and trait with build property", function() {
        const a = new AClass()
    })
}

{
    class ATrait {
        @build( o => "42" )
        foo: string

        @build( o => "42" )
        bar: string
    }
    
    @include( Buildable, ATrait )
    class AClass { }
    suite.add("with Buildable, and trait with two build properties", function() {
        const a = new AClass()
    })
}

{
    class ATrait {
        @build( o => "42" )
        foo: string

        @build( o => "42" )
        bar: string

        @build( o => "42" )
        baz: string
    }
    
    @include( Buildable, ATrait )
    class AClass { }
    suite.add("with Buildable, and trait with three build properties", function() {
        const a = new AClass()
    })
}

{
    class ATrait {
        @build( o => "42" )
        foo: string

        @build( o => "42" )
        bar: string

        @build( o => "42" )
        baz: string

        @build( o => "42" )
        biz: string
    }
    
    @include( Buildable, ATrait )
    class AClass { }
    suite.add("with Buildable, and trait with fout build properties", function() {
        const a = new AClass()
    })
}


suite.on('cycle', function(event) {
    console.log( String(event.target) );
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  
  .run({ 'async': true });