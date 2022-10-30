export abstract class ComponentDescriptor {

    name?: string;

    description?: string;

    symbol: string;

    constructor( public target: any ) {

    }

}
