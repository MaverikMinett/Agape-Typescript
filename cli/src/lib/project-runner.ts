
import { Scope } from './scope'

import * as child_process from 'child_process';

export class ProjectRunner {

    constructor( public scope: Scope ) {

    }

    async run() {

        const p = this.scope.project
        

        if ( p.type == "django" ) {

            const host = p.host ? p.host : 'localhost'
            const port = p.port ? p.port : '8000'
            
            console.log(`Starting ${p.name}...`)
            let child = child_process.spawn( 'venv/bin/python', ['manage.py', 'runserver', `${host}:${port}` ], {
                cwd: p.path,
                stdio: [null, process.stdout, null ]
            } )

        }

        else if ( p.type == "angular" ) {

            const host = p.host ? p.host : 'localhost'
            const port = p.port ? p.port : '4200'

            console.log(`Starting ${p.name}...`)
            let child = child_process.spawn( 'ng', [ 'serve' ], {
                cwd: p.path,
                stdio: [null, process.stdout, null ]
            } )
        }

    }

}