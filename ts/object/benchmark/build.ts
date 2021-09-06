
console.log("Hello world!")

import { include } from '../src/lib/decorators/include'
import { build } from '../src/lib/decorators/build'
import { lazy } from '../src/lib/decorators/lazy'
import { meta } from '../src/lib/meta'

import { Buildable } from '../src/lib/traits/buildable'

import * as Benchmark from 'benchmark';


var suite = new Benchmark.Suite;

{
    class Basic {
        foo: string = "42"
    }
    suite.add('basic', function() {
        const a = new Basic()
    })
}

{
    class Basic {
        foo: string = "42"
        bar: string = "42"
        baz: string = "42"
    }
    suite.add('basic with three properties', function() {
        const a = new Basic()
    })
}

{
    class Basic {
        foo: string
        bar: string
        baz: string

        constructor() {
            this.foo = "42"
            this.bar = "42"
            this.baz = "42"
        }
    }
    suite.add('basic with three properties set in constructor', function() {
        const a = new Basic()
    })
}


    {
        class Basic {

        }

        meta(Basic).method('foo').default( function() { return } )
        const a:any = new Basic()

        suite.add('method with dispatcher', function() {
            a.foo()
        })
    }

    {
        class Basic {
            foo() {

            }
        }
        const a = new Basic()
        suite.add('method without dispatcher', function() {
            a.foo()
        })
    }



@include(Buildable)
class WithBuildable {
    foo: string
}
suite.add('buildable', function() {
    const a = new WithBuildable()
})


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



  

class ATrait {

}

@include( ATrait )
class AClass {
    foo:string = "42"
}
suite.add('with Trait', function() {
    const a = new AClass()
})


class BTrait {
    @lazy("42")
    foo:string
}

@include( BTrait )
class BClass {
    
}
suite.add('with trait with lazy property', function() {
    const a = new BClass()
})


{

    class AClass {
        @lazy("42")
        foo:string
    }
    const a = new AClass()
    suite.add('accessing property with lazy decorator', function() {
        a.foo
    })
    
}

{

    class AClass {
        foo:string = "42"
    }
    const a:any = new AClass()
    suite.add('accessing property without lazy decorator', function() {
        a.foo
    })
    
}







suite.on('cycle', function(event) {
  console.log( String(event.target) );
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})

.run({ 'async': true });