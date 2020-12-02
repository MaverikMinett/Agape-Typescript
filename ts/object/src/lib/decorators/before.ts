import { meta } from '../meta'


export function before( target:any, name: string,  descriptor: TypedPropertyDescriptor<Function>) {
    meta(target).method(name).before( descriptor.value )
}
