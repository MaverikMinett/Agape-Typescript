
import { SqlValue } from '../abstract';

export class SqlValueBoolean extends SqlValue {

    constructor( public value:boolean ) {
        super()
    }

    sql() {
        return this.value ? 'TRUE' : 'FALSE';
    }
}
