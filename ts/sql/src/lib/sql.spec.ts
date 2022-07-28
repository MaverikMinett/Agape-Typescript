
import { Sql } from './sql'
import { TableCursor } from './table-cursor'


describe('Sql', () => {

    let s:Sql
    
    beforeEach( () => {
        s = new Sql()
    })

    it('should instantiate', () => {
        expect(s).toBeTruthy()
    })

    describe('table', () => {
        it('should create a table cursor object', () => {
            const c = s.table('foo')
            expect(c).toBeInstanceOf(TableCursor)
        })
        it('should reference a table with the given name', () => {
            const c = s.table('foo')
            expect(c.table.name).toBe('foo')
        })
    })
})