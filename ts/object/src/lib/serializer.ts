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

        const m = meta(to)
        
        for ( let key in from ) {
            if ( m.properties.has(key) &&  m.property(key).ʘcoerce ) {
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
export function deflate<T>( item: T, params?: any ): Pick<T, keyof T>
export function deflate<T>( item: Array<T>, params?: any ):Array<Pick<T, keyof T>>
export function deflate<T>( item: T|Array<T>, params?:any ): Pick<T, keyof T>|Array<Pick<T, keyof T>>  {

    if ( item instanceof Object ) {
        return deflateObject<T>( item as unknown as T )
    }

    else if ( item instanceof Array ) {
        return deflateArray<T>(item as T[])
    }

    else return item
}


function deflateObject<T>( item: T, params?:any ): Pick<T, keyof T> {
    let r:any = {}

    let _item:any = item;

    let m:ObjectDescriptor = 'Δmeta' in _item? <ObjectDescriptor>_item['Δmeta'] : null


    for ( let field in item ) {

        // if the property is not managed by agpe, just deflate it
        if ( ! m || ! m.properties.has(field) ) safePropertyDeflate( r, field, item )

        /* if this is property is managed by agape */
        else {
            /* ignore delegated properties */
            if ( m.property(field)['ʘdelegate'] ) continue

            /* ignore ephemeral properties that have no value */
            if ( m.property(field)['ʘephemeral'] && item['ʘ'+field] === undefined ) continue

            /* ignore unpopulated inherited properties with undefined value */
            if ( m.property(field)['ʘinherit']  ) {
                if ( _item[`ʘ${field}`] === undefined ) {
                    continue
                }
            } 

            /* use coercion on the property */
            if (  m.property(field)['ʘcoerce'] ) {
                coerceProperty( r, field, item )
                continue
            }
            
            /* still here? safely deflate the property */
            safePropertyDeflate( r, field, item )
        }
    }

    return r
}

function deflateArray<T>( items:Array<T>, params?: any ): Array<Pick<T, keyof T>> {
    return items.map( item => deflate(item) )
}

function safePropertyDeflate( outputObject: Dictionary, propertyName: string, item: any ) {
        /* get the deflated value, skip method definitions, this is required when exporting 
        to ES5, because method definitions show up in for .. in, however as of ES6 and later
        methods are consider enumerable. We will check if the value is a function here, if it
        is, the field will not be serialized */
        if ( typeof item[propertyName] != "function" )  outputObject[propertyName] = deflate( item[propertyName] )
}


function coerceProperty( outputObject: Dictionary, field: string, instance: any ) {
    const m = instance.Δmeta
    const coerce = m.property(field)['ʘcoerce']

    if ( coerce instanceof Serializer ) {
        outputObject[field] = coerce.deflate( instance[field] )
    }
    else if ( Array.isArray(coerce) && coerce[0] instanceof Serializer ) {
        outputObject[field] = instance[field].map( (value:any) => (<Serializer>coerce[0]).deflate( value ) )
    }
    else {
        safePropertyDeflate( outputObject, field, instance )
    }
}

function coerceAndDeflateProperty() {

}
