/* tslint:disable:component-selector */
import {Component, Input} from '@angular/core';
import {Class} from '@agape/object';

export class Field {

	constructor( params?: Partial<Pick<Field, keyof Field>> ) {
		params && Object.assign(this, params)
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


@Component({
selector: 'ag-field-group',
templateUrl: 'field-group.component.html',
})
export class AgFieldGroup {
	@Input() model: Class;

	@Input() fields: string[];
	private _fields: Field[];

	modelToFieldSet() {
		for ( const fieldName of this.fields ) {
			// get reflect metadata
		}
	}



}



