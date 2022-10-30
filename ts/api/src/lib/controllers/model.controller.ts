import { Class } from '../../../../object/src';
import { $model, Model, ModelDescriptor } from '../../../../model/src';
import { Orm } from '../../../../orm/src'
import { Request, Response } from 'express';
import { ApiController } from './api.controller';
import { Router } from '../router';

import { Get } from '../decorators/controller/get'
import { Controller } from '../decorators/class/controller';
import { Description } from '../decorators/controller/description';
import { Status } from '../decorators/controller/status';
import { Put } from '../decorators/controller/put';
import { Post } from '../decorators/controller/post';
import { Delete } from '../decorators/controller/delete';

@Controller()
export class ModelController<T extends Class> extends ApiController {

    router: Router<ModelController<T>>

    modelDescriptor: ModelDescriptor

    constructor( public model: T, public orm: Orm ) {
        super()
        this.modelDescriptor = $model( this.model )
        this.registerRoutes()
    }

    @Post()
    @Description( c => `Create ${Model.descriptor(c.model).label.toLowerCase()}` )
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

    @Delete(':id')
    @Description( c => `Delete ${Model.descriptor(c.model).label.toLowerCase()}` )
    async delete( request: Request, response: Response ) {
        const id: string = request.params.id;
        const deletedCount = await this.orm.delete(this.model, id).exec()
        deletedCount ? response.status(201) : response.status(404)
        return ""
    }

    @Get()
    @Description( c => `List ${Model.descriptor(c.model).plural.toLowerCase()}` )
    async list( request: Request, response: Response ) {
        const items = await this.orm.list(this.model).exec()
        return items
    }

    @Put(':id')
    @Description( c => `Update ${Model.descriptor(c.model).label.toLowerCase()}` )
    async update( request: Request, response: Response ) {
        const id: string = request.params.id;
        const item: Pick<T, keyof T> = request.body;
        console.log('API Update', id, item)
        // TODO: VALIDATE ITEM
        const result = await this.orm.update(this.model, id, item).exec()
        response.status(201)
    }

    @Get(':id') @Status(200)
    @Description( c =>  `Retrieve ${Model.descriptor(c.model).label.toLowerCase()}`)
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
