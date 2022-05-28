
import { tokenize, verbalize } from '@agape/string';

export class Field {

    constructor()
    constructor( name: string )
    constructor( name: string, type: string )
    constructor( name: string, type: string, params: Partial<Pick<Field, keyof Field>> )
	constructor( params: Partial<Pick<Field, keyof Field>> )
    constructor( ...args:any[] ) {
        let params:Partial<Pick<Field, keyof Field>>

		if ( args.length && typeof args[0] === 'string' ) {
            const [ name, type, _params={} ] = args
            params = { name, type, ..._params }
        }
        else {
            params = args[0] ? {...args[0]} : {}
        }
        
        // if ( ! params.name ) {
        //     throw new Error("Field must have a name")    
        // }

        params.name  ??= "";
        params.label ??= verbalize(params.name);
        params.token ??= tokenize(params.name);

        if ( ! params.type ) {
            params.type = "string"
        }

        if ( ! params.widget ) {
            switch (params.type) {
                case "date":
                    params.widget = "date";
                    break;
                case "boolean":
                    params.widget = "checkbox";
                    break;
                default:
                    params.widget = "input";
            }
        }

        params && Object.assign(this,params)
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
