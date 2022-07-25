import { SqlTable } from "../table"
import { SelectQuery } from "./select.query"

describe('SelectQuery', () => {

    let t:SqlTable
    let q:SelectQuery
    let a:any

    beforeEach( () => {
        [q,t,a] = [undefined,undefined,undefined]
    })

    it('should instantiate', () => {
        t = new SqlTable('foo')
        q = new SelectQuery(t)
        expect(q).toBeTruthy()
    })


    describe('sql', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })
        it('should generate a complete sql statement with where clause', () => {
            q.fields('*').where('foo','=','bar')
            expect(q.sql()).toEqual('SELECT * FROM foo WHERE foo = bar')
        })
        it('should generate a complete sql statement with order by clause', () => {
            q.fields('*').orderBy('foo','asc').orderBy('bar','desc')
            expect(q.sql()).toEqual('SELECT * FROM foo ORDER BY foo ASC, bar DESC')
        })
        it('should generate a complete sql statement with limit clause', () => {
            q.fields('*').limit(50)
            expect(q.sql()).toEqual('SELECT * FROM foo LIMIT 50')
        })
        it('should generate a complete sql statement with offset clause', () => {
            q.fields('*').offset(50)
            expect(q.sql()).toEqual('SELECT * FROM foo OFFSET 50')
        })
        it('should generate a complete sql statement with where and order by clauses', () => {
            q.fields('*')
                .where('foo','=','bar')
                .orderBy('foo','asc')
                .orderBy('bar','desc')

            expect(q.sql()).toEqual('SELECT * FROM foo WHERE foo = bar ORDER BY foo ASC, bar DESC')
        })
        it('should generate a complete sql statement with where and limit clauses', () => {
            q.fields('*')
                .where('foo','=','bar')
                .limit(50)

            expect(q.sql()).toEqual('SELECT * FROM foo WHERE foo = bar LIMIT 50')
        })
        it('should generate a complete sql statement with order by and limit', () => {
            q.fields('*')
                .orderBy('foo','asc')
                .orderBy('bar','desc')
                .limit(50)

            expect(q.sql()).toEqual('SELECT * FROM foo ORDER BY foo ASC, bar DESC LIMIT 50')
        })
        it('should generate a complete sql statement with where, order by, and limit', () => {
            q.fields('*')
                .where('foo','=','bar')
                .orderBy('foo','asc')
                .orderBy('bar','desc')
                .limit(50)

            expect(q.sql()).toEqual('SELECT * FROM foo WHERE foo = bar ORDER BY foo ASC, bar DESC LIMIT 50')
        })
        it('should generate a complete sql statement with where, order by, limit, offset', () => {
            q.fields('*')
                .where('foo','=','bar')
                .orderBy('foo','asc')
                .orderBy('bar','desc')
                .limit(50)
                .offset(50)

            expect(q.sql()).toEqual('SELECT * FROM foo WHERE foo = bar ORDER BY foo ASC, bar DESC LIMIT 50 OFFSET 50')
        })
    })
})