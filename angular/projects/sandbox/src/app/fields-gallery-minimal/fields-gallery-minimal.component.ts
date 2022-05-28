import { Component, OnInit } from '@angular/core';
import { Field } from 'projects/agape/material/src/public-api';


class Foo {
  fooString:string;
  fooInteger:number;
  fooBoolean:boolean;
  fooDecimal:number;

}


@Component({
  selector: 'app-fields-gallery-minimal',
  templateUrl: './fields-gallery-minimal.component.html',
  styleUrls: ['./fields-gallery-minimal.component.scss']
})
export class FieldsGalleryMinimalComponent  {

  item = new Foo()

  fields = {
    'string': new Field({ name: 'fooString' }),
    'integer': new Field({ name: 'fooInteger', type: 'integer'}),
    'decimal': new Field({ name: 'fooDecimal', type: 'decimal'}),
    'boolean': new Field({ name: 'fooBoolean', type: 'boolean'}),
    'select': new Field({ 
      name: 'fooSelect', 
      type: 'string',
      widget: 'select',
      choices: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ]
    })
  }


}
