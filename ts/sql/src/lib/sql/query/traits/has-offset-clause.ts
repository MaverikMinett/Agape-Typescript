

export class HasOffsetClause {

    protected offsetValue:number

    offset( offset:number ) {
        this.offsetValue = offset
        return this
    }

    offsetClause() {
        if ( this.offsetValue === undefined ) return ""

        return `OFFSET ${this.offsetValue}`
    }

}