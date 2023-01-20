import cors from 'cors';
import express from 'express';

import { Orm, MongoConnection, MongoDatabase } from '../../../ts/orm/src';
import { Request, Response, NextFunction } from 'express';


import { SwaggerApi } from './swagger.api';

const DATABASE_URL = 'mongodb://localhost:49000';

export async function buildExpressApplication() {

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


    /** Build the express application **/
    const app = express()
    app.use( cors({origin: '*'}) )
    app.get('', (req, res) => { res.redirect('/api')})

    /** Swagger **/
    const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
    app.use( '/api', express.static('public') )
    app.use( '/api', express.static(pathToSwaggerUi) )


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
    // const api = new Api( app, orm )
    // // api.registerModel(Event)
    // api.registerController(AuthController)

    /** Build the swagger documentation **/
    const swagger = new SwaggerApi()
    swagger.title = "Foo API"
    swagger.description = "An automatically generated API"

    // swagger.addApi( api )

    const swaggerDoc = swagger.toOpenApiJson()

    app.use( '/swagger.json', ( req, res ) => {
        res.send( swaggerDoc )
        console.log(JSON.stringify(swaggerDoc,null,4))
    })


    return app
}
