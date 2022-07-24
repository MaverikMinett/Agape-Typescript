import { OrderByDirection } from "../../../types";
import { SqlToken } from "../../abstract";
import { OrderBy } from "../../fragment/order-by";
import { CanParseUserArgs } from "./can-parse-user-args.trait";


// requires ( CanParseUserArgs )
export interface HasOrderByClause extends CanParseUserArgs { }
export class HasOrderByClause {

    protected orderByElements:OrderBy[]

    orderBy( token:SqlToken|string, direction:OrderByDirection='asc' ) {
        const [o] = this.argsToSqlObjects(token as any)
        const s = new OrderBy(o, direction)
        this.orderByElements ??= []
        this.orderByElements.push(s)
        return this
    }

    orderByClause() {
        if ( ! this.orderByElements?.length ) return ""

        return 'ORDER BY ' + this.orderByElements.map( e => e.sql() ).join(', ')
    }

}