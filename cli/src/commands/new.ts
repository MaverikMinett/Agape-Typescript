/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

import { load_closest_project } from '../lib/util'

import { NewAngularProjectCommand } from '../projects/angular/commands/new'
import { NewDjangoProjectCommand } from '../projects/django/commands/new'

import * as Enquirer from 'enquirer';


export class NewCommand  {

    public async run( args:Array<string> = [ ] ) {

        // const project = load_closest_project()

        // console.log( args )

        let projectType = args.length > 0 ? args.pop() : await this.promptForProjectType()
        
        const command = this.getHandler( projectType )

        command.run()

    }

    getHandler( projectType:string ) {

        switch( projectType ) {

            case 'django':
                return new NewDjangoProjectCommand( )

            case 'angular':
                return new NewAngularProjectCommand(  )

            
        }

    }

    public async promptForProjectType():Promise<string> {
        const p = new Enquirer()

        const response = await p.prompt([{
            name: 'projectType',
            type: 'select',
            message: 'Select a project type',
            choices: [ 'angular', 'django', 'sandbox', 'node', 'typescript' ]
        }])
        
        return response['projectType']
    }

}
