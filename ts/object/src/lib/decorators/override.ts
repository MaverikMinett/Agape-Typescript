import { meta } from '../meta'

export function override(target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
    if ( descriptor ) {
        meta(target).method(name).override( descriptor.value )
    }
    else {
        meta(target).property(name).override( true )
    }
    
}
