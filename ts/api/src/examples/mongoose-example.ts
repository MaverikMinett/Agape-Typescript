import { Orm, MongoConnection, MongoDatabase } from '../../../orm/src';
import { Model } from '../../../model/src';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Api } from '../lib/api'

const DATABASE_URL = 'mongodb://localhost:49000';
const PORT = 50000;

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

    /** Connect to database **/
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


    /** Build the orm **/
    const orm = new Orm()
    orm.registerDatabase('default', database)
    /** Register Models **/
    orm.registerModel(Foo)

    /** Build the express application **/
    const app = express()
    app.get("/", (request: Request, response: Response) => { return response.send("🦄") })
    app.use( express.json() )
    app.use( express.urlencoded({extended: true}) )

    // logging
    app.use(
        (request: Request, response: Response, next:NextFunction ) => {
            console.log(`${request.method} ${request.path}`)
            next()
        }
    )

    /** Build the api **/
    const api = new Api( app, orm )
    api.registerModel(Foo)

    /** Start the server **/
    app.listen( PORT, () => {
        console.log(`Server started on port http://localhost:${ PORT }/api`)
    } )
}

main()

