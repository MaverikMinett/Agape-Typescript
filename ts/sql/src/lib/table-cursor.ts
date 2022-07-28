import { SelectQuery } from "./sql/query/select.query";
import { DeleteQuery } from "./sql/query/delete.query";
import { InsertQuery } from "./sql/query/insert.query";
import { UpdateQuery } from "./sql/query/update.query";
import { SqlTable } from "./sql/table";

/**
 * Utitlity class with factory methods for creating
 * SQL statements against a specified SQL table. 
 */
export class TableCursor {

    constructor( public table:SqlTable ) { }

    select( ...fields:string[] ):SelectQuery {
        const query = new SelectQuery( this.table )
        if ( fields.length ) query.fields( ...fields )
        return query
    }

    insert( ...fields:string[] ):InsertQuery {
        const query = new InsertQuery( this.table )
        if ( fields.length ) query.fields( ...fields )
        return query
    }

    update( ...fields:string[] ):UpdateQuery {
        const query = new UpdateQuery( this.table )
        if ( fields.length ) query.fields( ...fields )
        return query
    }

    delete():DeleteQuery {
        return new DeleteQuery( this.table )
    }

}