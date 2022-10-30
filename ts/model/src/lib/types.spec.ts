import { Flatten } from './types';

class AnEntity extends Document { }

class NotAnEntity { }

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

    document: AnEntity

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



describe('Model Types', () => {
    xit('See spec file to verify in IDE', () => {

        let a: AClass = new AClass()
        let x: Flatten<AClass>
        console.log( x.number )                 /** number **/
        console.log( x.string )                 /** string **/
        console.log( x.date )                   /** number **/
        console.log( x.boolean )                /** boolean **/
        console.log( x.array )                  /** any[] ? **/
        console.log( x.arrayOfNumbers )         /** number[] **/
        console.log( x.arrayOfStrings )         /** string[] **/
        console.log( x.arrayOfBooleans )        /** boolean[] **/
        console.log( x.arrayOfArrays )          /** number[][] **/
        console.log( x.document )               /** string[] **/
        console.log( x.notAnEntity )            /** {} (POJO) **/
        console.log( x.arrayOfEntities )        /** string[] **/
        console.log( x.arrayOfNotEntities )     /** {}[] (Array of POJOS) **/
        console.log( x.map )                    /** Record<string, string> **/
        console.log( x.mapOfEntities)           /** Record<string, string> **/
        console.log( x.mapOfNonEntities )       /** Record<string, {}> **/
        console.log( x.set )                    /** string[] **/
        console.log( x.setOfEntities )          /** string[] **/
        console.log( x.setOfNonEntities )       /** string[] **/

        let r: Flatten<string>                  /** string[] **/

        let s: Flatten<number>                  /** number **/

        let t: Flatten<Date>                    /** string[] **/

        let u: Flatten<Array<string>>           /** string[] **/

        let v: Flatten<Set<string>>             /** string[] **/

        let w: Flatten<Map<string,string>>      /** Record<string,string> **/

    })
})
