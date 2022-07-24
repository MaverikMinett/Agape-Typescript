
import { SqlValue } from '../abstract';

export class SqlValueNumber extends SqlValue {

    constructor( public value:number ) {
        super()
    }

    sql() {
        return `${this.value}`;
    }
}
