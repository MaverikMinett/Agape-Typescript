/**
 * Apply to a query which requires the fields method.
 * Query Trait
 */
 export class HasFields {
    _fields: string[]

    fields( ...fields:string[] ) {
        this._fields ??= []
        this._fields.push(...fields)
        return this
    }
}