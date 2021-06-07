


import { AngularProject } from '../project'

import * as child_process from 'child_process';

import * as chalk from 'chalk'

export class StartAngularProjectCommand {

    constructor ( public project: AngularProject ) {

    }

    async run( args:Array<string> = [ ] ) {

        const p = this.project
        const host = p.host || 'localhost'
        const port = p.port || '4200'

        console.log( chalk.blue(`Starting ${p.token} on ${host}:${port}...`) )
        let child = child_process.spawn( 'ng', [ 'serve', '--host', host, '--port', port ], {
            cwd: p.path,
            stdio: [process.stdin, process.stdout, process.stderr ]
        } )

    }
    
}

