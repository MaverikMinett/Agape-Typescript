import { SqlTable } from "./sql/table"
import { TableCursor } from "./table-cursor"

/**
 * The "Root" of all SQL statements. Utitlity class with
 * a factory method for creating TableCursor objects.
 */
export class Sql {

    table( name:string ) {
        const table = new SqlTable( name )
        return new TableCursor( table )
    }

}


/**
 * Export an instance of the Sql object as the default export
 * for the package. This is intended to be used by the end
 * user as the entry point for the library.
 */
export const sql = new Sql()
export default sql