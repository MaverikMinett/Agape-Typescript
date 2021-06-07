
import * as fs from 'fs'
import * as path from 'path'

import { Project } from '../projects/project'
import { SandboxProject } from '../projects/sandbox/project'
import { AngularProject } from '../projects/angular/project'
import { DjangoProject } from '../projects/django/project'

import { AuthorDescriptor } from './descriptors'

const system_appdata_dir = process.env.APPDATA 
        || ( process.platform == 'darwin' 
                ? process.env.HOME + '/Library/Preferences' 
                : process.env.HOME + "/.local/share" )

export const appDataDir =  path.join( system_appdata_dir, 'agape' );




/**
 * Load the project file in the given directory. Will also load
 * all 'parent' projects by looking for project files further up
 * the directory tree until a 'sandbox' project is found.
 * @param dir The project directory to load
 */
export function load_project( dir:string="." ) {
    dir = path.resolve(dir)

    let project

    let filepath = path.join( dir, 'project.json' );
    let params   = JSON.parse(<any>fs.readFileSync( filepath ))
    params.path  = dir

    switch( params.type ) {
        case "angular":
            project = new AngularProject( params )
            break;
        case "django":
            project = new DjangoProject( params )
            break
        case "sandbox":
            project = new SandboxProject( params )
            break
        default:
            project = new Project( params )
        
    }

    project.parent = load_closest_project( path.dirname(dir) )

    return project
    
    // dir = path.dirname( dir )
    // if ( dir != "/" ) {
    //     project.parent = load_closest_project( )
    // }

    // return project
    


    // let returnValue = project

    // while ( project.type != 'sandbox' && dir != "/" ) {
    //     dir = path.dirname( dir )
    //     filepath = path.join( dir, 'project.json' )
        
    //     if ( fs.existsSync(filepath) ) {
    //         // params = JSON.parse(<any>fs.readFileSync( filepath ))
    //         // params.path = dir
    //         // project.parent = new ProjectDescriptor( params )
    //         // project = project.parent
    //     }
    // }

    // if ( ! project.sandbox ) {
    //     throw Error("Cannot load a project outside of a sandbox.")
    // }

    // return returnValue
}

export function load_closest_project(  dir?:string ):Project {

    if ( dir === undefined ) dir = process.cwd()

    while(1) {
        if ( fs.existsSync( path.join( dir, 'project.json' ) ) ) {
            return load_project( dir );
        }

        if ( dir == "/" ) { return null }
        else { dir = path.dirname( dir ) }
    }
}


export function load_author_file( filepath:string ): AuthorDescriptor {

    if ( fs.existsSync(filepath) ) {
        return new AuthorDescriptor(JSON.parse( fs.readFileSync(filepath, 'utf-8') ))
        
    } else {
        return new AuthorDescriptor()
    }

}
