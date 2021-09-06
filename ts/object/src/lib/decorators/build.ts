import { meta } from '../meta'


export function build( method?:string|Object, ...args ):any {

    function build( target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the build decorator on a method") 
        meta(target).property(name).build( method )

        // meta(target).property(name).build( method )
    }

    if ( method instanceof Object ) {
        let [target, name, descriptor] = [method, ...args]

        method = undefined
        
        return build(target, name, <any>descriptor)
    }

    else {
        return build
    }

}
