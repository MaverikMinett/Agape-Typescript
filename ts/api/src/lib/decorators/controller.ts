import { ControllerDescriptor } from '../descriptors';
import { Class } from '../../../../object/src'

export function Controller( params?: any ) {
    return function <T extends {new(...args:any[]):{}}>( target:T ) {
        const descriptor = Controller.descriptor( target, true )

        params && Object.assign(descriptor, params)

        return target

    }
}

Controller.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let controllerDescriptor: ControllerDescriptor = Reflect.getMetadata( "controller:descriptor", target )

    if ( ! controllerDescriptor && create===true ) {
        controllerDescriptor = new ControllerDescriptor( target )
        Reflect.defineMetadata("controller:descriptor", controllerDescriptor, target)
    }

    return controllerDescriptor
}

Controller.actions = function ( target: Class|Object ) {

}
