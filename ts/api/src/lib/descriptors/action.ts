import { ActionDescription, HttMethod, ResponseDescription } from '../types';
import { Class } from '../../../../object/src';
import { ResponseDescriptor } from './response';
import { BodyDescriptor, BodyDescriptorParams } from './body';
import { ControllerDescriptor } from './controller';


export class ActionDescriptor {

    private ʘbody: BodyDescriptor;

    private ʘstatus: number;

    private ʘroute: { method: string, path: string };

    private ʘdescription: ActionDescription

    private ʘresponses: ResponseDescriptor[]

    constructor( public name: string ) {

    }

    description(): string
    description( description: ActionDescription ): this
    description( description?: ActionDescription ) {
        if ( description === undefined ) return this.ʘdescription
        this.ʘdescription = description
        return this
    }

    // TODO: Are controllers really any? Or do they need to
    // inherit from a base class
    getDescription( controller: ControllerDescriptor ): string {
        if ( ! this.ʘdescription ) return ""
        if ( typeof this.ʘdescription === "function" ) {
            // TODO: This should look at the Controller Descriptor, not the controller
            // console.log("Get description", controller, this)
            // console.log("======>GOT FUNCTION")
            // console.log(this.ʘdescription.call(this, controller, this ))
            return this.ʘdescription.call(this, controller, this )
        }
        return this.ʘdescription
    }


    respond(model: Class, description?: ResponseDescription, statusCode?: number ) {
        this.ʘresponses ??= []
        const descriptor = new ResponseDescriptor( model, description, statusCode )
        this.ʘresponses.push(descriptor)
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






