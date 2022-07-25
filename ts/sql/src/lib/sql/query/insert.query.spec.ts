import { SqlTable } from "../table"
import { InsertQuery } from "./insert.query"

describe('InsertQuery', () => {

    let t:SqlTable
    let q:InsertQuery
    let a:any

    beforeEach( () => {
        t = new SqlTable('foo')
        q = new InsertQuery(t)
    })

    it('should instantiate', () => {
        expect(q).toBeTruthy()
    })

    describe('sql', () => {
        it('should generate an sql statement', () => {
            q.fields('foo','bar','baz')
            expect(q.sql()).toEqual('INSERT INTO foo ( foo, bar, baz ) VALUES ( ?, ?, ? )')
        })
    })

})