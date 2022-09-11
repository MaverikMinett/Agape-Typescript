import { Class } from '@agape/object';
import { Orm } from '../../../orm/src';
import { $model, ModelDescriptor } from '../../../model/src';
import { Router as ExpressRouter, Application as ExpressApplication, Request, Response } from 'express';

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

class Route<T extends Controller> {

    constructor(
        public controller: T,
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

class Router<T extends Controller> {

    express = ExpressRouter()

    constructor( public controller: T ) {

    }

    addRoute( method: string, path: string, action: keyof T ) {
        // TODO: action as string?
        const route = new Route( this.controller, method, path, action as string )
        route.apply( this.express )
    }

}

export class Controller {

}

class ModelController<T extends Class> extends Controller {

    router: Router<ModelController<T>>

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

    async delete( request: Request, response: Response ) {
        const id: string = request.params.id;
        const deletedCount = await this.orm.delete(this.model, id).exec()
        deletedCount ? response.status(201) : response.status(404)
        return ""
    }

    async list( request: Request, response: Response ) {
        const items = await this.orm.list(this.model).exec()
        return items
    }

    async update( request: Request, response: Response ) {
        const id: string = request.params.id;
        const item: Pick<T, keyof T> = request.body;
        console.log('API Update', id, item)
        // TODO: VALIDATE ITEM
        const result = await this.orm.update(this.model, id, item).exec()
        console.log(result)
        response.status(201)
    }

    async retrieve( request: Request, response: Response ) {
        const id: string = request.params.id
        const item = await this.orm.retrieve(this.model, id).exec()
        if ( ! item ) {
            response.status(404)
            throw new Error("404 item not found")
        }
        console.log("Retrieved item", item)
        response.status(200)
        return item
    }

    registerRoutes( ) {

        this.router.addRoute( 'get', `/${this.modelDescriptor.tokens}/:id`, 'retrieve' )

        this.router.addRoute( 'delete', `/${this.modelDescriptor.tokens}/:id`, 'delete')

        this.router.addRoute( 'put', `/${this.modelDescriptor.tokens}/:id`, 'update')

        this.router.addRoute( 'get', `/${this.modelDescriptor.tokens}`, 'list' )

        this.router.addRoute( 'post', `/${this.modelDescriptor.tokens}`, 'create' )

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

}