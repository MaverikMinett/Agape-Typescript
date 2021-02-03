
/* Commands */
import * as commander from 'commander'

import { InitCommand } from './commands/init'
import { NewCommand } from './commands/new'
import { StartCommand } from './commands/start'


/* Create a new sandbox */
commander.command('init')
            .description('Create a sandbox')
            .action( async () => {
                    let command = new InitCommand()
                    command.run( )
                });

commander.command('new')
            .description('Create a new project')
            .action( async () => {
                    let command = new NewCommand()
                    command.run( )
                });

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




