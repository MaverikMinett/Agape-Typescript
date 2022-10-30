import { OperationDescriptor } from './operation';
import { ComponentDescriptor } from './component';


/**
 * Describe a backend service
 */
export class BackendDescriptor extends ComponentDescriptor {

    operations: Map<string, OperationDescriptor> = new Map()

    operation( name: string ) {
        let operation = this.operations.get(name)
        if ( ! operation ) {
            console.log(`Creating action ${name}`)
            operation = new OperationDescriptor( name )
            this.operations.set(name, operation)
        }
        return operation
    }

}
