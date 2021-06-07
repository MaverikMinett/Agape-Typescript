

import { InitSandboxCommand } from '../projects/sandbox/commands/init'


/**
 * Initialize a new sandbox.
 */
// @command('init', 'Create a sandbox')
export class InitCommand {

    public async run( ) {
        let command = new InitSandboxCommand(  )
        command.run(  )
    }

}

export default new InitCommand();