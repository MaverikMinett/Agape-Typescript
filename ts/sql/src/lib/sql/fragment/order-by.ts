import { OrderByDirection } from "../../types";
import { Sql } from "../abstract";
import { SqlColumn } from "../column";


export class OrderBy extends Sql {

    constructor( public column:SqlColumn, public direction:OrderByDirection='asc' ) {
        super()
    }

    sql() {
        return `${this.column.sql()} ${this.direction.toUpperCase()}`
    }

}