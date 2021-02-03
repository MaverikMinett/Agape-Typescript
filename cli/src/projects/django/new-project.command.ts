


import { Command } from '../../lib/command'

import * as chalk from 'chalk'

import * as path from 'path'
import * as fs from 'fs'

import { spawnSync } from 'child_process';
import { Transform } from 'stream';

import * as inquirer from 'inquirer'

import { CreateReadmeMacro } from '../../macros/create-readme.macro'


import { ProjectDescriptor, ProjectDescriptorSerializer } from '../../lib/descriptors';
import { Scope } from '../../lib/scope';

export class NewDjangoProjectCommand extends Command {

    async run() {
        let cmd:any

        const p = this.scope.project

        let stash = { 'slug': 'api', 'primaryModule': 'app' }

        let sourcePath = process.cwd()
        if ( path.resolve(p.path) == path.resolve(process.cwd()) )        
            sourcePath = path.join(p.path, p.childrenPath)
        
        let projectPath = path.join( sourcePath, stash.slug )
        fs.mkdirSync(projectPath, { recursive: true });

        const projectOptions = await this.promptForProjectOptions()
        Object.assign(this.scope.stash, projectOptions)

        const djangoOptions = await this.promptForDjangoOptions()
        Object.assign(this.scope.stash, djangoOptions)

        // create project from options
        // let d = bless( new ProjectDescriptor( this.scope.stash ), DjangoProject )
        let d =  new ProjectDescriptor( this.scope.stash )
        d.type   = "django"
        d.parent = this.scope.project
        d.path   = projectPath


        /* Create the django application */
        process.stdout.write( chalk.blue("Creating django project... ") )
        cmd = spawnSync(`django-admin`, ['startproject', stash.primaryModule], { cwd: sourcePath });
        fs.renameSync( path.join(sourcePath, stash.primaryModule), path.join(projectPath) )
        process.stdout.write( chalk.blue("done\n") )
        
        /* Create the virtual environment */
        process.stdout.write( chalk.blue("Creating python virtual environment... ") )
        cmd = spawnSync(`virtualenv`, ['-p', 'python3', 'venv'], { cwd: projectPath });
        process.stdout.write( chalk.blue("done\n") )
        
        /* Install django into the virtual environment */
        process.stdout.write( chalk.blue("Installing python packages... ") )
        cmd = spawnSync(`venv/bin/pip`, ['install', 'django'], { cwd: projectPath });
        process.stdout.write( chalk.blue("done\n") )

        /* Create requirements.txt file */
        process.stdout.write( chalk.blue("Creating requirements.txt file... ") )
        cmd = spawnSync(`venv/bin/pip`, ['freeze', '>', 'requirements.txt'], { cwd: projectPath });
        process.stdout.write( chalk.blue("done\n") )

        /* Migrate */
        process.stdout.write( chalk.blue("Migrating database... ") )
        cmd = spawnSync(`venv/bin/python`, ['manage.py', 'migrate'], { cwd: projectPath });
        process.stdout.write( chalk.blue("done\n") )

        /* Create .gitignore file */
        process.stdout.write( chalk.blue("Creating .gitignore file... ") )
        fs.writeFileSync( path.join(projectPath, '.gitignore'), "venv\napp/local_settings.py\n" )
        process.stdout.write( chalk.blue("done\n") )

        /* Create the agape.json file */
        this.writeProjectFile( d )

        /* Create a new scope for the new project */
        let s = new Scope( d )
        // console.log( "---->", s.project )

        /* create readme */
        process.stdout.write( chalk.blue("Creating README.md file... ") )
        const macro = new CreateReadmeMacro( s )
        await macro.run( )
        process.stdout.write( chalk.blue("done\n") )

        console.log( "\n" +  chalk.blue("Successfully created project ") + chalk.cyanBright(d.token) + "\n" )
        
    }

    async promptForProjectOptions() {

        let stash = { 
            'name': `${this.scope.project.sandbox.name} API`, 
            'slug': 'api', 
            'django': {'primaryModule': 'app'},
            'license': this.scope.project.sandbox.license,
            'author': this.scope.project.sandbox.author,
            'email': this.scope.project.sandbox.email,
            'port': `341${this.scope.project.sandbox.port || '01'}`
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
            // {
            //     name: 'license',
            //     type: 'input',
            //     message: 'License:',
            //     default: stash.license,
            // },
            // {
            //     name: 'author',
            //     type: 'input',
            //     message: 'Author:',
            //     default: stash.author,
            // },
            // {
            //     name: 'email',
            //     type: 'input',
            //     message: 'Email',
            //     default: stash.email,
            // }
        ]
        const responses = await inquirer.prompt(questions) 

        Object.assign(stash, responses)

        return stash
    }

    async promptForDjangoOptions() {

        let stash = { 
            'name': `${this.scope.project.sandbox.name} API`, 
            'slug': 'api',  
            'django': {'primaryModule': 'app'},
            'port': `431${this.scope.project.sandbox.port || '00'}`
        }

        const questions = [
            {
                name: 'django.primaryModule',
                type: 'input',
                message: 'Primary module',
                default: stash.django.primaryModule
            },
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

        // console.log( projectDescriptor )

        process.stdout.write( chalk.blue("Creating projects.json file... ") )
        fs.writeFileSync( path.join(projectDescriptor.path,'project.json'), JSON.stringify(d, null, 4) );
        process.stdout.write( chalk.blue("done\n") )


        // this.scope.templateer.renderFile( "README.md", )



        /* create readme */
        // const macro = new CreateReadmeMacro( this.scope )
        // await macro.run( )
        // console.log(chalk.blue("Created Readme"))
    }


}