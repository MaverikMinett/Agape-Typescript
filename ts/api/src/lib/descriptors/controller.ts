import { ActionDescriptor } from './action';
import { AspectDescriptor } from './aspect.descriptor';
import { ModelDescriptor } from '@agape/model';

export class ControllerDescriptor extends AspectDescriptor {

    path?: string

    actions: Map<string, ActionDescriptor> = new Map()

    action( name: string ) {
        let action = this.actions.get(name)
        if ( ! action ) {
            action = new ActionDescriptor( name )
            this.actions.set(name, action)
        }
        return action
    }

}

export class ModelControllerDescriptor extends ControllerDescriptor {

    model: ModelDescriptor

}

