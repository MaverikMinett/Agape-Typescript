


import { DjangoProject } from '../project'

import * as child_process from 'child_process';

import * as chalk from 'chalk'

export class StartDjangoProjectCommand {

    constructor ( public project: DjangoProject ) {

    }

    async run( args:Array<string> = [ ] ) {
        const p = this.project
        const host = p.host || 'localhost'
        const port = p.port || '8000'

        
        console.log( chalk.blue(`Starting ${p.token} on ${host}:${port}...`) )
        let child = child_process.spawn( 'venv/bin/python', ['manage.py', 'runserver', `${host}:${port}` ], {
            cwd: p.path,
            stdio: [process.stdin, process.stdout, process.stderr ]
        } )

    }
    
}

