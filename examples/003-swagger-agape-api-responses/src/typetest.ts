import { BarEntity, FooEntity } from './entity';
import { stringify } from 'querystring';


type IsPrimitive<T> = T extends string
    | number
    | boolean
    | null
    | undefined
    ? true : false;

type IsArray<T> = T extends Array<infer X> ? true : false
type IsRecord<T> = T extends Record ? true : false          // IsEntity
type IsDate<T> = T extends Date ? true : false


class Record {
    private χ   // Make entities typesafe
}

class NotAnEntity {

}

class AClass extends Record {

    number: number

    string: string

    date: Date

    boolean: boolean

    array: Array<any>

    arrayOfNumbers: Array<number>

    arrayOfStrings: Array<string>

    arrayOfBooleans: Array<boolean>

    arrayOfArrays: Array<Array<number>>


    entity: Record

    notAnEntity: NotAnEntity

    arrayOfEntities: Record[]

    arrayOfNotEntities: NotAnEntity[]
}

class BClass extends Record {
    foo: AClass
}

type Flatten<T> = IsPrimitive<T> extends true ? T
    : IsArray<T> extends true ? FlattenArray<T>
    : IsDate<T> extends true ? FlattenDate<T>
    : { [k in keyof T]: FlattenValue<T[k]> };

type FlattenEntity<T> = T extends Record ? string : T;
type FlattenDate<T>   = T extends Date ? string : T;
type FlattenArray<T>  = T extends Array<infer X> ? Array<FlattenValue<X>> : T

type FlattenValue<T>  = IsPrimitive<T> extends true ? T
    : IsRecord<T> extends true ? FlattenEntity<T>
    : Flatten<T>


let a: AClass = new AClass()
let x: Flatten<AClass>
console.log( x.number )
console.log( x.string )
console.log( x.date )
console.log( x.boolean )
console.log( x.array )
console.log( x.arrayOfNumbers )
console.log( x.arrayOfStrings )
console.log( x.arrayOfBooleans )
console.log( x.arrayOfArrays )
console.log( x.entity )
console.log( x.notAnEntity )



// type Flatten<T> = {
//     [k in keyof T]: FlattenValue<T[k]>
// }
//
//
//
//
//
// type FlattenValue<T>  = IsPrimitive<T> extends true ? T
//     : IsArray<T> extends true ? FlattenArray<T>
//         : IsRecord<T> extends true ? FlattenEntity<T>
//             : Flatten<T>


//
// type Flatten<T> = IsPrimitive<T> extends true ? T
//     : IsArray<T> extends true ? FlattenArray<T>
//     : IsDate<T> extends true ? FlattenDate<T>
//     : IsRecord<T> extends true ? FlattenRecord<T>
//     : T;
//
// type FlattenArray<T>  = T extends Array<infer X> ? Array<Flatten<X>> : T
// type FlattenDate<T>   = T extends Date ? string : T;
// type FlattenRecord<T> = T extends Record ? string : T;
//
let r: Flatten<string>

let s: Flatten<number>

let t: Flatten<Date>






let y: Flatten<BarEntity>
console.log( y.foo )
console.log( y.goop )
console.log( y.foodaddies )
console.log( y.foonums )
