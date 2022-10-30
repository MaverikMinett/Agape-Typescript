/**
 * Describe a backend service method
 */
import { OperationDescription } from '../types';

export class OperationDescriptor {

    description?: OperationDescription

    constructor( public name: string ) {

    }
}
