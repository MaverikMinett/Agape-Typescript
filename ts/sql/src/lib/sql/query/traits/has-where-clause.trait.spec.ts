import { include } from "@agape/object";
import { SqlTable } from "../../table";
import { Query } from "../abstract";
import { CanParseUserArgs } from "./can-parse-user-args.trait";
import { HasFields } from "./has-fields.trait";
import { HasWhereClause } from "./has-where-clause.trait";

import * as test from "../../fragment/where/comparison"
import { SqlColumn } from "../../column";

interface QueryWithWhereClause extends CanParseUserArgs, HasFields, HasWhereClause { };
@include( CanParseUserArgs, HasFields, HasWhereClause )
class QueryWithWhereClause extends Query { }


describe('HasWhereClause', () => {

    let t:SqlTable
    let q:QueryWithWhereClause
    let a:any
    
    beforeEach( () => {
        t = new SqlTable('foo')
        q = new QueryWithWhereClause(t)
        a = q
    })

    describe('where', () => {

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


})