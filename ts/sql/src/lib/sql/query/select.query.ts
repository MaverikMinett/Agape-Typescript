import { include } from "@agape/object"
import { Query } from "./abstract"
import { CanParseUserArgs } from "./traits/can-parse-user-args.trait"
import { HasFields } from "./traits/has-fields.trait"
import { HasWhereClause } from "./traits/has-where-clause.trait"

/** Select */
export interface SelectQuery extends HasFields, HasWhereClause, CanParseUserArgs { }
@include( HasFields, HasWhereClause, CanParseUserArgs )
export class SelectQuery extends Query {

    get sql() {
        let sql = `SELECT `
        sql += this._fields.join(', ')
        sql += ` FROM ${this.table.name}`
        return sql
    }

}
