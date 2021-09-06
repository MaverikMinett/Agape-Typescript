import { meta } from '../meta'

/* This does the same thing as the 'property' decorator. */
export function lazy( value:string|((o:any) => any) ):any
export function lazy( value:any ):any
export function lazy( target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>):any
export function lazy( ...args:any[] ):any {

    let [ value, propertyName, descriptor ] = args

    function lazy(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the lazy decorator on a method")
        meta(target).property( propertyName ).lazy(value)
    }

    if ( propertyName === undefined ) {
        return lazy
    }
    else {
        let target = value
        value = undefined
        return lazy( target, propertyName, descriptor )
    }

}
