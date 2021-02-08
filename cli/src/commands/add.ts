import * as chalk from 'chalk'
import * as figlet from 'figlet'

import * as path from 'path'
import * as fs from 'fs'

import * as commander from 'commander'

import { spawnSync } from 'child_process'

import { Command } from '../lib/command'
import { tokenize } from '@agape/string'

import { AngularProject } from '../projects/angular/project'


export class AddCommand extends Command {

    public async run( ) {

        if ( ! this.scope.project ) {
            console.log( chalk.red("Must be run inside an existing project") )
            return
        }

        this.displayBanner()

        // console.log( "\n" )
        // console.log( chalk.blueBright( "Create a new project in " ) + chalk.cyanBright(this.scope.project.slug) );
        // console.log( "\n" )
        // const response = await this.promptForProjectType()

        let args = commander.args
        args.pop()

        const arg = commander.args[1]

        try {
            let cmd:Command
            switch( this.scope.project.type ) {
                // case 'django':
                    // cmd = new NewDjangoProjectCommand( this.scope )
                    // return cmd.run()
                    // break;
                case 'angular':
                        switch( arg ) {
                            case 'material-icons':
                                return await this.addMaterialIconsToAngularProject()
                        }
            }

            console.log( chalk.red("Could not add ") 
                + chalk.cyan(arg)
                + chalk.red(" to ")
                + chalk.cyan( this.scope.project.token ),
                + chalk.red(", no handler exists.") )
        }
        catch (error) {
            console.log( chalk.red("Error: " + error ) )
        }



        return


    }

    public displayBanner() {
        console.log(
            chalk.blueBright( figlet.textSync('Agape', { horizontalLayout: 'full' }) )
        );
    }

    public async addFontToAngularProject ( fontName:string ) {
        let p:AngularProject = <AngularProject>this.scope.project

        process.stdout.write( chalk.blue(`Installing font ${fontName}... `) )
        p.typography.addFont( fontName )
        process.stdout.write( chalk.blue("done\n") )
    }

    public async addMaterialIconsToAngularProject( ) {
        console.log("Adding material icons to project")
        this.addFontToAngularProject("material-icons")
    }


}
