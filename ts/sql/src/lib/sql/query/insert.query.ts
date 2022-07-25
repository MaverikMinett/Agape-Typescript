import { include } from "@agape/object";
import { Query } from "./abstract";
import { HasFields } from "./traits/has-fields.trait";

export interface InsertQuery extends HasFields { }
@include( HasFields )
export class InsertQuery extends Query {

    sql() {
        let sql = `INSERT INTO ${this.table.name} ( `

        sql += this._fields.join(', ')

        sql += ' ) VALUES ( '

        sql += this._fields.map( f => '?' ).join(', ')

        sql += ' )'

        return sql
    }
}