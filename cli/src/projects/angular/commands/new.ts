

import { lazy } from '@agape/object'

import { AngularProject } from '../project'
import { NewAngularProjectPrompt } from './new.prompt'

import { load_closest_project } from '../../../lib/util'

import * as path from 'path'

import * as chalk from 'chalk'

export class NewAngularProjectCommand {

    @lazy( o => new NewAngularProjectPrompt() )
    prompt: NewAngularProjectPrompt

    async run( stash:{[key:string]:any} = {} ) {

        stash.parent || ( stash.parent = load_closest_project() )

        let targetDir = stash.parent ? path.join( stash.parent.path, stash.parent.childrenPath ) : process.cwd()

        await this.prompt.promptForProjectOptions( stash )
        let opts = await this.prompt.promptForAngularOptions( )
        
        let project = new AngularProject( stash )
        process.stdout.write( chalk.blue(`Creating project ${project.token}... `) )
        await project.create( targetDir )
        process.stdout.write( chalk.blue("done\n") )

        /* Install Material */
        if ( opts.material ) {
            process.stdout.write( chalk.blue("Installing material...") )
            await project.installMaterial()
            process.stdout.write( chalk.blue("done\n") )
        }

        /* Install Moment */
        if ( opts.moment ) {
            process.stdout.write( chalk.blue("Installing moment...") )
            await project.installMoment()
            process.stdout.write( chalk.blue("done\n") )
        }

        /* Install Material/Moment Adapter */
        if ( opts.moment && opts.material ) {
            process.stdout.write( chalk.blue("Installing material/moment adapter...") )
            await project.installMaterialMomentAdapter()
            process.stdout.write( chalk.blue("done\n") )
        }

    }


    
}

