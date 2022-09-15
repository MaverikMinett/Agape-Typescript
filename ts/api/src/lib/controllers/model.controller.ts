import { Class } from '../../../../object/src';
import { $model, Model, ModelDescriptor } from '../../../../model/src';
import { Orm } from '../../../../orm/src'
import { Request, Response } from 'express';
import { ApiController } from './api.controller';
import { Router } from '../router';

import { Get } from '../decorators/get'
import { Controller } from '../decorators/controller';
import { Description} from '../decorators/description';
import { Status } from '../decorators/status';
import { Put } from '../decorators/put';
import { Post } from '../decorators/post';
import { Delete } from '../decorators/delete';

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
    @Description( (controller:ModelController<T>, action) => {
        const model = Model.descriptor(controller.model)
        return `Create ${model.label.toLowerCase()}`
    })
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
    @Description( (controller:ModelController<T>, action) => {
        const model = Model.descriptor(controller.model)
        return `Delete ${model.label.toLowerCase()}`
    })
    async delete( request: Request, response: Response ) {
        const id: string = request.params.id;
        const deletedCount = await this.orm.delete(this.model, id).exec()
        deletedCount ? response.status(201) : response.status(404)
        return ""
    }

    @Get()
    @Description( (controller:ModelController<T>, action) => {
        const model = Model.descriptor(controller.model)
        return `List ${model.plural.toLowerCase()}`
    })
    async list( request: Request, response: Response ) {
        const items = await this.orm.list(this.model).exec()
        return items
    }

    @Put(':id')
    @Description( (controller:ModelController<T>, action) => {
        const model = Model.descriptor(controller.model)
        return `Update ${model.label.toLowerCase()}`
    })
    async update( request: Request, response: Response ) {
        const id: string = request.params.id;
        const item: Pick<T, keyof T> = request.body;
        console.log('API Update', id, item)
        // TODO: VALIDATE ITEM
        const result = await this.orm.update(this.model, id, item).exec()
        response.status(201)
    }

    @Get(':id') @Status(200)
    @Description( (controller:ModelController<T>, action) => {
        const model = Model.descriptor(controller.model)
        return `Retrieve ${model.label.toLowerCase()}`
    })
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