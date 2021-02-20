/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

/* Files */
import * as path from 'path'

import { verbalize } from '@agape/string'

/* Config */
import config from '../../../lib/config'


/* Cli */
import * as inquirer from 'inquirer'

export class InitSandboxPrompt {

    async prompt( stash:{[key:string]:any} = {} ) {

        /* get the default project name and slug from the directory name */
        stash.slug = path.basename( process.cwd() )
        stash.name = verbalize( stash.slug )

        /* set the current year on the stash */
        const now  = new Date()
        stash.year = now.getFullYear()

        /* get author information from configuration */
        Object.assign( stash, config.all )

        /* display banner and prompt the user */
        console.log(
            chalk.blueBright( figlet.textSync('Agape', { horizontalLayout: 'full' }) ) + "\n"
            + chalk.greenBright( figlet.textSync(stash.name, { horizontalLayout: 'full' }) )
        );

        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Workspace name:',
                default: stash.name,
                validate: (value) => {
                    return value.length ? true : 'Required';
                }
            },
            {
                name: 'slug',
                type: 'input',
                message: 'Slug:',
                default: stash.slug,
                validate: (value) => {
                    return value.length ? true : 'Required';
                }
            },
            {
                name: 'port',
                type: 'input',
                message: 'Port',
                default: "00",
            },
            {
                name: 'description',
                type: 'input',
                message: 'Description:',
                
            },
            {
                name: 'license',
                type: 'input',
                message: 'License:',
                default: stash.license,
            },
            {
                name: 'author',
                type: 'input',
                message: 'Author:',
                default: stash.author,
            },
            {
                name: 'email',
                type: 'input',
                message: 'Email',
                default: stash.email,
            }
        ]

        const responses = await inquirer.prompt(questions) 
        Object.assign( stash, responses )

        return stash
    }

}
