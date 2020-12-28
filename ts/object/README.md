# @agape/object

Extensible objects

## Synopsis

```
import { include, stack } from '@agape/object'

class MyTrait {

    @stack
    foo() {
        console.log('Called second')
    }

}

@include( MyTrait )
class MyObject {

    foo() {
        console.log('Called first')
    }

}

let o = new MyObject()

o.foo()
```


## Description

A collection of decorators and meta descriptors for composing extensible 
javascript objects.


## Traits

Traits are abstract classes which define or modify properties and methods
on a consuming class. Traits can be used as an alternative to or in combination
with classical inheritance to create clean, reusable, and extensible code. Traits 
are applied to classes using the `@include` decorator.


## Class Decorators

- @<!-- -->include( ...traits )

Add the `...traits` to the class.

All method definitions in each trait will be copied into the consumer
unless already defined. All method modifiers will be copied into the 
consumer. All property modifiers will be copied into the consumer. 

Existing property and method definitions in the consumer will not be
over-written with those defined in a trait unless declared in conjuction
with `override` decorator.

```
@include( MyTrait )
class MyClass {
    ...
```


## Method Modifiers

Method modifiers are decorators which affect the behavior of the method. Most
method modifiers allow you to call aditional methods before or after the
primary method call. When a trait is applied to a class, all the method 
modifiers are copied from the trait into the consumer. This allows traits
to modify the behavior of consumers.

Modifiers can be *stacked*, meaning you can apply the same modifier multiple
times to the same method. The modifiers will be called in the same order in
which they were applied.

- @<!-- -->after

Executes after the primary method.

- @<!-- -->before

Executes before the primary method.

- @<!-- -->stack

Executes after the primary method but before any `after` modifiers.

- @<!-- -->override

Over-rides the primary method. Use this to replace the default implementation
while maintaining any method modifiers which have been applied.



## Property Modifiers

- @<!-- -->build, @<!-- -->build( methodName )

User a builder method to provide the default value for the property.

Can be called without arguments, in which case `methodName` will 
default to the property name prefixed with `_build_`. For example the
builder method for property `foo` will default to `_build_foo`.


- @<!-- -->delegate( o => to ), @<!-- -->delegate( o => to, propertyName )

Delegate to the property of another object. Both reading or writing of the 
property will be delegated to the `to` object. You may optionally specify
an alternative property name on the `to` object to delegate to.


- @<!-- -->inherit( o => from ), @<!-- -->inherit( o => from, propertyName )

Inherit the property from another object if it has not been explicitly set 
on the object itself. This is similar to `delegate` and different 
from typical class based inheritance. 

Writing of the property always happens on the object itself. Reading of
property will return the value from the object if it has been set, 
otherwise the value on the `from` object will be used. You may optionally 
specify the property name on the `from` object to inherit from.


- @<!-- -->lazy, @<!-- -->lazy(defaultValue), @<!-- -->lazy( o => defaultValue )

Create a lazily loaded property. If the property has not been set it will
be instantiated using the default value the first time it is accessed.

Can be called without arguments, in which case the existing default value
is used to populate the property, or can be called with the default value
as the first and only parameter. Accepts either a primitive value or a 
callback which returns an object or data structure. The object 
instance is available in the callback as the first argument *and* as the 
the `this` variable when not inside a fat-arrow function.

Can be used in conjunction with `build`

- @<!-- -->readonly

This property will be read only. Attempting to set this property will
raise an exception. Use in conjunction with another decorator which 
provides a default value such as `lazy`, `delegate`, or `build`.

- @<!-- -->nonenumeral

The property will not be included when iterating over the object using
`for ... in` or returned as a result from `Object.keys`. The property
will not be included when serializing using `deflate` or `JSON.stringify`,
or when printing the object using `console.log`. [More information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)


- @<!-- -->override

Override the value in an existing property descriptor. This allows traits 
to over-ride properties defined in consumers.

## Functions

- deflate( object )

Deflate a constructed object to an object literal. Use for serializing objects
to be passed through APIs or stringified as JSON.  Delegated and inheritied 
properties are not serialized. Returns a javascript object literal.


## Caveats

### TypeScript Definitions

When defining properties or methods via a trait it necessary to inform typescript
of the definitions. This can be accomplished using an interface. For example:

```
import { include } from '@agape/object'

class MyTrait {

    foo() {
        console.log('Called foo')
    }

}


export interface MyObject extends MyTrait { }

@include( MyTrait )
export class MyObject {

}

let o = new MyObject()

o.foo()
```


### Deflate

Using `deflate` requires that you target es6 or later in your `tsconfig.json`.
Using `es5` results in methods being included in the deflated data structure.

`@agape\object` is built with the following compiler options.

```
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "lib": ["dom","es2016"],
      ...
```

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020 Maverik Minett


## License

MIT
