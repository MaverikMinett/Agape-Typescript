import { OrderByDirection } from "../../types";
import { Sql, SqlToken } from "../abstract";


export class OrderBy extends Sql {

    constructor( public column:SqlToken, public direction:OrderByDirection='asc' ) {
        super()
    }

    sql() {
        return `${this.column.sql()} ${this.direction.toUpperCase()}`
    }

}