import { ActionDescription, HttMethod, RespondDescription } from './types';
import { ApiController } from './controllers/api.controller';
import { Class } from '../../../object/src';


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

export class RespondDescriptor {

    // statusCode: number
    //
    // description: RespondDescriptor

    // model: Class

    constructor( public model: Class, public description?: RespondDescription, statusCode?: number ) {

    }
}


export class ActionDescriptor {

    // status: { statusCode: number, message?: string, body?: any }

    // private ʘname: string;

    private ʘbody: BodyDescriptor;

    private ʘstatus: number;

    private ʘroute: { method: string, path: string };

    private ʘdescription: ActionDescription

    private ʘresponds: RespondDescriptor[]

    constructor( public name: string ) {

    }

    description(): string
    description( description: ActionDescription ): this
    description( description?: ActionDescription ) {
        if ( description === undefined ) return this.ʘdescription
        this.ʘdescription = description
        return this
    }

    getDescription( controller?: ApiController ): string {
        if ( ! this.ʘdescription ) return ""
        if ( typeof this.ʘdescription === "function" ) {
            // TODO: This should look at the Controller Descriptor, not the controller
            // console.log("Get description", controller, this)
            // console.log("======>GOT FUNCTION")
            // console.log(this.ʘdescription.call(this, controller, this ))
            // return this.ʘdescription.call(this, controller, this )
            return "GET DESCRIPTION"
        }
        return this.ʘdescription
    }


    respond( model: Class, description?: RespondDescription, statusCode?: number ) {
        this.ʘresponds ??= []
        const descriptor = new RespondDescriptor( model, description, statusCode )
        this.ʘresponds.push(descriptor)
        return this
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

    body(): BodyDescriptor
    body( model: Class, description?: string, contentType?: string )
    body( params: BodyDescriptorParams )
    body( params?: Class|BodyDescriptorParams, description?: string, contentType?: string ) {
        if ( params === undefined ) return this.ʘbody

        let descriptor: BodyDescriptor

        if ( typeof params === 'function' ) {
            const model = params
            descriptor = new BodyDescriptor({ model })

            descriptor.model = model
            if ( description !== undefined ) descriptor.description = description
        }
        else {
            descriptor = new BodyDescriptor(params)
        }

        this.ʘbody = descriptor
        return this
    }

}

export class BodyDescriptor {

    description?: string

    contentType?: string = "application/json"

    model?: Class

    constructor( params?: BodyDescriptorParams ) {
        params && Object.assign(this, params)
    }

}

export type BodyDescriptorParams = Pick<BodyDescriptor, keyof BodyDescriptor>
