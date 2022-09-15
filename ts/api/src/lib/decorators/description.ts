import { ActionDescription, ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';

export function Description( description:ActionDescription ) {
    return function Description( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).description(description)

        return target
    }
}

