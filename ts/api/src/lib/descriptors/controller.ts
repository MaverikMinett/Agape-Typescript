import { ActionDescriptor } from './action';
import { ComponentDescriptor } from './component';

export class ControllerDescriptor extends ComponentDescriptor {

    actions: Map<string, ActionDescriptor> = new Map()

    action( name: string ) {
        let action = this.actions.get(name)
        if ( ! action ) {
            console.log(`Creating action ${name}`)
            action = new ActionDescriptor( name )
            this.actions.set(name, action)
        }
        return action
    }

}
