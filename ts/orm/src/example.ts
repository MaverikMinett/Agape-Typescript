import { Orm } from './lib/orm';
import { MongoConnection } from './lib/connections/mongo.connection';
import { MongoDatabase } from './lib/databases/mongo.database';

import { Model } from '../../model/src'

const DATABASE_URL = 'mongodb://localhost:49000';


// class Application {
//
//     orm = new Orm()
//
//     async connectToDatabase() {
//         const connection = new MongoConnection(DATABASE_URL);
//
//         try {
//             console.log(`Connecting to ${DATABASE_URL}`)
//             await connection.connect()
//             console.log(`Connected successfully`)
//         }
//         catch ( error ) {
//             console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
//         }
//
//         console.log(`Connecting to database "foo"`)
//         const database = new MongoDatabase(connection, 'foo')
//         console.log(`Connected to database "foo"`)
//
//         this.orm.registerDatabase('default', database)
//     }
//
//     async registerModels() {
//
//         this.orm.registerModel()
//
//     }
//
//
// }


@Model class Foo {

    id: string

    name: string

    age: number

    constructor( params: Partial<Pick<Foo, keyof Foo>>) {
        Object.assign( this, params )
    }

}

interface IFoo {
    id: string
    name: string
    age: number
}


async function main() {
    const orm = new Orm()


    /** Connect **/
    const connection = new MongoConnection(DATABASE_URL);

    try {
        console.log(`Connecting to ${DATABASE_URL}`)
        await connection.connect()
        console.log(`Connected successfully`)
    }
    catch ( error ) {
        console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
    }

    console.log(`Connecting to database "foo"`)
    const database = new MongoDatabase(connection, 'foo')
    console.log(`Connected to database "foo"`)

    orm.registerDatabase('default', database)


    /** Register Models **/
    orm.registerModel(Foo)

    /** Insert a record **/
    const foo = new Foo({ name: 'Test', age: 42 })
    let insertedId: string
    try {
        await orm.insert(Foo, foo)
        insertedId = foo.id;
    }
    catch (error) {
        console.log("Error inserting record into Foo", error)
    }

    /** Retrieve a record **/
    try {
        const fooPojo = await orm.retrieve(Foo, insertedId).exec()
        console.log(`Retrieved record`, fooPojo)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** Retrieve record and specify an explicit interface (DTO) **/
    try {
        const fooPojo: IFoo = await orm.retrieve(Foo, insertedId).exec()
        console.log(`Retrieved record`, fooPojo)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** Inflate a record **/
    try {
        const fooObject = await orm.retrieve(Foo, insertedId).inflate()
        console.log(`Retrieved object`, fooObject)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }


}

main()




