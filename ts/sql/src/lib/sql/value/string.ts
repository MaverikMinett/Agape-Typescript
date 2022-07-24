
import { SqlValue } from '../abstract';

export class SqlValueString extends SqlValue {

    constructor( public value:string ) {
        super()
    }

    sql() {
        const sanitized = this.value.replace('"','\\"')
        return `"${sanitized}"`
    }
}