import { meta } from '../meta'

/* This does the same thing as the 'property' decorator. */

export function lazy ( value:any ) {
    return function lazy(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use property decorator on a method") 
        meta(target).property( propertyName ).default(value)
    }
}

