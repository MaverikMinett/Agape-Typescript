import { HttMethod } from './types';


export class RouteDescriptor {

    description: string;

    constructor( public method: string, public path: string, public action: string, params: any ) {

    }

}

export class ControllerDescriptor {

    routes: RouteDescriptor[] = []

    actions: Map<string, ActionDescriptor> = new Map()

    constructor( public target: any ) {

    }

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

// export class StatusDescriptor {
//
// }

export class ActionDescriptor {

    // status: { statusCode: number, message?: string, body?: any }

    ʘstatus: number;

    ʘroute: { method: string, path: string };

    constructor( public name: string ) {

    }

    status( statusCode: number ) {
        this.ʘstatus = statusCode;
        return this
    }

    route( method:HttMethod, path: string, params?: any ) {
        this.ʘroute = { method, path }
        return this
    }



}