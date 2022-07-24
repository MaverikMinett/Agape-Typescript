import { include } from "@agape/object";
import { Query } from "./abstract";
import { HasWhereClause } from "./traits/has-where-clause.trait";

/** Delete */
export interface DeleteQuery extends HasWhereClause { }
@include(HasWhereClause)
export class DeleteQuery extends Query {

}
