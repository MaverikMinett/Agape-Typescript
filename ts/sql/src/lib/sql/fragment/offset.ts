import { Sql } from "../abstract";



export class Offset extends Sql {

    constructor( public offset:number ) {
        super()
    }

    sql() {
        return `OFFSET ${this.offset}`;
    }
    
}
