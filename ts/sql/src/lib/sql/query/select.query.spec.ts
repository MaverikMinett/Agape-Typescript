import { SqlColumn } from "../column"
import { SqlTable } from "../table"
import { SelectQuery } from "./select.query"

import * as test from "../../sql/fragment/where/comparison"

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


    describe('where', () => {

        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            a = q
        })

        describe('comparison', () => {

            it('should parse the user arguments to sql objects', () => {
                spyOn(a,'argsToSqlObjects').and.callThrough()
                q.where(`foo`,'=','bar')
                expect(a.argsToSqlObjects).toHaveBeenCalledWith('foo','bar')
            })

            it('should create a where comparison with the sql objects', () => {
                const orig = test.WhereComparison;

                spyOn(test,'WhereComparison').and.callThrough()

                const [o1,o2] = [new SqlColumn('foo'), new SqlColumn('bar')]

                spyOn(a,'argsToSqlObjects').and.returnValue([o1,o2])

                q.where(`foo`,'=','bar')

                expect(test.WhereComparison).toHaveBeenCalledWith(o1,'=',o2)

                Object.defineProperty(test, 'WhereComparison', {
                    value: orig,
                    writable: true
                })
            })

            it('should add a where comparison element', () => {

                const [o1,o2] = [new SqlColumn('foo'), new SqlColumn('bar')]

                const orig = test.WhereComparison;

                const fake = new orig(o1,'=',o2)

                spyOn(test,'WhereComparison').and.returnValue(fake)

                spyOn(a,'addWhereElement')

                q.where(`foo`,'=','bar')

                expect(a.addWhereElement).toHaveBeenCalledWith(fake)

                Object.defineProperty(test, 'WhereComparison', {
                    value: orig,
                    writable: true
                })
            })

        })

    })

    describe('and', () => {

        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            a = q
        })

        it('should return the query', () => {
            q.where('foo','=','bar')
            const v = q.and()
            expect( v === q ).toBeTrue()
        })

        it('should be ok after a comparison', () => {
            const v = q.where('foo','=','bar')
            expect( q.and() ).toBeTruthy()
        })

        it('should be ok after a close paren', () => {
            q.groupStart()
            q.where('foo','=','bar')
            q.groupEnd()
            expect( q.and() ).toBeTruthy()
        })

        it('should throw an error if no where elements', () => {
            expect( () => q.and() ).toThrowError()
        })
        it('should throw an error if after an open paren', () => {
            q.groupStart()
            expect( () => q.and() ).toThrowError()
        })
        it('should throw an error after or', () => {
            q.where('foo','=','bar')
            q.or()
            expect( () => q.and() ).toThrowError()
        })
        it('should throw an error after xor', () => {
            q.where('foo','=','bar')
            q.xor()
            expect( () => q.and() ).toThrowError()

        })
        it('should throw an error after not', () => {
            q.where('foo','=','bar')
            q.not()
            expect( () => q.and() ).toThrowError()
        })
        it('should throw an error after and', () => {
            q.where('foo','=','bar')
            q.and()
            expect( () => q.and() ).toThrowError()
        })
        it('should accept arguments', () => {
            q.where('foo','=','bar')
            q.and('baz','=','biz')
        })
    })

    describe('or', () => {

        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            a = q
        })

        it('should return the query', () => {
            q.where('foo','=','bar')
            const v = q.or()
            expect( v === q ).toBeTrue()
        })

        it('should be ok after a comparison', () => {
            const v = q.where('foo','=','bar')
            expect( q.or() ).toBeTruthy()
        })

        it('should be ok after a close paren', () => {
            q.groupStart()
            q.where('foo','=','bar')
            q.groupEnd()
            expect( q.or() ).toBeTruthy()
        })

        it('should throw an error if no where elements', () => {
            expect( () => q.or() ).toThrowError()
        })
        it('should throw an error if after an open paren', () => {
            q.groupStart()
            expect( () => q.or() ).toThrowError()
        })
        it('should throw an error after or', () => {
            q.where('foo','=','bar')
            q.or()
            expect( () => q.or() ).toThrowError()
        })
        it('should throw an error after xor', () => {
            q.where('foo','=','bar')
            q.xor()
            expect( () => q.or() ).toThrowError()

        })
        it('should throw an error after not', () => {
            q.where('foo','=','bar')
            q.not()
            expect( () => q.or() ).toThrowError()
        })
        it('should throw an error after and', () => {
            q.where('foo','=','bar')
            q.and()
            expect( () => q.or() ).toThrowError()
        })
        it('should accept arguments', () => {
            q.where('foo','=','bar')
            q.or('baz','=','biz')
        })

    })

    describe('xor', () => {

        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            a = q
        })

        it('should return the query', () => {
            q.where('foo','=','bar')
            const v = q.xor()
            expect( v === q ).toBeTrue()
        })

        it('should be ok after a comparison', () => {
            const v = q.where('foo','=','bar')
            expect( q.xor() ).toBeTruthy()
        })

        it('should be ok after a close paren', () => {
            q.groupStart()
            q.where('foo','=','bar')
            q.groupEnd()
            expect( q.xor() ).toBeTruthy()
        })

        it('should throw an error if no where elements', () => {
            expect( () => q.xor() ).toThrowError()
        })
        it('should throw an error if after an open paren', () => {
            q.groupStart()
            expect( () => q.xor() ).toThrowError()
        })
        it('should throw an error after or', () => {
            q.where('foo','=','bar')
            q.or()
            expect( () => q.xor() ).toThrowError()
        })
        it('should throw an error after xor', () => {
            q.where('foo','=','bar')
            q.xor()
            expect( () => q.xor() ).toThrowError()

        })
        it('should throw an error after not', () => {
            q.where('foo','=','bar')
            q.not()
            expect( () => q.or() ).toThrowError()
        })
        it('should throw an error after and', () => {
            q.where('foo','=','bar')
            q.and()
            expect( () => q.or() ).toThrowError()
        })

        it('should accept arguments', () => {
            q.where('foo','=','bar')
            q.xor('baz','=','biz')
        })

    })

    describe('not', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            a = q
        })

        it('should return the query', () => {
            q.where('foo','=','bar')
            const v = q.not()
            expect( v === q ).toBeTrue()
        })

        it('should be ok after a comparison', () => {
            const v = q.where('foo','=','bar')
            expect( q.not() ).toBeTruthy()
        })

        it('should be ok after a close paren', () => {
            q.groupStart()
            q.where('foo','=','bar')
            q.groupEnd()
            expect( q.not() ).toBeTruthy()
        })
        it('should be ok if there are no where elements', () => {
            expect( q.not() ).toBeTruthy()
        })
        it('should be ok after an open paren', () => {
            q.groupStart()
            expect( q.not() ).toBeTruthy()
        })
        it('should be ok after or', () => {
            q.where('foo','=','bar')
            q.or()
            expect( q.not() ).toBeTruthy()
        })
        it('should be ok xor', () => {
            q.where('foo','=','bar')
            q.xor()
            expect( q.not() ).toBeTruthy()
        })
        it('should throw an error after not', () => {
            q.where('foo','=','bar')
            q.not()
            expect( () => q.not() ).toThrowError()
        })
        it('should be ok after and', () => {
            q.where('foo','=','bar')
            q.and()
            expect( q.not() ).toBeTruthy()
        })

        it('should accept arguments', () => {
            q.where('foo','=','bar')
            q.not('baz','=','biz')
        })
    })



    describe('whereClause', () => {

        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })

        it('should return an empty string', () => {
            expect(q.whereClause()).toEqual('')
        })

        it('should return a where clause for a comparison', () => {
            q.where('foo','=','bar')
            expect(q.whereClause()).toEqual('WHERE foo = bar')
        })

        it('should return a where clause with an "and" operator', () => {
            q.where('foo','=','bar')
            q.and()
            q.where('baz','=',6)
            expect(q.whereClause()).toEqual('WHERE foo = bar AND baz = 6')
        })
        it('should return a where clause with an "or" operator', () => {
            q.where('foo','=','bar')
             .or()
             .where('baz','=',6)
            expect(q.whereClause()).toEqual('WHERE foo = bar OR baz = 6')
        })
        it('should return a where clause with an "xor" operator', () => {
            q.where('foo','=','bar')
            q.xor()
            q.where('baz','=',6)
            expect(q.whereClause()).toEqual('WHERE foo = bar XOR baz = 6')
        })
        it('should return a where clause with an "not" operator', () => {
            q.where('foo','=','bar')
            q.not()
            q.where('baz','=',6)
            expect(q.whereClause()).toEqual('WHERE foo = bar AND NOT baz = 6')
        })

        it('should return a where clause with a group', () => {
            q.where('foo','=','bar')
            q.not()
            q.groupStart()
                q.where('baz','=',6)
                q.or()
                q.where('baz','=',9)
            q.groupEnd()

            expect(q.whereClause()).toEqual('WHERE foo = bar AND NOT ( baz = 6 OR baz = 9 )')
        })
    })


    describe('query', () => {
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


    describe('orderBy', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            q.fields('*')
        })

        it('should parse the token as a user arg', () => {
            spyOn(q as any,'argsToSqlObjects').and.callThrough()
            const a = 'foo'
            q.orderBy(a)
            expect( (q as any).argsToSqlObjects).toHaveBeenCalledWith(a)
        })
        it('should return the query', () => {
            expect( q.orderBy('foo') ).toBe(q)
        })

        it('should order by a column in asc', () => {
            expect( q.orderBy('foo','asc') ).toBeTruthy()
        })
        it('should order by a column in desc', () => {
            expect( q.orderBy('foo','asc') ).toBeTruthy()
        })
        it('should order by multiple columns', () => {
            expect( q.orderBy('foo').orderBy('bar') ).toBeTruthy()
        })
        xit('should order by a function in asc', () => {

        })
        xit('should order by a function in desc', () => {

        })
    })

    describe('orderByClause', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
            q.fields('*')
        })
        it('should generate the correct order by clause', () => {
            q.orderBy('foo','asc')
            expect(q.orderByClause()).toEqual('ORDER BY foo ASC')
        })
        it('should generate correct order by clause for multiple elements', () => {
            q.orderBy('foo','asc').orderBy('bar','desc')
            expect(q.orderByClause()).toEqual('ORDER BY foo ASC, bar DESC')
        })
    })


    describe('limit', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })
        it('should accept a number', () => {
            expect( q.limit(50)).toBeTruthy()
        })
        it('should return the query', () => {
            expect( q.limit(50) ).toBe(q)
        })
    })

    describe('limitClause', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })
        it('should generate the correct limit clause', () => {
            q.limit(50)
            expect(q.limitClause()).toEqual('LIMIT 50')
        })
    })


    describe('offset', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })
        it('should accept a number', () => {
            expect( q.offset(50)).toBeTruthy()
        })
        it('should return the query', () => {
            expect( q.offset(50) ).toBe(q)
        })
    })

    describe('offsetClause', () => {
        beforeEach( () => {
            t = new SqlTable('foo')
            q = new SelectQuery(t)
        })
        it('should generate the correct offset clause', () => {
            q.offset(50)
            expect(q.offsetClause()).toEqual('OFFSET 50')
        })
    })

})