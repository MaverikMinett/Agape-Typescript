import { Orm } from './lib/orm';
import { MongoConnection } from './lib/connections/mongo.connection';

const DATABASE_URL = 'mongodb://localhost:49000';

async function main() {
    const orm = new Orm()

    const connection = new MongoConnection(DATABASE_URL);



    try {
        console.log(`Connecting to ${DATABASE_URL}`)
        await connection.connect()
        console.log(`Connected successfully`)
    }
    catch ( error ) {
        console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
    }



}

main()




