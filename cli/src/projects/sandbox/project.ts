
import * as fs from 'fs'


import { lazy } from '@agape/object'

import { Project } from '../project'

import * as util from 'util'
const all       = util.promisify( Promise.all )




export class SandboxProject extends Project {

    // async create( slug:string, sourcePath:string ) {

    //     if ( fs.existsSync( path.join( sourcePath, slug) ) ) {
    //         throw new Error(`Cannot create project ${slug} in ${sourcePath}, directory already exists` )
    //     }

    //     const cmd = spawnSync(`ng`, ['new', slug, '--routing', '--style=scss' ], { cwd: sourcePath });

    //     this.path = path.join( sourcePath, slug )
    // }

    @lazy('src')
    childrenPath: string

    @lazy('sandbox')
    type: string


    async init( sourcePath:string ) {

        /* directory must be empty to call this command */
        if ( fs.readdirSync( sourcePath ).length > 0 ) {
            throw new Error(`Cannot initialize sanbox in ${sourcePath}, directory is not empty`)
        }

        this.path = sourcePath

        await all( [this.writeProjectFile(), this.writeReadmeFile()] )
        

    }






    // await this.writeProjectFile( d )
    // await this.writeReadmeFile( d )


}