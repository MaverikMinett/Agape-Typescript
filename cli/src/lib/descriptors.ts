
import { lazy, nonenumerable } from '@agape/object'

export class AuthorDescriptor {
    name: string
    email: string
    url: string
    github: string

    constructor( params?:any ) {
        if ( params ) Object.assign(this, params)
    }
}


export class ProjectDescriptor {

    name: string
    slug: string
    type: string

    host: string
    port: string

    // @nonenumerable
    parent: ProjectDescriptor
    path: string

    childrenPath: string

    @lazy( o => o.parent ? [(o.parent.token), o.slug].join('.') : o.slug )
    token: string

    year: number

    constructor( params?:any ) {
        if ( params ) Object.assign(this, params)
        this.year || ( this.year = new Date().getFullYear() )
    }

    get sandbox() {
        return this.type == "sandbox" ? this : this.parent ? this.parent.sandbox : undefined
    }

}

export class ProjectDescriptorSerializer {

    deflate( project:ProjectDescriptor ) {
        let r = {}
        for ( let field of Object.keys(project) ) {
            if ( !  ['parent','path','token'].includes(field) ) {
                r[field] = project[field]
            }
        }
        return r
    }

}


class DistDescriptor {
    
    name: string
    slug: string
    version: string

    package: string



}