import { BooleanOperator } from "../../../types"
import { Syntax } from "../../abstract"

/**
 * Where Boolean: and, not, or, xor
 */
export class WhereBoolean extends Syntax {
    
    // and not or xor
    constructor( public operator:BooleanOperator ) {
        super()
    }

    sql() {
        return this.operator.toUpperCase()
    }

}