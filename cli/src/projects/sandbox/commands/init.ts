

import { lazy } from '@agape/object'

import { SandboxProject } from '../project'
import { InitSandboxPrompt } from './init.prompt'

import * as fs from 'fs'

export class InitSandboxCommand {

    @lazy( o => new InitSandboxPrompt() )
    prompt: InitSandboxPrompt

    async run() {

        /* directory must be empty to call this command */
        if ( fs.readdirSync( process.cwd() ).length > 0 ) {
            throw new Error("Directory must by empty")
        }

        let stash:{[key:string]:any} = {}

        await this.prompt.prompt( stash )
        
        let project = new SandboxProject( stash )
        project.path = process.cwd()
        project.init()
    }

}

