
import * as fs from 'fs'
import { Project } from '../project'



export class SandboxProject extends Project {

    // async create( slug:string, sourcePath:string ) {

    //     if ( fs.existsSync( path.join( sourcePath, slug) ) ) {
    //         throw new Error(`Cannot create project ${slug} in ${sourcePath}, directory already exists` )
    //     }

    //     const cmd = spawnSync(`ng`, ['new', slug, '--routing', '--style=scss' ], { cwd: sourcePath });

    //     this.path = path.join( sourcePath, slug )
    // }

    childrenPath: string = "src"
    type: string         = "sandbox"


    async init(  ) {

        /* check for required variables */
        if ( this.name === undefined ) throw new Error("Cannot initialize sandbox without a name")
        if ( this.slug === undefined ) throw new Error("Cannot initialize sandbox without a slug")
        if ( this.path === undefined ) throw new Error("Cannot initialize sandbox without a path")

        /* directory must be empty to call this command */
        if ( fs.readdirSync( this.path ).length > 0 ) {
            throw new Error(`Cannot initialize sanbox in ${this.path}, directory is not empty`)
        }

        // this.writeProjectFile()
        // this.writeReadmeFile()


        await Promise.all( [this.writeProjectFile(), this.writeReadmeFile()] )
        
    }









    // await this.writeProjectFile( d )
    // await this.writeReadmeFile( d )


}