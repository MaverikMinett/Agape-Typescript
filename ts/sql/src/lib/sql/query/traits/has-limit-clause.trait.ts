

export class HasLimitClause {

    protected limitValue:number

    limit( limit:number ) {
        this.limitValue = limit
        return this
    }

    limitClause() {
        if ( this.limitValue === undefined ) return ""

        return `LIMIT ${this.limitValue}`
    }

}