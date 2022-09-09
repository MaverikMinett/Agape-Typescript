import { Class } from '@agape/object';
import { Orm } from '../../../orm/src';
import { $model, ModelDescriptor } from '../../../model/src';
import { Router as ExpressRouter, Application as ExpressApplication, Request, Response, request } from 'express';

// class ApiModelDefinition {
//     controller: ModelController;
//     router: Router;
// }

// class Router<T extends Class> {
//
//     constructor( public model: T, public controller: ModelController<T> ) {
//
//     }
//
//
//
// }

class Route {

    constructor(
        public controller: Controller,
        public method: string,
        public path: string,
        public action: string ) { }

    async dispatcher( request: Request, response: Response ) {
        response.send(await this.controller[this.action]( request, response ))
    }

    apply( expressRouter: ExpressRouter ) {
        expressRouter[this.method](this.path, async ( request: Request, response: Response ) => {
            return this.dispatcher( request, response )
        } )
    }
}

class Router {

    express = ExpressRouter()

    constructor( public controller: Controller ) {

    }

    addRoute( method: string, path: string, action: string ) {
        const route = new Route( this.controller, method, path, action )
        route.apply( this.express )
    }

}

export class Controller {

}

class ModelController<T extends Class> extends Controller {

    router: Router

    modelDescriptor: ModelDescriptor

    constructor( public model: T, public orm: Orm ) {
        super()
        this.modelDescriptor = $model( this.model )
        this.router = new Router(this)
        this.registerRoutes()
    }

    async create( request: Request, response: Response ) {
        // $validate(this.model, request.body)

        try {
            const id = await this.orm.insert( this.model, request.body )
            response.status(200)
            return id
        }
        catch (error) {
            console.log(`Error inserting record into ${this.model.name}`, error)
        }

    }

    async retrieve( request: Request, response: Response ) {
        const id: string = request.params.id
        const item = await this.orm.retrieve(this.model, id).exec()
        if ( ! item ) {
            // TODO: Throw HttpException
            throw new Error("404 item not found")
        }
        console.log("Retrieved item", item)
        return item
    }

    registerRoutes( ) {

        this.router.addRoute( 'get', `/${this.modelDescriptor.tokens}/:id`, 'retrieve' )

        // this.controllerRouter.register(
        //     [ 'get', `/${this.modelDescriptor.tokens}/:id`, 'retrieve' ],
        //
        // )

        // let path = `/${this.modelDescriptor.tokens}/:id`
        // this.router.get(`/${this.modelDescriptor.tokens}/:id`, async ( request: Request, response: Response ) => {
        //     console.log("Retrieve route called")
        //     response.send(await this.retrieve( request, response ))
        // });
        // this.router.get(`/${this.modelDescriptor.tokens}/:id`, async ( request: Request, response: Response ) => {
        //    return this.retrieve( request, response )
        // });
    }


}

export class Api {

    models: Map<Class,ModelController<any>>

    constructor( public app: ExpressApplication, public orm: Orm ) {

    }

    registerModel<T extends Class>( model: T ) {
        const controller = new ModelController( model, this.orm )

        this.app.use('/api', controller.router.express )
    }

    // createControllerForModel( model: Class ) {
    //
    // }
    //
    // createRouterFromController


}