import { Class } from '@agape/object';
import { FieldDescriptor, ViewDescriptor } from '../descriptors'

import 'reflect-metadata'


export function View<T extends Class>( progenitor: T, fieldNames?: Array<keyof InstanceType<T>> ):any
export function View<T extends Class>( progenitor: T, fieldSelection?:{ pick: Array<keyof InstanceType<T>> } ):any
export function View( progenitor: Class, fieldSelection?: any ):any {

    let allFields: boolean = false;
    let fieldNames: string[]
    if ( fieldSelection === null || fieldSelection === undefined ) {
        allFields = true;
    }
    else {
        fieldNames = fieldSelection
    }

    function View( target:any ) {

        // the descriptor of the root model for the view
        let modelDescriptor = Reflect.getMetadata( "model:descriptor", progenitor );
        if ( ! modelDescriptor ) {
            throw new Error(`View must be called on a Model, ${target.name} is not a model.`)
        }

        // this descriptor is set by any @Field decorators prior to execution of @View decorator
        let protoDescriptor = Reflect.getMetadata( "model:descriptor", target.prototype );

        let viewDescriptor  = new ViewDescriptor( modelDescriptor )
        viewDescriptor.symbol = target.name

        if ( allFields ) {
            // console.log(`Adding all fields from ${progenitor.name} to ${target.name}`)
            for ( let name of modelDescriptor.fields.names ) {
                const fieldDescriptor = new FieldDescriptor(name)
                const modelFieldDescriptor = modelDescriptor.fields.get(name)
                Object.assign(fieldDescriptor,modelFieldDescriptor) 
                viewDescriptor.add(fieldDescriptor)
            }
        }
        // field name is array
        else if ( Array.isArray(fieldNames) ) {
            for ( const name of fieldNames ) {
                const modelFieldDescriptor = modelDescriptor.fields.get(name)
                if ( ! modelFieldDescriptor ) {
                    throw new Error(`${name} does not exist on ${progenitor.name}`)
                }
                const fieldDescriptor = new FieldDescriptor(name)
                Object.assign(fieldDescriptor,modelFieldDescriptor) 
                viewDescriptor.add(fieldDescriptor)
            }
        }

        // copy in any fields from the model descriptor defined on the prototype
        if ( protoDescriptor ) {
            for ( let name of protoDescriptor.fields.names ) {
                let fieldDescriptor = viewDescriptor.fields.get(name)
                // create a new descriptor for the field if it does not exist on the model
                if ( ! fieldDescriptor ) {
                    const fieldDescriptor = new FieldDescriptor(name)
                    const protoFieldDescriptor = protoDescriptor.fields.get(name)
                    Object.assign(fieldDescriptor,protoFieldDescriptor) 
                    viewDescriptor.add(fieldDescriptor)
                }
                // over-write properties on the field descriptor if it does exist on the model
                else {
                    const protoFieldDescriptor = protoDescriptor.fields.get(name)
                    Object.assign(fieldDescriptor,protoFieldDescriptor) 
                }
            }
        }

        // PICK

        // EXCEPT

        // PARTIAL

        // ALL

        Reflect.defineMetadata("model:descriptor", viewDescriptor, target )
    }

    return View

}