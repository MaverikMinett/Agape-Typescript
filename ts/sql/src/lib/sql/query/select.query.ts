import { include } from "@agape/object"
import { Limit } from "../fragment/limit"
import { Query } from "./abstract"
import { CanParseUserArgs } from "./traits/can-parse-user-args.trait"
import { HasFields } from "./traits/has-fields.trait"
import { HasLimitClause } from "./traits/has-limit-clause.trait"
import { HasOrderByClause } from "./traits/has-order-by-clause.trait"
import { HasWhereClause } from "./traits/has-where-clause.trait"

/** Select */
export interface SelectQuery 
    extends HasFields, HasWhereClause, HasLimitClause, HasOrderByClause, CanParseUserArgs { }

@include( CanParseUserArgs, HasFields, HasLimitClause, HasOrderByClause, HasWhereClause )
export class SelectQuery extends Query {

    sql() {
        let sql = `SELECT `
        sql += this._fields.join(', ')
        sql += ` FROM ${this.table.name}`

        if ( this.whereElements?.length ) sql += ' ' +  this.whereClause()
        if ( this.orderByElements?.length ) sql += ' ' + this.orderByClause()
        if ( this.limitValue !== undefined && this.limitValue !== null ) sql += ' ' + this.limitClause()

        return sql
    }

}
