import * as chalk from 'chalk'
import * as figlet from 'figlet'


import { load_closest_project } from '../lib/util'

import { Project } from '../projects/project'
import { AngularProject } from '../projects/angular/project'
import { AddToAngularProjectCommand } from '../projects/angular/commands/add'


export class AddCommand  {

    async run( args:Array<string> = [ ] ) {

        const project = load_closest_project()

        if ( ! project ) throw new Error("Must be run inside an existing project")

        const command = this.getHandler( project )

        command.run( args )

    }

    getHandler( project:Project ) {
        if (  project instanceof AngularProject ) {
            return  new AddToAngularProjectCommand( project )  

        }
        else {
            throw new Error(`Project of type ${project.type} has no handler for add command`)
        }
    }

}
