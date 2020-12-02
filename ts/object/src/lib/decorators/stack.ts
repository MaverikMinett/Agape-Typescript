import { meta } from '../meta'

export function stack(target:any, name: string,  descriptor: TypedPropertyDescriptor<Function>) {
    meta(target).method(name).stack( descriptor.value )
}
