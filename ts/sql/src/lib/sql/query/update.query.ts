import { include } from "@agape/object";
import { Query } from "./abstract";
import { HasWhereClause } from "./traits/has-where-clause.trait";

/** Update */
export interface UpdateQuery extends HasWhereClause { }
@include(HasWhereClause)
export class UpdateQuery extends Query {

}
