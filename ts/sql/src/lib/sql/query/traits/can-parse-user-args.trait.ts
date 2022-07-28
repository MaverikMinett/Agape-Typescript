import { Syntax, SqlToken } from "../../abstract";
import { SqlColumn } from "../../column";
import { SqlLiteral } from "../../literal";
import { SqlValueNumber } from "../../value/number";
import { HasFields } from "./has-fields.trait";

/**
 * 
 */
// requires ( HasFields )
export interface CanParseUserArgs extends HasFields { }
export class CanParseUserArgs {
   
    protected argsToSqlObjects( ...args:Array<Syntax|number|string|null|undefined> ):SqlToken[] {
        return args.map( arg => {
            if ( arg === undefined || arg === null ) return arg as any;
            if ( typeof arg === 'number' ) return new SqlValueNumber(arg);
            if ( arg instanceof Syntax ) return arg;

            // replace backtick quoted items with SQL Literal objects
            const match = arg.match(/^`(.*)`$/)
            if ( match ) {
                return new SqlLiteral( match[1] )
            }

            // otherwise assume it is a column name
            return new SqlColumn(arg)
        })
    }

}