/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'


import { Command } from '../lib/command'
import { NewAngularProjectCommand } from '../projects/angular/new-project.command'
import { NewDjangoProjectCommand } from '../projects/django/new-project.command'

import * as Enquirer from 'enquirer';


export class NewCommand extends Command {

    public async run( ) {

        if ( ! this.scope.project ) {
            console.log( chalk.red("Must be run inside an existing project") )
            return
        }


        this.displayBanner()

        console.log( "\n" )
        console.log( chalk.blueBright( "Create a new project in " ) + chalk.cyanBright(this.scope.project.slug) );
        console.log( "\n" )
        const response = await this.promptForProjectType()

        let cmd:Command
        switch( response['projectType'] ) {
            case 'django':
                cmd = new NewDjangoProjectCommand( this.scope )
                return cmd.run()
            case 'angular':
                cmd = new NewAngularProjectCommand( this.scope )
                return cmd.run()
        }


    }

    public async prompt() {
        const questions = [

        ]

        return { }
    }

    public displayBanner() {
        console.log(
            chalk.blueBright( figlet.textSync('Agape', { horizontalLayout: 'full' }) )
        );
    }

    public async promptForProjectType() {
        const p = new Enquirer()

        return p.prompt([{
            name: 'projectType',
            type: 'select',
            message: 'Select a project type',
            choices: [ 'angular', 'django', 'sandbox', 'node', 'typescript' ]
        }])
        
    }

}
