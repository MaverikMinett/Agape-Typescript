import { Database } from './databases/database';
import { Class } from '@agape/object'

export class Orm {

    databases: Map<string, Database>

    models: Map<Class, Database>

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

        this.models.set(model, database)
    }

    // insert( model: Class, item: any ) {
    //
    //     const database = this.models.get(model)
    //
    //     const
    //
    // }



}