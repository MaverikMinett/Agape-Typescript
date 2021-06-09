import { meta } from "./meta"
import { Class, Dictionary } from "./types"


// export function inflate( to:Class, from:Dictionary )
// export function inflate( to:Class[], from:Dictionary[] )
export function inflate<T>( to:Class|Class[], from:Dictionary|Dictionary[]):T
export function inflate( to:Class|Class[], from:Dictionary|Dictionary[]) {
    return Array.isArray(to) ? inflateArray( to[0], <Dictionary[]>from ) : inflateObject( to, from )
}

export function inflateObject<T>( to:Class, from:Dictionary ):T
export function inflateObject(to:Class, from:Dictionary ) {

    const o = new to()

    const m = meta(to)
    
    for ( let key in from ) {
        o[key] = m.property(key).ʘcoerce ? inflate( m.property(key).ʘcoerce, from[key] ) : from[key]
    }

    return o
}

export function inflateArray<T>( to:Class, from:Dictionary[] ):T[]
export function inflateArray( to:Class, from:Dictionary[] )  {
    return from.map( e => inflateObject(to, e) )
}

