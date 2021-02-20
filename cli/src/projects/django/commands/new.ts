

import { lazy } from '@agape/object'

import { DjangoProject } from '../project'
import { NewDjangoProjectPrompt } from './new.prompt'

import { load_closest_project } from '../../../lib/util'

import * as path from 'path'

import * as chalk from 'chalk'
import { stdout } from 'process'

export class NewDjangoProjectCommand {

    @lazy( o => new NewDjangoProjectPrompt() )
    prompt: NewDjangoProjectPrompt

    async run( stash:{[key:string]:any} = {} ) {

        stash.parent || ( stash.parent = load_closest_project() )

        let targetDir = stash.parent ? path.join( stash.parent.path, stash.parent.childrenPath ) : process.cwd()

        await this.prompt.promptForProjectOptions( stash )
        let opts = await this.prompt.promptForDjangoOptions( stash )
        
        let project = new DjangoProject( stash )
        process.stdout.write( chalk.blue(`Creating ${project.token} in ${targetDir}... `))
        await project.create( targetDir )
        process.stdout.write( chalk.blue("done\n") )

        if ( opts.djangoRestFramework ) {
            process.stdout.write( chalk.blue(`Installing DRF... `))
            await project.installDjangoRestFramework()
            process.stdout.write( chalk.blue("done\n") )
        }
        
        if ( opts.djangoCorsHeaders ) {
            process.stdout.write( chalk.blue(`Installing Django Cors Headers ... `))
            await project.installDjangoCorsHeaders()
            process.stdout.write( chalk.blue("done\n") )
        }
        
        if ( opts.djangoJWT ) {
            process.stdout.write( chalk.blue(`Installing Django JWT ... `))
            await project.installDjangoJWT()
            process.stdout.write( chalk.blue("done\n") )
        }
    }


    
}

