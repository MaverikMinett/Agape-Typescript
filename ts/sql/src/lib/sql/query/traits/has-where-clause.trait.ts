

// trait - for Query objects

import { WhereBoolean, WhereComparison, WhereSubgroupEnd, WhereSubgroupStart } from "../../fragment/where";
import { CanParseUserArgs } from "./can-parse-user-args.trait";

// requires ( CanParseUserArgs )
export interface HasWhereClause extends CanParseUserArgs { }
export class HasWhereClause {

    protected whereElements: any[]

    where( arg1:any, operator:any, arg2:any ) {
        const objects = this.argsToSqlObjects(arg1, arg2)

        const element = new WhereComparison(objects[0], operator, ...objects.slice(1) )

        this.addAndIfNeeded()

        this.addWhereElement(element);

        return this
    }

    and() {
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("and is not valid here")
        }

        this.addWhereElement( new WhereBoolean('and') )

        return this
    }

    or() {
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("or is not valid here")
        }

        this.addWhereElement( new WhereBoolean('or') )

        return this
    }

    xor() {
        if ( ! this.whereElements?.length 
            || this.whereElements[this.whereElements.length-1] instanceof WhereSubgroupStart
            || this.whereElements[this.whereElements.length-1] instanceof WhereBoolean ) {
            throw new Error("xor is not valid here")
        }
        
        this.addWhereElement( new WhereBoolean('xor') )

        return this
    }

    not() {       
        this.addAndIfNeeded()
        this.addWhereElement( new WhereBoolean('not') )

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