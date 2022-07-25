import { include } from "@agape/object";
import { SqlTable } from "../../table";
import { Query } from "../abstract";
import { HasOffsetClause } from "./has-offset-clause.trait";

interface QueryWithOffsetClause extends HasOffsetClause { };
@include( HasOffsetClause )
class QueryWithOffsetClause extends Query { }


describe('HasOffsetClause', () => {

    let t:SqlTable
    let q:QueryWithOffsetClause
    
    beforeEach( () => {
        t = new SqlTable('foo')
        q = new QueryWithOffsetClause(t)
    })


    describe('offset', () => {

        it('should accept a number', () => {
            expect( q.offset(50)).toBeTruthy()
        })
        it('should return the query', () => {
            expect( q.offset(50) ).toBe(q)
        })
    })

    describe('offsetClause', () => {

        it('should generate the correct offset clause', () => {
            q.offset(50)
            expect(q.offsetClause()).toEqual('OFFSET 50')
        })
    })
})