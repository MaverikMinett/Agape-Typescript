import { meta } from "./meta";
import { Class, Dictionary } from "./types";
import { ObjectDescriptor } from "./descriptors";

export class Serializer {

    constructor( public to?: Class ) {

    }

    inflate( data:any ) {
        return inflate( this.to, data )
    }

    deflate( item:Object, params?:any ) {
        return deflate( item, params )
    }

}




/**
 * Inflate
 */
export function inflate<T extends Class>( to:T, from:Dictionary|any):InstanceType<T>
export function inflate<T extends Class>( to:[T], from:Dictionary[]|any[]):Array<InstanceType<T>>
export function inflate<T>( to:Class|Serializer, from:Dictionary):T
export function inflate<T>( to:[Class]|[Serializer], from:Dictionary[]):T
export function inflate( to:Class|[Class]|Serializer|[Serializer], from:Dictionary|Dictionary[]|any|any[]) {

    return Array.isArray(to) 
        ? inflateArray( to[0], <Dictionary[]>from ) 
        : inflateObject(to, from )

}


export function inflateObject<T>( to:Class|Serializer, from:Dictionary ):T
export function inflateObject(to:Class|Serializer, from:Dictionary ) 
{

    if ( to instanceof Serializer ) {
        return to.inflate( from )
    }

    else {
        const o = new to()

        const m = to['Δmeta']
        
        for ( let key in from ) {
            if ( m?.properties.has(key) &&  m?.property(key).ʘcoerce ) {
                const coerce =  m.property(key).ʘcoerce
                o[key] = inflate( <any>coerce, from[key] )
            }
            else {
                o[key] = from[key]
            }
        }
    
        return o
    }

}


export function inflateArray<T>( to:Class|Serializer, from:Dictionary[] ):T[]
export function inflateArray( to:Class|Serializer, from:Dictionary[] ) 
{
    return from.map( e => inflateObject(to, e) )
}



/**
 * Deflate
 */



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

            if (  m.property(field)['ʘcoerce'] ) {
                const coerce = m.property(field)['ʘcoerce']

                if ( coerce instanceof Serializer ) {
                    r[field] = coerce.deflate( item[field] )
                }
                else if ( Array.isArray(coerce) && coerce[0] instanceof Serializer ) {
                    r[field] = item[field].map( value => (<Serializer>coerce[0]).deflate( value ) )
                }
                else {
                    r[field] = deflate( item[field] )
                }
                continue
            }
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



