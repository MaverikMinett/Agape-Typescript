import * as insert_statement_module from "./sql/query/insert.query"
import { InsertQuery } from "./sql/query/insert.query"
import * as select_statement_module from "./sql/query/select.query"
import { SelectQuery } from "./sql/query/select.query"
import * as update_statement_module from "./sql/query/update.query"
import { UpdateQuery } from "./sql/query/update.query"
import * as delete_statement_module from "./sql/query/delete.query"
import { DeleteQuery } from "./sql/query/delete.query"
import { SqlTable } from "./sql/table"
import { TableCursor } from "./table-cursor"

describe('TableCursor', () => {

    let t:SqlTable
    let c:TableCursor
    
    beforeEach( () => {
        t = new SqlTable('foo')
        c = new TableCursor( t )
    })

    it('should instantiate', () => {
        expect(c).toBeTruthy()
    })
    describe('select', () => {
        const orig = SelectQuery;
        afterEach( () => {
            Object.defineProperty(select_statement_module, 'SelectQuery', {
                value: orig,
                writable: true
            } )
        })
        it('should create select statement', () => {
            const q = c.select()
            expect(q).toBeInstanceOf(SelectQuery)
        })
        it('should create a statement with fields', () => {
            const fieldNames = ['foo','bar','baz']
            const mockStatement = c.select()
            spyOn(select_statement_module, 'SelectQuery').and.returnValue(mockStatement)
            spyOn(mockStatement,'fields')

            const q = c.select(...fieldNames)
            expect(mockStatement.fields).toHaveBeenCalledWith(...fieldNames)
        })
    })
    describe('insert', () => {
        const orig = InsertQuery;
        afterEach( () => {
            Object.defineProperty(insert_statement_module, 'InsertQuery', {
                value: orig,
                writable: true
            } )
        })
        it('should create insert statement', () => {
            const q = c.insert()
            expect(q).toBeInstanceOf(InsertQuery)
        })
        it('should create a statement with fields', () => {
            const fieldNames = ['foo','bar','baz']
            const mockStatement = c.insert()
            spyOn(insert_statement_module, 'InsertQuery').and.returnValue(mockStatement)
            spyOn(mockStatement,'fields')

            const q = c.insert(...fieldNames)
            expect(mockStatement.fields).toHaveBeenCalledWith(...fieldNames)
        })
    })
    describe('update', () => {
        const orig = UpdateQuery;
        afterEach( () => {
            Object.defineProperty(update_statement_module, 'UpdateQuery', {
                value: orig,
                writable: true
            } )
        })
        it('should create update statement', () => {
            const q = c.update()
            expect(q).toBeInstanceOf(UpdateQuery)
        })
        it('should create a statement with fields', () => {
            const fieldNames = ['foo','bar','baz']
            const mockStatement = c.update()
            spyOn(update_statement_module, 'UpdateQuery').and.returnValue(mockStatement)
            spyOn(mockStatement,'fields')

            const q = c.update(...fieldNames)
            expect(mockStatement.fields).toHaveBeenCalledWith(...fieldNames)
        })
    })
    describe('delete', () => {
        const orig = DeleteQuery;
        afterEach( () => {
            Object.defineProperty(delete_statement_module, 'DeleteQuery', {
                value: orig,
                writable: true
            } )
        })
        it('should create delete statement', () => {
            const q = c.delete()
            expect(q).toBeInstanceOf(DeleteQuery)
        })
    })

})