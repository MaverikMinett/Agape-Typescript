/* tslint:disable:component-selector */
import {Component, Input} from '@angular/core';
import {Class} from '@agape/object';
import { Field } from '../models';


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



