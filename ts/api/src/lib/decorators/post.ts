import { ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';


export function Post( path?: string, params?: any ) {

    return function Post( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).route('post', path, params).status(201)

        return target
    }

}

