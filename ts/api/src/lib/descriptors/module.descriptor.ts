import { AspectDescriptor } from './aspect.descriptor';
import { ControllerDescriptor } from './controller';


export class ModuleDescriptor extends AspectDescriptor {

    controllers: ControllerDescriptor[] = []

    modules: ModuleDescriptor[] = []

    getControllers() {
        const controllers = [...this.controllers]

        for ( let module of this.modules ) {
            controllers.push( ...module.getControllers() )
        }

        return controllers
    }

}
