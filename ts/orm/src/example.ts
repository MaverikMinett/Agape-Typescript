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


}

main()




