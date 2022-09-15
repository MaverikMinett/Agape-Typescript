import { HttMethod } from './types';
import { ApiController } from './controllers/api.controller';


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


export type ActionDescriptionFunction = (controller: ApiController, action: ActionDescriptor) => string
export type ActionDescription = string|ActionDescriptionFunction

export class ActionDescriptor {

    // status: { statusCode: number, message?: string, body?: any }

    private ʘstatus: number;

    private ʘroute: { method: string, path: string };

    private ʘdescription: ActionDescription

    constructor( public name: string ) {

    }

    description(): string
    description( description: ActionDescription ): this
    description( description?: ActionDescription ) {
        if ( description === undefined ) return this.ʘdescription
        this.ʘdescription = description
        return this
    }

    getDescription( controller: ApiController ): string {

        if ( ! this.ʘdescription ) return ""
        if ( typeof this.ʘdescription === "function" ) {
            console.log("Get description", controller, this)
            console.log("======>GOT FUNCTION")
            console.log(this.ʘdescription.call(this, controller, this ))
            return this.ʘdescription.call(this, controller, this )
        }
        return this.ʘdescription
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
