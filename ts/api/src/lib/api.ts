import { Class } from '../../../object/src';
import { Model } from '../../../model/src';
import { Orm } from '../../../orm/src';

import { Application as ExpressApplication} from 'express';
import { ModelController } from './controllers/model.controller';
import { ApiController } from './controllers/api.controller';



export class Api {

    models: Map<Class,ModelController<any>>

    controllers: ApiController[] = []

    constructor( public app: ExpressApplication, public orm: Orm ) {

    }

    registerModel<T extends Class>( model: T ) {
        const controller = new ModelController( model, this.orm )
        controller.path = Model.descriptor(model).tokens
        this.registerController( controller )
    }

    registerController<T extends ApiController>(controller: T ) {
        this.controllers.push( controller )
        this.app.use('/api', controller.router.express )
    }

}
