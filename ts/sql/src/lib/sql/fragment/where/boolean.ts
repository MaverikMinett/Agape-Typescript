import { BooleanOperator } from "../../../types"
import { Sql } from "../../abstract"

/**
 * Where Boolean: and, not, or, xor
 */
export class WhereBoolean extends Sql {
    
    // and not or xor
    constructor( public operator:BooleanOperator ) {
        super()
    }

    sql() {
        return this.operator.toUpperCase()
    }

}