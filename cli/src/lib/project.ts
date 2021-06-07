

import { lazy } from '@agape/object'

export class Project {

    name: string
    slug: string
    type: string

    host: string
    port: string

    // @nonenumerable
    parent: Project

    path: string

    childrenPath: string

    @lazy( o => o.parent ? [(o.parent.token), o.slug].join('.') : o.slug )
    token: string

    year: number


    
    constructor( params?:any ) {
        if ( params ) Object.assign(this, params)
        this.year || ( this.year = new Date().getFullYear() )
    }


    /**
     * Returns the toplevel project which is always a sandbox
     */
    get sandbox() {
        return this.type == "sandbox" ? this : this.parent ? this.parent.sandbox : undefined
    }


}