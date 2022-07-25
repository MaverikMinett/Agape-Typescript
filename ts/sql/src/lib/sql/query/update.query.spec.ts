import { SqlTable } from "../table"
import { UpdateQuery } from "./update.query"

describe('UpdateQuery', () => {

    let t:SqlTable
    let q:UpdateQuery
    let a:any

    beforeEach( () => {
        t = new SqlTable('foo')
        q = new UpdateQuery(t)
    })

    it('should instantiate', () => {
        expect(q).toBeTruthy()
    })

    describe('sql', () => {
        it('should generate an sql statement', () => {
            q.fields('foo','bar','baz')
            expect(q.sql()).toEqual('UPDATE foo SET foo = ?, bar = ?, baz = ?')
        })
        it('should generate an sql statement with where clause', () => {
            q.fields('foo','bar','baz').where('foo','=','bar')
            expect(q.sql()).toEqual('UPDATE foo SET foo = ?, bar = ?, baz = ? WHERE foo = bar')
        })
    })

})