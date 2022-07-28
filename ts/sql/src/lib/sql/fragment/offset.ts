import { Syntax } from "../abstract";



export class Offset extends Syntax {

    constructor( public offset:number ) {
        super()
    }

    sql() {
        return `OFFSET ${this.offset}`;
    }
    
}
