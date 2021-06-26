import { meta } from "../meta"
import { Serializer } from "../serializer"
import { Class } from "../types"

export function coerce( to:Class|[Class]|Serializer|[Serializer] ):any {

    function coerce( target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the coerce decorator on a method") 
        meta(target).property(name).coerce( to )
    }

    return coerce

}
