

import { ObjectDescriptor } from '../lib/descriptors'

export function deflate( item:any, params?:any ) {

    if ( item instanceof Object ) { return deflateObject( item ) }

    else if ( item instanceof Array ) { return deflateArray(item) }

    else return item
}



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

        let value = item[field]
        
        /* get the deflated value, skip method definitions, this is required when exporting 
        to ES5, because method definitions show up in for .. in, however as of ES6 and later
        methods are consider enumerable. We will check if the value is a function here, if it
        is, the field will not be serialized */
        if ( typeof value != "function" )  r[field] = deflate( value )
        
    }

    return r
}


function deflateArray(  items:Array<any>, params?:any ) {
    return items.map( item => deflate(item) )
}

