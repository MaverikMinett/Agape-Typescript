import { OrderByDirection } from "../../types";
import { SqlToken, Syntax } from "../abstract";


export class OrderBy extends Syntax {

    constructor( public column:SqlToken, public direction:OrderByDirection='asc' ) {
        super()
    }

    sql() {
        return `${this.column.sql()} ${this.direction.toUpperCase()}`
    }

}