
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




class DistDescriptor {
    
    name: string
    slug: string
    version: string

    package: string



}