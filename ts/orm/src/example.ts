import { Orm } from './lib/orm';
import { MongoConnection } from './lib/connections/mongo.connection';

const DATABASE_URL = 'mongodb://localhost:49000';

async function main() {
    const orm = new Orm()

    const connection = new MongoConnection('mongodb://localhost:49000');

    try {
        await connection.connect()
    }
    catch ( error ) {
        console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
    }



}

main()




