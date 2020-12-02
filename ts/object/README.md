# @agape/object

Extensible objects

*Alpha*

## Synopsis

```
import { include, stack } from '@agape/object'

class MyTrait {

    @stack
    build() {
        console.log('Called second')
    }

}

@include( MyTrait )
class MyObject {

    build() {
        console.log('Called first')
    }

}
```


## Description

A collection of decorators and meta descriptors for composing extensible 
javascript objects.


## Traits

Traits are abstract classes which define or modify properties and methods
on a consuming class. Add traits to a class using the `@include` decorator.


## Class Decorators

- @include( ...traits )

Add the `...traits` to the class.

All method definitions in each trait will be copied into the consumer
unless already defined. 

All method modifiers will be copied into the consumer.

All property modifiers will be copied into the consumer. 

Existing default value definitions and method definitions in the
consumer will not be over-written with those defined in a trait
unless declared in conjuction with `override` decorator.


## Method Modifiers

- @after

Executes after the primary method.

- @before

Executes before the primary method.

- @stack

Executes after the primary method but before any `@after` modifiers.

- @override

Over-rides the primary method. Use this to replace the default implementation
while maintaining any method modifiers which have been applied.


## Property Modifiers

- @inherit( o => from )

Inherit the property from another object if it has not been explicitly
set on the object itself.


- @delegate( o => to )

Deletegate to the property of another object.

- @lazy( o => defaultValue )

Create a lazily loaded property. If the property has not been set it will
be instantiated using the default value the first time it is accessed.

Accepts either a primitive value or a callback which returns the default
value for the property. The object instance is available in the callback 
as the first argument.

- @readonly

This property will be read only. Attempting to set this property will
raise an exception. Use in conjunction with another decorator which 
provides a default value such as `lazy` or `delegate`.

- @nonenumeral

The property will not be included when iterating over the object using
`for ... in` or returned as a result from `Object.keys`. The property
will not be included when serializing using `deflate` or `JSON.stringify`,
or when printing the object using `console.log`. [More information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)


- @override

Over-ride the value in an existing property descriptor. This allows traits 
to over-ride properties defined in consumers.



## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020 Maverik Minett


## License

MIT
