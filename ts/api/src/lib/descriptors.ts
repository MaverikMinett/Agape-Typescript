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

    private ʘstatus: number;

    private ʘroute: { method: string, path: string };

    constructor( public name: string ) {

    }

    status(): number
    status( statusCode: number ): this
    status( statusCode?: number ) {
        if ( statusCode === undefined ) return this.ʘstatus
        this.ʘstatus = statusCode;
        return this
    }

    route(): { method: string, path: string }
    route( method:HttMethod, path: string, params?: any ): this
    route( method?:HttMethod, path?: string, params?: any ):any {
        if ( method === undefined ) return this.ʘroute
        this.ʘroute = { method, path }
        return this
    }

}
