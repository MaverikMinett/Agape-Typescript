import { Database } from './databases/database';
import { Class } from '@agape/object'
import { Collection } from 'mongodb';

export class Orm {

    databases: Map<string, Database> = new Map()

    models: Map<Class, Collection> = new Map()

    registerDatabase( identifier: string, database: Database ) {
        this.databases.set(identifier, database)
    }

    // registerEntity( entity: Class ) {
        // TODO: Get the database from the entity definition
        // const database = Agape.Entity(entity).database
        // TODO: Allow the database to be passed in as a parameter
        // this.registerModel( entity, database )
    // }

    registerModel( model: Class ) {
        // TODO: Allow the database to be passed in as a parameter

        // Just use the default database for now
        const databaseName = 'default';
        const database = this.databases.get(databaseName)
        if ( ! database )
            throw new Error(`Error registering model ${model.name}, database with identifier ${databaseName} does not exit`)

        // Determine the collection
        const collection = database.collection(model)
        this.models.set(model, collection)

        // this.models.set(model, database)
    }

    async insert( model: Class, item: any ) {

        console.log(`Inserting instance of ${model.name}`, item)

        const collection = this.models.get(model)

        // TODO: validate the item

        // TODO: serialize the item

        try {
            const response = await collection.insertOne( item )
            item.id = response.insertedId.toString()
        }
        catch (error) {
            console.log("Error inserting record into Foo", error)
        }
        console.log(`Success`)
    }


}