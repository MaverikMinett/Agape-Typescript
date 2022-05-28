import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatSelectModule } from "@angular/material/select";
import { AgFieldGroup } from "./components/field-group.component";
import { AgFormField } from "./components/form-field.component";
import { VERBOSE_DATE_PROVIDERS } from "../date.providers";

@NgModule({
    imports: [ 
        CommonModule, 
        FormsModule, 
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule, 
        MatSelectModule,
    ],
    declarations: [ AgFormField, AgFieldGroup ],
    exports: [ AgFieldGroup, AgFormField ],
    providers: [
        ...VERBOSE_DATE_PROVIDERS
    ]
})
export class AgFormsModule {

}