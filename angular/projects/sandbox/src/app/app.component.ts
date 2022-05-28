import { Component } from '@angular/core';
import { FieldSet } from 'projects/agape/material/src/public-api';
import { Field } from 'projects/agape/material/src/public-api';


class Foo {
  foo:string;
}


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'sandbox';


}
