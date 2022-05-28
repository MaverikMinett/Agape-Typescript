
export class Field {

    constructor()
    constructor( name: string )
    constructor( name: string, type: string )
    constructor( name: string, type: string, params: Partial<Pick<Field, keyof Field>> )
	constructor( params: Partial<Pick<Field, keyof Field>> )
    constructor( ...args:any[] ) {
		if ( args.length && typeof args[0] === 'string' ) {
            let [ name, type, params={} ] = args
            params = { name, type, ...params }
            Object.assign(this, params)
        }
        else {
            let [ params ] = args;
            params && Object.assign(this,params)
        }
	}

	name?: string;
	token?: string;
	label?: string;
	description?: string;
	defaultValue?: any;
	required?: boolean;
	choices?: any[];
	widget?: string;
	type?: string;
}

export class FieldSet {
	_fields: Field[];
}
