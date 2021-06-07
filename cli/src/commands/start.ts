/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

import { load_closest_project } from '../lib/util'

import { Project } from '../projects/project'
import { AngularProject } from '../projects/angular/project'
import { StartAngularProjectCommand } from '../projects/angular/commands/start'
import { DjangoProject } from '../projects/django/project'
import { StartDjangoProjectCommand } from '../projects/django/commands/start'


export class StartCommand  {

    async run( args:Array<string> = [ ] ) {

        const project = load_closest_project()

        console.log("START--->", project )

        if ( ! project ) throw new Error("Must be run inside an existing project")

        const command = this.getHandler( project )

        command.run( args )

    }

    getHandler( project:Project ) {

        if (  project instanceof AngularProject ) {
            return  new StartAngularProjectCommand( project )  
        }
        else if ( project instanceof DjangoProject ) {
            return new StartDjangoProjectCommand( project )
        }
        else {
            throw new Error(`Project of type ${project.type} has no handler for start command`)
        }
    }


}
