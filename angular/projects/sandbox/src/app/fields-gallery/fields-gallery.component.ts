import { Component, OnInit } from '@angular/core';
import { Field } from 'projects/agape/material/src/public-api';


class Foo {
  fooString:string;
  fooInteger:number;
  fooBoolean:boolean;
  fooDecimal:number;

}


@Component({
  selector: 'app-fields-gallery',
  templateUrl: './fields-gallery.component.html',
  styleUrls: ['./fields-gallery.component.scss']
})
export class FieldsGalleryComponent  {

  item = new Foo()

  fields = {
    'string': new Field({
      name: 'fooString',
      label: 'Foo string',
      token: 'foo-string',
      widget: 'input',
      type: 'string',
    }),
    'integer': new Field({
      name: 'fooInteger',
      label: 'Foo integer',
      token: 'foo-integer',
      widget: 'input',
      type: 'integer',
    }),
    'decimal': new Field({
      name: 'fooDecimal',
      label: 'Foo decimal',
      token: 'foo-decimal',
      widget: 'input',
      type: 'string',
    }),
    'boolean': new Field({
      name: 'fooBoolean',
      label: 'Foo boolean',
      token: 'foo-boolean',
      widget: 'checkbox',
      type: 'boolean'
    }),
    'select': new Field({
      name: 'fooSelect',
      label: 'Foo select',
      token: 'foo-select',
      widget: 'select',
      type: 'string',
      choices: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ]
    }),
    'date': new Field({
      name: 'fooDate',
      label: 'Foo date',
      token: 'foo-date',
      widget: 'date',
      type: 'date'
    })
  }


}
