import { SqlTable } from "../table"
import { DeleteQuery } from "./delete.query"

describe('DeleteQuery', () => {

    let t:SqlTable
    let q:DeleteQuery
    let a:any

    beforeEach( () => {
        t = new SqlTable('foo')
        q = new DeleteQuery(t)
    })

    it('should instantiate', () => {
        expect(q).toBeTruthy()
    })

    describe('sql', () => {
        it('should generate an sql statement', () => {
            expect(q.sql()).toEqual('DELETE FROM foo')
        })
        it('should generate an sql statement with where clause', () => {
            q.where('foo','=','bar')
            expect(q.sql()).toEqual('DELETE FROM foo WHERE foo = bar')
        })
    })

})