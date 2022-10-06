import { ControllerDescriptor } from '../descriptors';
import { Controller } from './controller';
import { Class } from '../../../../object/src'
import { RespondDescription } from '../types';

export function Respond( model: Class, description?: RespondDescription, statusCode?: number ) {

    return function Respond( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const controller: ControllerDescriptor = Controller.descriptor(target, true)

        controller.action(name).respond(model, description, statusCode)

        return target
    }

}

