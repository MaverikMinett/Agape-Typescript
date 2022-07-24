export abstract class Sql {
    abstract sql(): string 
}

/**
 * Any SQL keyword, value, operator, function, literal, symbol, value, etc
 */
export abstract class SqlToken extends Sql {
    
}

/**
 * A table or column.
 */
export abstract class SqlSymbol extends SqlToken {
    constructor( public name:string ) {
        super()
    }

    sql() {
        return this.name;
    }
}

/**
 * A literal string, boolean, or number value.
 */
export abstract class SqlValue extends SqlToken {
    abstract value: any
}

/**
 * A fragment is composed of one or more SQL tokens, values, 
 * operators, functions, or keywords.
 */
export abstract class SqlFragment extends Sql {

}