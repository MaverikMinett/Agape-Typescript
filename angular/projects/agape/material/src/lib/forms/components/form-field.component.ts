import { Component, ChangeDetectorRef, HostBinding, Input, ViewChild } from '@angular/core'

import { MatInput } from '@angular/material/input'

@Component({
	'selector': 'ag-form-field',
	'templateUrl': 'form-field.component.html',
})
export class AgFormField {

	@Input() public item: any
	@Input() public field: any

	@ViewChild(MatInput) formControl: MatInput

	@HostBinding('class') get class() {
	    let classes = [
	    	'ag-form-field', 
	    	this.field.type, 
	    	this.field.widget, 
	    	this.field.name 
	    ]

	    return classes.join(' ')
	}

	constructor(private changeDetector: ChangeDetectorRef) {

	}

	public focus() {
		console.log( this.formControl )
		
		if ( this.formControl ) {
			this.formControl['_elementRef'].nativeElement.focus()
			this.changeDetector.detectChanges();
		}
		
		
	}

}