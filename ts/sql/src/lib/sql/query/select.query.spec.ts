import { SqlColumn } from "../column"
import { SqlTable } from "../table"
import { SelectQuery } from "./select.query"

import * as test from "../../sql/fragment/where/comparison"

fdescribe('SelectQuery', () => {

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

    fdescribe('and', () => {

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
    })

    fdescribe('or', () => {

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

    })

    fdescribe('xor', () => {

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
    })



    fdescribe('whereClause', () => {

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
    })


})