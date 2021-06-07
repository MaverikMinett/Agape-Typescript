/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

/* Cli */
import * as inquirer from 'inquirer'

export class NewDjangoProjectPrompt {


    async promptForProjectOptions( stash:{[key:string]:any} = {} ) {

        /* set default values on stash */
        const now  = new Date()
        stash.year   || ( stash.year = now.getFullYear() )
        stash.author || ( stash.author = stash.parent ? stash.parent.author : undefined )
        stash.email  || ( stash.email  = stash.parent ? stash.parent.email : undefined )
        stash.name   || ( stash.name   = stash.parent ? `${stash.parent.name} API` : undefined )
        stash.slug   || ( stash.slug   = 'api' )
        stash.port   || ( stash.port = stash.parent?.sandbox ? `431${stash.parent.sandbox.port}` : "43100" )
            

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

    async promptForDjangoOptions( stash:{[key:string]:any} = {} ) {

        stash.primaryModule || ( stash.primaryModule = stash.slug || "api" );

        const questions = [
            {
                name: 'primaryModule',
                type: 'input',
                message: 'Primary module',
                default: stash.primaryModule
            },
            {
                name: 'djangoRestFramework',
                type: 'confirm',
                message: "Use Django Rest Framework",
                default: true,
            },
            {
                name: 'djangoCorsHeaders',
                type: 'confirm',
                message: "Use Django CORS Headers",
                default: true,
            },
            {
                name: 'djangoJWT',
                type: 'confirm',
                message: "Use Django JWT",
                default: true,
            }
        ]

        return inquirer.prompt(questions) 
    }




 
}





