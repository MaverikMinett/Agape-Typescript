import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../descriptors";

export function Field( params?:FieldDescriptorParams ):any
export function Field( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Field( ...args:any[] ):any {

    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams = {}
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 
        ? [params] = args
        : [target, name, propertyDescriptor] = args

    function Field( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Field decorator on a method")
        params.name ??= name
        const field = new FieldDescriptor( params )
        let model = Reflect.getMetadata( "model:descriptor", target );
        
        if ( ! model ) {
            model = new ModelDescriptor( target )
            Reflect.defineMetadata( "model:descriptor", model, target );
        }
        model.add(field)
    }

    if ( target ) return Field(target, name, propertyDescriptor)
    else return Field
}