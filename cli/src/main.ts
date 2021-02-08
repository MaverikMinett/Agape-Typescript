
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


/* Create a new sandbox */
commander.command('init')
            .description('Create a sandbox')
            .action( async () => {
                    let command = new InitCommand()
                    command.run( )
                });

/* Create a new project in an existing sandbox */
commander.command('new')
            .description('Create a new project')
            .action( async () => {
                    let command = new NewCommand()
                    command.run( )
                });

/* Add resources to an existing project */
commander.command('add')
            .description("Add resource to a project")
            .action( async () => {
                let command = new AddCommand()
                command.run()
            })


/* "Start" a project, launching development server or executable */
commander.command('start')
            .description('Start the development server for a project')
            .action( async () => {
                    let command = new StartCommand()
                    await command.run( )
                });



commander.parse( process.argv );



if ( ! commander.args.length ) {
    commander.help()
}




