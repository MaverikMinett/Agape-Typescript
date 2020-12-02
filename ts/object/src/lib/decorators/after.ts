import { meta } from '../meta'

export function after(target:any, name: string,  descriptor: TypedPropertyDescriptor<Function>) {
    meta(target).method(name).after( descriptor.value )
}
