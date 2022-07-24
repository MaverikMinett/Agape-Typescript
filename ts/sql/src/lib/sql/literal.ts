
import { SqlToken } from "./abstract";

export class SqlLiteral extends SqlToken {
    constructor ( public value:string ) { 
        super()
    }

    sql() {
        return this.value;
    }
}