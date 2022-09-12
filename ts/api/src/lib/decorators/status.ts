import { Controller } from './controller';
import { ActionDescriptor } from '../descriptors';


export function Status ( statusCode: number ) {
    return function Status( target: any, name: string, propertyDescriptor: TypedPropertyDescriptor<Function>) {

        console.log(`/**** STATUS ${statusCode}`, target, target.prototype )

        const controller = Controller.descriptor(target, true)

        const action = new ActionDescriptor(name)

        action.status(statusCode)

        Reflect.defineMetadata('action:descriptor', action, propertyDescriptor )

        controller.action(name).status(200)

        return target
    }
}