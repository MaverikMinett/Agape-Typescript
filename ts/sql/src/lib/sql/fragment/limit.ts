import { Syntax } from "../abstract";



export class Limit extends Syntax {

    constructor( public limit:number ) {
        super()
    }

    sql() {
        return `LIMIT ${this.limit}`;
    }
}
