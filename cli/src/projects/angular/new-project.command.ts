


import {Command} from '../../lib/command'

import * as chalk from 'chalk'

import * as path from 'path'
import * as fs from 'fs'

import {spawnSync} from 'child_process';

import * as inquirer from 'inquirer'

import { CreateReadmeMacro } from '../../macros/create-readme.macro'


import { ProjectDescriptor, ProjectDescriptorSerializer } from '../../lib/descriptors';
import { Scope } from '../../lib/scope';

export class NewAngularProjectCommand extends Command {

    async run() {
        let cmd:any

        const p = this.scope.project

        let stash = { 'slug': 'ui' }

        let sourcePath = process.cwd()
        if ( path.resolve(p.path) == path.resolve(process.cwd()) )        
            sourcePath = path.join(p.path, p.childrenPath)

        let projectPath = path.join( sourcePath, stash.slug )


        const projectOptions = await this.promptForProjectOptions()
        Object.assign(this.scope.stash, projectOptions)

        const angularOptions = await this.promptForAngularOptions()
        Object.assign(this.scope.stash, angularOptions)

        // create project from options
        // let d = bless( new ProjectDescriptor( this.scope.stash ), DjangoProject )
        let d =  new ProjectDescriptor( this.scope.stash )
        d.parent = this.scope.project
        d.path   = projectPath
        d.type   = "angular"


        /* Create the angular application */
        process.stdout.write( chalk.blue("Creating angular workspace... ") )
        cmd = spawnSync(`ng`, ['new', stash.slug, '--routing', '--style=scss' ], { cwd: sourcePath });
        fs.renameSync( path.join(sourcePath, stash.slug), projectPath )
        process.stdout.write( chalk.blue("done\n") )


        // update package.json

        // update environment file




        /* Install Agape */
        // process.stdout.write( chalk.blue("Installing agape...") )
        // cmd = spawnSync('npm', [ 'install', '@agape/core', '@agape/auth', '--save' ], { cwd: projectPath });
        // process.stdout.write( chalk.blue("done\n") )

        /* Install Material */
        // process.stdout.write( chalk.blue("Installing material...") )
        // cmd = spawnSync('npm', [ 'install', '@angular/cdk', '@angular/material', '--save' ], { cwd: projectPath });
        // process.stdout.write( chalk.blue("done\n") )ls


        /* Install Moment */
        // process.stdout.write( chalk.blue("Installing moment...") )
        // cmd = spawnSync('npm', [ 'install', 'moment', '@angular/material-moment-adapter', '--save' ], { cwd: projectPath });
        // process.stdout.write( chalk.blue("done\n") )


        /* Create .gitignore file */
        // process.stdout.write( chalk.blue("Creating .gitignore file... ") )
        // fs.writeFileSync( path.join(projectPath, '.gitignore'), "venv\napp/local_settings.py\n" )
        // process.stdout.write( chalk.blue("done\n") )

        /* Create the agape.json file */
        this.writeProjectFile( d )

        /* Create a new scope for the new project */
        let s = new Scope( d )


        /* create readme */
        process.stdout.write( chalk.blue("Creating README.md file... ") )
        const macro = new CreateReadmeMacro( s )
        await macro.run( )
        process.stdout.write( chalk.blue("done\n") )

        console.log( "\n" +  chalk.blue("Successfully created project ") + chalk.cyanBright(d.token) + "\n" )
    }

    async promptForProjectOptions() {

        let stash = { 
            'name': `${this.scope.project.sandbox.name} UI`, 
            'slug': 'ui', 
            'angular': {},
            'license': this.scope.project.sandbox.license,
            'author': this.scope.project.sandbox.author,
            'email': this.scope.project.sandbox.email,
            'port': `432${this.scope.project.sandbox.port || '01'}`
        }

        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Name:',
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
                name: 'description',
                type: 'input',
                message: 'Description:',
                
            },

        ]
        const responses = await inquirer.prompt(questions) 

        Object.assign(stash, responses)

        return stash
    }

    async promptForAngularOptions() {

        let stash = {  
            'port': `432${this.scope.project.sandbox.port || '01'}`
        }

        const questions = [
            {
                name: 'port',
                type: 'input',
                message: 'Port for development server',
                default: stash.port
            }
        ]

        return inquirer.prompt(questions) 
    }
    

    async writeProjectFile( projectDescriptor:ProjectDescriptor ) {
        /* create ag file */

        let s = new ProjectDescriptorSerializer()
        let d = s.deflate( projectDescriptor )

        process.stdout.write( chalk.blue("Creating project.json file... ") )
        fs.writeFileSync( path.join(projectDescriptor.path,'project.json'), JSON.stringify(d, null, 4) );
        process.stdout.write( chalk.blue("done\n") )

        /* create readme */
        // const macro = new CreateReadmeMacro( this.scope )
        // await macro.run( )
        // console.log(chalk.blue("Created Readme"))
    }


}