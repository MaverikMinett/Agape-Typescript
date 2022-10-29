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
        this.registerControllerInstance( controller )

        // const descriptor = Controller.descriptor( controller )
    }

    // TODO: Should the controller be instantiated during initialization
    // and reused for each request? or should a new controller be instantiated
    // and thrown away for each request? If a new controller is instantiated for
    // each request then new backend service could be injected for each request,
    // which means that Authentication tokens could be injected and made available to
    // Backend services? What's the overhead?
    registerControllerInstance<T extends ApiController>(controller: T ) {
        this.controllers.push( controller )
        this.app.use('/api', controller.router.express )
    }

    registerController<T extends Class>( controller: T ) {
        const instance = this.instantiateController( controller )
        this.registerControllerInstance(instance)
    }

    protected instantiateController<T extends Class>( controller: T ) {
        const instance = new controller()
        return instance
    }

}
