import { ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';


export function Delete( path?: string, params?: any ) {

    return function Delete( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).route('delete', path, params).status(204)

        return target
    }

}
