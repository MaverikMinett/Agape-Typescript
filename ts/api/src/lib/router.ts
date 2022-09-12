import { Request, Response, Router as ExpressRouter } from 'express';
import { ApiController } from './controllers/api.controller';

class Route<T extends ApiController> {

    constructor(
        public controller: T,
        public method: string,
        public path: string,
        public action: string ) { }

    async dispatcher( request: Request, response: Response ) {
        response.send(await (this.controller as any)[this.action]( request, response ))
    }

    apply( expressRouter: ExpressRouter ) {
        (expressRouter as any)[this.method](this.path, async ( request: Request, response: Response ) => {
            return this.dispatcher( request, response )
        } )
    }
}

export class Router<T extends ApiController> {

    express = ExpressRouter()

    routes: Array<Route<T>> = []

    constructor( public controller: T, public path?: string ) {

    }

    addRoute( method: string, path: string, action: keyof T ) {
        // TODO: action as string?
        const fullPath = this.path ? [this.path, path].join("/") : path
        const route = new Route( this.controller, method, fullPath, action as string )
        this.routes.push( route )
        route.apply( this.express )
    }

}
