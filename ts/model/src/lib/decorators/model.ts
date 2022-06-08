import { Class } from '@agape/object';
import { ModelDescriptor, ModelDescriptorParams } from '../descriptors'

import 'reflect-metadata'
export function Model( params?:ModelDescriptorParams ):any
export function Model( target:Class ):any
export function Model( ...args:any[] ):any {

    let target:{ new(...args: any[] ): any; }
    let params:ModelDescriptorParams
    if ( args.length ) {
        args[0] instanceof Function 
            ? [target] = args
            : [params] = args
    }

    function Model( target:any ) {
        const descriptor = new ModelDescriptor( target )
        Reflect.defineMetadata( "model:descriptor", descriptor, target );
    }

    if ( target ) return Model(target)
    else return Model

}