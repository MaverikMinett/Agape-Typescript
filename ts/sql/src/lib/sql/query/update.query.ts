import { include } from "@agape/object";
import { Query } from "./abstract";
import { CanParseUserArgs } from "./traits/can-parse-user-args.trait";
import { HasFields } from "./traits/has-fields.trait";
import { HasWhereClause } from "./traits/has-where-clause.trait";

/** Update */
export interface UpdateQuery  extends CanParseUserArgs, HasFields, HasWhereClause { }
@include(CanParseUserArgs, HasFields, HasWhereClause)
export class UpdateQuery extends Query {

    sql() {
        
        let sql = `UPDATE ${this.table.name} SET `

        sql += this._fields.map( field => `${field} = ?` ).join(', ')

        if ( this.whereElements?.length ) sql += ' ' +  this.whereClause()

        return sql
    }

}
