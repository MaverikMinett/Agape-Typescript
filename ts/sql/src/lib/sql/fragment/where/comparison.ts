import { ComparisonOperator, StandardComparisonOperator } from "../../../types"
import { Syntax, SqlToken } from "../../abstract"


export class WhereComparison extends Syntax {

    leftArg:SqlToken
    operator:ComparisonOperator
    rightArgs:SqlToken[]

    constructor( leftArg:SqlToken, operator:'between', betweenFrom:SqlToken, betweenTo:SqlToken )
    constructor( leftArg:SqlToken, operator:'not between', betweenFrom:SqlToken, betweenTo:SqlToken )
    constructor( leftArg:SqlToken, operator:'like', rightArg:SqlToken )
    constructor( leftArg:SqlToken, operator:'not like', rightArg:SqlToken )
    constructor( leftArg:SqlToken, operator:'in', ...rightArgs:SqlToken[] )
    constructor( leftArg:SqlToken, operator:'not in', ...rightArgs:SqlToken[] )
    constructor( leftArg:SqlToken, operator:StandardComparisonOperator, rightArg:SqlToken )
    constructor( leftArg:SqlToken, operator:ComparisonOperator, ...rightArgs:SqlToken[] ) 
    constructor( leftArg:SqlToken, operator:ComparisonOperator, ...rightArgs:SqlToken[] ) {
        super()
        Object.assign( this, {leftArg, operator, rightArgs} )
    }

    sql() {
        let sql:string = '';
        const o = this.operator;

        // standard operators = != < <= => >
        if ( o=='='||o=='!='||o=='<'||o=='<='||o=='=>'||o=='>' ) {
            sql += this.leftArg.sql();

            // null checks
            if ( this.rightArgs[0] === null || this.rightArgs[0] === undefined ) {
                sql += this.operator === '=' ? ' IS NULL' : ' IS NOT NULL';
            }
            else {
                sql += ` ${this.operator} ${this.rightArgs[0].sql()}`;
            }
        }
        else if ( o == 'between' ) {
            sql = `${this.leftArg.sql()} BETWEEN ${this.rightArgs[0].sql()} AND ${this.rightArgs[1].sql()}`
        }
        else if ( o == 'not between' ) {
            sql = `${this.leftArg.sql()} NOT BETWEEN ${this.rightArgs[0].sql()} AND ${this.rightArgs[1].sql()}`
        }
        else if ( o == 'like' ) {
            sql = `${this.leftArg.sql()} LIKE ${this.rightArgs[0].sql()}`
        }
        else if ( o == 'not like' ) {
            sql = `${this.leftArg.sql()} NOT LIKE ${this.rightArgs[0].sql()}`
        }
        else if ( o == 'in' ) {
            sql = `${this.leftArg.sql()} IN (${this.rightArgs.map(a => a.sql()).join(', ')})`
        }
        else if ( o == 'not in' ) {
            sql = `${this.leftArg.sql()} NOT IN (${this.rightArgs.map(a => a.sql()).join(', ')})`
        }
        else {
            throw new Error(`Invalid operator ${this.operator}`)
        }

        return sql;
    }

    bindParams() {
        [ this.leftArg, ...this.rightArgs ]
            .filter( arg => arg['bindParams'] )
            .map( arg => arg['bindParams'].call(arg) )
    }

}