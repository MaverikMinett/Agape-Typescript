
/* Text */
import * as chalk from 'chalk'
import * as figlet from 'figlet'

/* Files */
import * as fs from 'fs'
import * as path from 'path'

/* Cli */
import * as inquirer from 'inquirer'

/* Strings */
import { deflate } from '@agape/object'
import { verbalize } from '@agape/string'

/* Config */
import config from '../../lib/config'


/* App */
import { CreateReadmeMacro } from '../../macros/create-readme.macro'

import { ProjectDescriptor, ProjectDescriptorSerializer } from '../../lib/descriptors'

import { Command } from '../../lib/command'
import { Macro } from '../../lib/macro'



export class InitSandboxCommand extends Command {

    public async run( ) {

        let stash = this.scope.stash

        /* directory must be empty to call this command */
        if ( fs.readdirSync( process.cwd() ).length > 0 ) {
            console.log( chalk.red("Directory must be empty.") )
            return
        }

        /* populate default values on the stash */

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

        const response = await this.prompt( stash )
        Object.assign( stash, response );


        let macro = new InitSandboxMacro( this.scope )
        macro.run(  )
    }

    public prompt( stash ) {
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
        return inquirer.prompt(questions) 
    }

}

class InitSandboxMacro extends Macro {

    async run( ) {

        let stash = this.scope.stash

        let d    = new ProjectDescriptor( this.scope.stash )
        d.parent = this.scope.project
        d.path   = process.cwd()
        d.childrenPath = "src"
        d.type   = "sandbox"

        await this.writeProjectFile( d )
        await this.writeReadmeFile( d )


        /* create readme */
        // this.scope.templateer.renderFile( "README.md", "README.md", stash )
        // console.log(chalk.blue("Created Readme"))

    }

    async writeProjectFile( projectDescriptor:ProjectDescriptor ) {
        /* create ag file */

        let s = new ProjectDescriptorSerializer()
        let d = s.deflate( projectDescriptor )

        process.stdout.write( chalk.blue("Creating project.json file... ") )
        fs.writeFileSync( path.join(projectDescriptor.path,'project.json'), JSON.stringify(d, null, 4) );
        process.stdout.write( chalk.blue("done\n") )
    }

    async writeReadmeFile( projectDescriptor:ProjectDescriptor ) {

       process.stdout.write( chalk.blue("Creating readme file... ") )
       let data = deflate( projectDescriptor )
       this.scope.templateer.renderFile(
           "README.md", path.join( projectDescriptor.path, "README.md"), { project: data }
       )
       process.stdout.write( chalk.blue("done\n") )

    }

}