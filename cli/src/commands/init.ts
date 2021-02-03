

// import { command } from '../commander'
import { Scope } from '../lib/scope'
import { InitSandboxCommand } from '../projects/sandbox/init'


/**
 * Initialize a new sandbox.
 */
// @command('init', 'Create a sandbox')
export class InitCommand {

    public async run( scope?:Scope ) {

        let command = new InitSandboxCommand( scope )
        command.run(  )

    }

}

export default new InitCommand();