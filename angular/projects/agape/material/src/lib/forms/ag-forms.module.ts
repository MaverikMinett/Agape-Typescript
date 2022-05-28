import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { AgFieldGroup } from "./field-group.component";
import { AgFormField } from "./form-field.component";

@NgModule({
    imports: [ 
        CommonModule, 
        FormsModule, 
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule, 
        MatSelectModule 
    ],
    declarations: [ AgFormField, AgFieldGroup ],
    exports: [ AgFieldGroup, AgFormField ]
})
export class AgFormsModule {

}