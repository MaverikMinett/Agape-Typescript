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
        // A stub model descriptor may have been created by a @Field decorator
        let descriptor = Reflect.getMetadata( "model:descriptor", target.prototype );
        if ( descriptor ) {
            // Copy in params
            if ( params ) Object.assign(descriptor,params)
            else descriptor.name ??= target.name
            // Autopopulate empty label/token values
            descriptor.autopopulate()
        }
        else  {
            if ( params ) {
                params = { ...params, name: target.name }
                descriptor = new ModelDescriptor( params )
            }
            else {
                descriptor = new ModelDescriptor( target.name )
            }
        }
        Reflect.defineMetadata( "model:descriptor", descriptor, target );
    }

    if ( target ) return Model(target)
    else return Model

}


Model.descriptor = function ( model:Class ) {
    return Reflect.getMetadata( "model:descriptor", model )
}