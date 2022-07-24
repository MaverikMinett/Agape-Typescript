import { StandardComparisonOperator } from "../../../types"
import { SqlToken } from "../../abstract"
import { SqlColumn } from "../../column"
import { SqlValueBoolean } from "../../value/boolean"
import { SqlValueNumber } from "../../value/number"
import { SqlValueString } from "../../value/string"
import { WhereComparison } from "./comparison"

fdescribe('WhereComparison', () => {

    let s:WhereComparison
    let t1:SqlToken
    let t2:SqlToken
    let t3:SqlToken

    beforeEach( () => {
        [s, t1, t2, t3] = [undefined,undefined,undefined,undefined]
    })

    it('should instantiate', () => {
        t1 = new SqlColumn('foo')
        t2 = new SqlValueBoolean(true)
        s = new WhereComparison(t1, '=', t2)
        expect(s).toBeTruthy()
    })

    it('should render SQL', () => {
        t1 = new SqlColumn('foo')
        t2 = new SqlValueBoolean(true)
        s = new WhereComparison(t1, '=', t2)
        expect(s.sql()).toBeTruthy()
    })

    it('should render the expected SQL', () => {
        t1 = new SqlColumn('foo')
        t2 = new SqlValueBoolean(true)
        s  = new WhereComparison(t1, '=', t2)
        expect(s.sql()).toEqual('foo = TRUE')
    })

    describe('standard operators', () => {
        let o:StandardComparisonOperator
        beforeEach( () => {
            o = undefined
        })
        describe('=', () => {
            beforeEach( () => {
                o = '='
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueBoolean(true)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo = TRUE')
            })
        })
        describe('!=', () => {
            beforeEach( () => {
                o = '!='
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueBoolean(true)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo != TRUE')
            })
        })
        describe('<', () => {
            beforeEach( () => {
                o = '<'
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueNumber(6)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo < 6')
            })
        })
        describe('<=', () => {
            beforeEach( () => {
                o = '<='
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueNumber(6)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo <= 6')
            })
        })
        describe('=>', () => {
            beforeEach( () => {
                o = '=>'
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueNumber(6)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo => 6')
            })
        })
        describe('>', () => {
            beforeEach( () => {
                o = '>'
            })
            it('should render the expected SQL', () => {
                t1 = new SqlColumn('foo')
                t2 = new SqlValueNumber(6)
                s  = new WhereComparison(t1, o, t2)
                expect(s.sql()).toEqual('foo > 6')
            })
        })
    })

    describe('between', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            t2 = new SqlValueNumber(6)
            t3 = new SqlValueNumber(12)
            s  = new WhereComparison(t1, 'between', t2, t3)
            expect(s.sql()).toEqual('foo BETWEEN 6 AND 12')
        })
    })
    describe('not between', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            t2 = new SqlValueNumber(6)
            t3 = new SqlValueNumber(12)
            s  = new WhereComparison(t1, 'not between', t2, t3)
            expect(s.sql()).toEqual('foo NOT BETWEEN 6 AND 12')
        })
    })
    describe('like', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            t2 = new SqlValueString('%query%')
            s  = new WhereComparison(t1, 'like', t2)
            expect(s.sql()).toEqual('foo LIKE "%query%"')
        })
    })
    describe('not like', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            t2 = new SqlValueString('%query%')
            s  = new WhereComparison(t1, 'not like', t2)
            expect(s.sql()).toEqual('foo NOT LIKE "%query%"')
        })
    })
    describe('in', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            const values = ['a','b','c'].map( v => new SqlValueString(v) )
            s  = new WhereComparison(t1, 'in', ...values)
            expect(s.sql()).toEqual('foo IN ("a", "b", "c")')
        })
    })
    describe('not in', () => {
        it('should render the expected SQL', () => {
            t1 = new SqlColumn('foo')
            const values = ['a','b','c'].map( v => new SqlValueString(v) )
            s  = new WhereComparison(t1, 'not in', ...values)
            expect(s.sql()).toEqual('foo NOT IN ("a", "b", "c")')
        })
    })
})