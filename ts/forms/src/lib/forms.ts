
import { pluralize, tokenize } from "@agape/string";

export function shadow( callback: any ) {
    // return function () {

    // }
}

export class Form {

    
}

export class FormGroup {

}

export class FormField {
    name: string;

    @shadow( o => o.name )
    plural: string;


}




export class PurchaseTicketsForm {




}


export class TicketOrder {
    @Field name: string
    @Field address: string
    @Field ticketTier: 
}


