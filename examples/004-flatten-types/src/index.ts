import {  Document, Flatten } from '../../../ts/orm/src'

class AnEntity extends Document {

}

class NotAnEntity {

}

class AClass extends Document {

    number: number

    string: string

    date: Date

    boolean: boolean

    array: Array<any>

    arrayOfNumbers: Array<number>

    arrayOfStrings: Array<string>

    arrayOfBooleans: Array<boolean>

    arrayOfArrays: Array<Array<number>>

    entity: AnEntity

    notAnEntity: NotAnEntity

    arrayOfEntities: Document[]

    arrayOfNotEntities: NotAnEntity[]

    map: Map<string, string>

    mapOfEntities: Map<string, AnEntity>

    mapOfNonEntities: Map<string, NotAnEntity>

    set: Set<string>

    setOfEntities: Set<AnEntity>

    setOfNonEntities: Set<NotAnEntity>
}

class BClass extends Document {
    foo: AClass
}



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
console.log( x.arrayOfEntities )
console.log( x.arrayOfNotEntities )
console.log( x.map )
console.log( x.mapOfEntities)
console.log( x.mapOfNonEntities )
console.log( x.set )
console.log( x.setOfEntities )
console.log( x.setOfNonEntities )


let r: Flatten<string>

let s: Flatten<number>

let t: Flatten<Date>

let u: Flatten<Array<string>>

let v: Flatten<Set<string>>

let w: Flatten<Map<string,string>>

