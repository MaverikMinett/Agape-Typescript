import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

import { deflate, lazy, inherit, nonenumerable } from '@agape/object'
import { tokenize } from '@agape/string'
import { Templateer } from '@agape/templateer'

const writeFile = util.promisify( fs.writeFile )
const all       = util.promisify( Promise.all )

export class Project {

    name: string

    @lazy( o => o.name ? tokenize( o.name ) : undefined )
    slug: string
    type: string

    @inherit( o => o.parent )
    host: string

    port: string

    @nonenumerable
    parent: Project
    
    @nonenumerable
    path: string

    childrenPath: string

    @nonenumerable @lazy( o => o.parent ? [(o.parent.token), o.slug].join('.') : o.slug )
    token: string

    year: number

    constructor( params?:any ) {
        if ( params ) Object.assign(this, params)
        this.year || ( this.year = new Date().getFullYear() )
    }

    get sandbox() {
        return this.type == "sandbox" ? this : this.parent ? this.parent.sandbox : undefined
    }

    get toplevel() {
        return this.parent ? this.parent.toplevel : this
    }

    writeProjectFile() {
        return writeFile( path.join(this.path, 'project.json'), JSON.stringify( deflate(this) ) )
    }

    writeReadmeFile( template:string="README.md" ) {
        const tt = new Templateer()
        tt.renderFile( template, path.join(this.path, "README.md"), deflate(this) )
    }

}