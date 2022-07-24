import { Sql } from "../abstract";



export class Limit extends Sql {

    constructor( public limit:number ) {
        super()
    }

    sql() {
        return `LIMIT ${this.limit}`;
    }
}
