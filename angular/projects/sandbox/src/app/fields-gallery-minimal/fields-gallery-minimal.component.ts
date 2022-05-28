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
    'string': new Field('fooString'),
    'integer': new Field('fooInteger','integer'),
    'decimal': new Field('fooDecimal', 'decimal'),
    'boolean': new Field('fooBoolean', 'boolean'),
    'date': new Field('fooDate','date'),
    'text': new Field('fooText','text'),
    'select': new Field('fooSelect', 'string',
        { 
          widget: 'select',
          choices: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        }
      )
  }


}
