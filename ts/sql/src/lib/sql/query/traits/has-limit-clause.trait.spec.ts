import { include } from "@agape/object";
import { SqlTable } from "../../table";
import { Query } from "../abstract";
import { HasLimitClause } from "./has-limit-clause.trait";

interface QueryWithLimitClause extends HasLimitClause { };
@include( HasLimitClause )
class QueryWithLimitClause extends Query { }


describe('HasLimitClause', () => {

    let t:SqlTable
    let q:QueryWithLimitClause
    
    beforeEach( () => {
        t = new SqlTable('foo')
        q = new QueryWithLimitClause(t)
    })

    describe('limit', () => {
        it('should accept a number', () => {
            expect( q.limit(50)).toBeTruthy()
        })
        it('should return the query', () => {
            expect( q.limit(50) ).toBe(q)
        })
    })

    describe('limitClause', () => {
        it('should generate the correct limit clause', () => {
            q.limit(50)
            expect(q.limitClause()).toEqual('LIMIT 50')
        })
    })

})