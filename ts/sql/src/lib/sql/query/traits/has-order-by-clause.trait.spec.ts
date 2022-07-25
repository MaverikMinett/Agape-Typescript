import { include } from "@agape/object";
import { SqlTable } from "../../table";
import { Query } from "../abstract";
import { CanParseUserArgs } from "./can-parse-user-args.trait";
import { HasFields } from "./has-fields.trait";
import { HasOrderByClause } from "./has-order-by-clause.trait";

interface QueryWithOrderByClause extends CanParseUserArgs, HasFields, HasOrderByClause { };
@include( HasFields, HasOrderByClause, CanParseUserArgs )
class QueryWithOrderByClause extends Query { }


describe('HasOrderByClause', () => {

    let t:SqlTable
    let q:QueryWithOrderByClause
    
    beforeEach( () => {
        t = new SqlTable('foo')
        q = new QueryWithOrderByClause(t)
    })

    describe('orderBy', () => {

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

        it('should generate the correct order by clause', () => {
            q.orderBy('foo','asc')
            expect(q.orderByClause()).toEqual('ORDER BY foo ASC')
        })
        it('should generate correct order by clause for multiple elements', () => {
            q.orderBy('foo','asc').orderBy('bar','desc')
            expect(q.orderByClause()).toEqual('ORDER BY foo ASC, bar DESC')
        })
    })
})