import { Class } from '../../../../object/src';
import { ResponseDescription } from '../types';

export class ResponseDescriptor {
    constructor(public model: Class, public description?: ResponseDescription, statusCode?: number ) {

    }
}
