import { Class } from '@agape/object';
import { ModelDescriptor } from '../descriptors'

export interface ModelParams {
    name?: string;
    plural?: string;
    token?: string;
    tokens?: string;
}

import 'reflect-metadata'
export function Model( params?:ModelParams ):any
export function Model( target:Class ):any
export function Model( ...args:any[] ):any {

    let target:{ new(...args: any[] ): any; }
    let params:ModelParams
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