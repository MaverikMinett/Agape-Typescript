import { Class } from '../../../../object/src';
import { ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';

export function Body( model: Class, description?: string ) {

    return function Body( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).body(model, description)

        return target
    }

}

