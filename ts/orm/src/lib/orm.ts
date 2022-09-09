import { Class } from '@agape/object'
import { Collection } from 'mongodb';
import { MongoDatabase } from './databases/mongo.database';
import { RetrieveQuery } from './mongo/queries/retrieve.query';


export interface ModelLocatorParams {
    databaseName?: string;
    collectionName?: string;
}

export class ModelLocator {
    databaseName: string;
    collectionName: string;
    collection: Collection;

    constructor( params:Pick<ModelLocator, keyof ModelLocator> ) {
        params && Object.assign(this, params)
    }
}

export class Orm {

    databases: Map<string, MongoDatabase> = new Map()

    models: Map<Class, ModelLocator> = new Map()

    registerDatabase( identifier: string, database: MongoDatabase ) {
        this.databases.set(identifier, database)
    }

    // registerEntity( entity: Class ) {
        // TODO: Get the database from the entity definition
        // const database = Agape.Entity(entity).database
        // TODO: Allow the database to be passed in as a parameter
        // this.registerModel( entity, database )
    // }

    registerModel( model: Class, params: ModelLocatorParams={} ) {

        // TODO: Throw an error if the class passed in is a View and not a plain Model
        // Only Models can be registered here

        const databaseName = params?.databaseName ?? 'default';
        const collectionName = params?.collectionName ?? model.name;

        const database = this.databases.get(databaseName)
        if ( ! database )
            throw new Error(`Error registering model ${model.name}, database with identifier ${databaseName} does not exit`)

        // TODO: Don't allow two models to map to the same collection on the same database
        // will need to keep some sort of registry which can be validated against here.
        // dev should see an error that mapping two models to the same table/collection
        // is not possible, and that a View should be used instead

        // Determine the collection
        const collection = database.getCollection(collectionName)

        // Create a locator object
        const locator = new ModelLocator({ databaseName, collectionName, collection})

        this.models.set(model, locator)

        // this.models.set(model, database)
    }

    async insert( model: Class, item: any ) {

        console.log(`Inserting instance of ${model.name}`, item)

        const collection = this.models.get(model).collection

        // TODO: validate the item

        // TODO: serialize the item

        try {
            const response = await collection.insertOne( item )
            item.id = response.insertedId.toString()
            return item.id
        }
        catch (error) {
            console.log("Error inserting record into Foo", error)
        }
        console.log(`Success`)
    }

    retrieve<T extends Class>( model: T, id: string ) {
        console.log(`Retrieving instance of ${model.name}`, id)

        const collection = this.models.get(model).collection

        return new RetrieveQuery<T>(model, collection, id)
    }

    async list( model: Class, id: string ) {

    }


}