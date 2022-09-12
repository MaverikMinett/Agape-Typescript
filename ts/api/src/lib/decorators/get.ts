import { ControllerDescriptor, RouteDescriptor } from '../descriptors';
import { Controller } from './controller';


export function Get( path: string, params?: any ) {

    return function Get( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        console.log(`/**** GET ${path} ${params}`)

        controller.action(name).route('get', path, params).status(200)

        return target
    }

}

