

// trait - for Query objects

import { ComparisonOperator } from "../../../types";
import { SqlToken } from "../../abstract";
import { WhereBoolean, WhereComparison, WhereSubgroupEnd, WhereSubgroupStart } from "../../fragment/where";
import { CanParseUserArgs } from "./can-parse-user-args.trait";


type ComparisonParameter = SqlToken|string|number|undefined|null;

// requires ( CanParseUserArgs )
export interface HasWhereClause extends CanParseUserArgs { }
export class HasWhereClause {

    protected whereElements: any[]

    where( arg1:ComparisonParameter, operator:ComparisonOperator, ...args:ComparisonParameter[] ): this 
    where( arg1:any, operator:any, ...args:any[] ): this {
        const objects = this.argsToSqlObjects(arg1, ...args)

        const element = new WhereComparison(objects[0], operator, ...objects.slice(1) )

        this.addAndIfNeeded()

        this.addWhereElement(element);

        return this
    }

    and(): this
    and( arg1:ComparisonParameter, operator:ComparisonOperator, ...args:ComparisonParameter[] ): this 
    and( ...args:any[] ): this {    
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("and is not valid here")
        }

        this.addWhereElement( new WhereBoolean('and') )

        if ( args.length ) {
            this.where( args[0], args[1], ...args.slice(2) )
        }

        return this
    }

    or(): this
    or( arg1:ComparisonParameter, operator:ComparisonOperator, ...args:ComparisonParameter[] ): this 
    or( ...args:any[] ): this {    
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("or is not valid here")
        }

        this.addWhereElement( new WhereBoolean('or') )

        if ( args.length ) {
            this.where( args[0], args[1], ...args.slice(2) )
        }

        return this
    }

    xor(): this
    xor( arg1:ComparisonParameter, operator:ComparisonOperator, ...args:ComparisonParameter[] ): this 
    xor( ...args:any[] ): this {   
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("xor is not valid here")
        }
        
        this.addWhereElement( new WhereBoolean('xor') )

        if ( args.length ) {
            this.where( args[0], args[1], ...args.slice(2) )
        }

        return this
    }

    not(): this
    not( arg1:ComparisonParameter, operator:ComparisonOperator, ...args:ComparisonParameter[] ): this 
    not( ...args:any[] ): this {      

        if ( this.whereElements?.length 
            && this.whereElements[this.whereElements.length-1] instanceof WhereBoolean
            && this.whereElements[this.whereElements.length-1].operator == 'not' ) {
            throw new Error("xor is not valid here")
        } 

        this.addAndIfNeeded()
        this.addWhereElement( new WhereBoolean('not') )

        if ( args.length ) {
            this.where( args[0], args[1], ...args.slice(2) )
        }

        return this
    }

    groupStart() {
        this.addAndIfNeeded()
        this.addWhereElement( new WhereSubgroupStart() )

        return this
    }

    groupEnd() {
        this.addWhereElement( new WhereSubgroupEnd() )

        return this
    }

    protected addWhereElement( element: any ) {
        this.whereElements ??= []
        this.whereElements.push( element )
    }

    protected addAndIfNeeded() {
        if ( ! this.whereElements?.length ) return ""

        const last = this.whereElements[this.whereElements.length-1]

        if ( last instanceof WhereBoolean ) return

        if ( last instanceof WhereSubgroupStart ) return

        this.addWhereElement( new WhereBoolean('and') )
    }

    whereClause() {
        if ( ! this.whereElements?.length ) return ""

        return 'WHERE ' + this.whereElements.map( e => e.sql() ).join(' ')
    }
}