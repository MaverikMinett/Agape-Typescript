/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

/* Cli */
import * as inquirer from 'inquirer'

export class NewAngularProjectPrompt {


    async promptForProjectOptions( stash:{[key:string]:any} = {} ) {

        /* set default values on stash */
        const now  = new Date()
        stash.year   || ( stash.year = now.getFullYear() )
        stash.author || ( stash.author = stash.parent ? stash.parent.author : undefined )
        stash.email  || ( stash.email  = stash.parent ? stash.parent.email : undefined )
        stash.name   || ( stash.name   = stash.parent ? `${stash.parent.name} UI` : undefined )
        stash.slug   || ( stash.slug   = 'ui' )

        stash.port   || ( stash.port = stash.parent?.sandbox ? `432${stash.parent.sandbox.port}` : "43200" )
            

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
                default: stash.port,
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
    
    }

    async promptForAngularOptions( stash:{[key:string]:any} = {} ) {

        const questions = [
            {
                name: 'material',
                type: 'confirm',
                message: 'Use Material',
                default: true
            },
            {
                name: 'materialIcons',
                type: 'confirm',
                message: 'Use Material Icons',
                default: true,
            },
            {
                name: 'moment',
                type: 'confirm',
                message: 'Use moment.js',
                default: false
            }
        ]

        return inquirer.prompt(questions) 
    }




 
}





