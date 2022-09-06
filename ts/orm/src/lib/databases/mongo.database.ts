import { Db } from 'mongodb'
import { MongoConnection } from '../connections/mongo.connection';
import { Database } from './database';


export class MongoDatabase extends Database {

    public connection: MongoConnection

    public databaseName: string

    public db: Db

    constructor( connection: MongoConnection, databaseName: string ) {
        super()
        this.connection = connection
        this.databaseName = databaseName

        this.db = this.connection.client.db()
    }

}