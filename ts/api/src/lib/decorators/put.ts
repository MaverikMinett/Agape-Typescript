
import { ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';


export function Put( path: string, params?: any ) {

    return function Put( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).route('put', path, params).status(204)

        return target
    }

}

