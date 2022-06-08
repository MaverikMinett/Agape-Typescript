import { Class } from "../../../object/src/lib/types";
import { ModelDescriptor } from "./descriptors";

export function $model( target:Class ) {
    let descriptor = Reflect.getMetadata( "model:descriptor", target );
    if ( ! descriptor ) {
        descriptor = new ModelDescriptor( target.name )
        Reflect.defineMetadata( "model:descriptor", descriptor, target );
    }
    return descriptor
}


