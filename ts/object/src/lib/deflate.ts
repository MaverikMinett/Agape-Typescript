

import { ObjectDescriptor } from '../lib/descriptors'

/**
 * Serializes an instance as a simple JSON object. Properties
 * managed by agape will not contain the special character
 * in the serialized version.
 * 
 * @param object Object to deflate
 * @retuns JSON object
 */
// export function deflate( object:Object ):{[key:string]:any} {
//     object = JSON.parse(JSON.stringify(object))

//     function _deflate( object ) {
//         let r:any = {}
//         for ( let field in object ) {
//             let key = field
//             if ( field.startsWith('ʘ') ) key = field.substring(1)

//             let value = object[field]
//             if ( value instanceof Object ) value = _deflate(value)
//             r[key] = value
//         }
//         return r
//     }

//     return _deflate( object )
// }

function deflateObject( item:Object, params?:any ) {
    let r:any = {}

    let m:ObjectDescriptor = 'Δmeta' in item ? <ObjectDescriptor>item['Δmeta'] : null

    for ( let field in item ) {

        /* if this is property is managed by agape */
        if ( m && m.properties.has(field) ) {
            /* ignore delegated properties */
            if ( m.property(field)['ʘdelegate'] ) continue
            /* ignore inheritied properties */
            if ( m.property(field)['ʘinherit'] ) continue
        }

        let value = deflate( item[field] )

        r[field] = value
    }

    return r
}


function deflateArray(  items:Array<any>, params?:any ) {
    return items.map( item => deflate(item) )
}

export function deflate( item:any, params?:any ) {

    if ( item instanceof Object ) { return deflateObject( item ) }

    else if ( item instanceof Array ) { return deflateArray(item) }

    else return item
}

