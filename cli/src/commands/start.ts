/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'


import { Command } from '../lib/command'
import { ProjectRunner } from '../lib/project-runner'

// import { NewDjangoProjectCommand } from '../projects/django/new-project.command'

// import * as Enquirer from 'enquirer';


import * as child_process from 'child_process';


export class StartCommand extends Command {

    async run( ) {

        if ( ! this.scope.project ) {
            console.log( chalk.red("Must be run inside an existing project") )
            return
        }
        // else {
        //     console.log( this.scope.project )
        // }


        this.displayBanner()

        console.log( "\n" )
        console.log( chalk.blueBright( "Starting " ) + chalk.cyanBright(this.scope.project.token) );
        console.log( "\n" )



        // this.scope.project.start()


        let runner = new ProjectRunner( this.scope )
        await runner.run()

    }



    public displayBanner() {
        console.log(
            chalk.blueBright( figlet.textSync('Agape', { horizontalLayout: 'full' }) )
        );
    }



}
