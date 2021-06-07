
/* Commands */
import * as commander from 'commander'
import * as path from 'path'


import { InitCommand } from './commands/init'
import { AddCommand } from './commands/add'
import { NewCommand } from './commands/new'
import { StartCommand } from './commands/start'

import { Templateer } from '@agape/templateer'

import { appDataDir } from './lib/util'

Templateer.prototype.sources = [ path.join(__dirname, 'templates'), appDataDir ]

try {

/* Create a new sandbox */
commander.command('init')
            .description('Create a sandbox')
            .action( async () => {
                    let command = new InitCommand()
                    await command.run( )
                });

/* Create a new project in an existing sandbox */
commander.command('new')
            .description('Create a new project')
            .action( async () => {
                    let command = new NewCommand()
                    await command.run( commander.args.slice(1) )
                });

/* Add resources to an existing project */
commander.command('add')
            .description("Add resource to a project")
            .action( async () => {
                let command = new AddCommand()
                await command.run( commander.args.slice(1) )
            })


/* "Start" a project, launching development server or executable */
commander.command('start')
            .description('Start the development server for a project')
            .action( async () => {
                    let command = new StartCommand()
                    await command.run( )
                });
}
catch (e) {
    console.log( "Error:" + e )
}


commander.parse( process.argv );



if ( ! commander.args.length ) {
    commander.help()
}




