import { include } from "@agape/object";
import { Query } from "./abstract";
import { CanParseUserArgs } from "./traits/can-parse-user-args.trait";
import { HasFields } from "./traits/has-fields.trait";
import { HasWhereClause } from "./traits/has-where-clause.trait";

/** Delete */
export interface DeleteQuery extends CanParseUserArgs, HasFields, HasWhereClause { }
@include(CanParseUserArgs, HasFields, HasWhereClause)
export class DeleteQuery extends Query {

    sql() {
        let sql = `DELETE FROM ${this.table.name}`

        if ( this.whereElements?.length ) sql += ' ' +  this.whereClause()

        return sql
    }

}


