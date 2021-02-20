

import * as chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'

import { AngularProject } from '../project'
import { tokenize } from '@agape/string'

import { spawnSync } from 'child_process'
import * as spawn from 'await-spawn'

export class AddFontToAngularProjectCommand {

    constructor ( public project: AngularProject ) {

    }

    async run( args:Array<string> = [ ] ) {

        const fontname = args.pop();
        const token = tokenize( fontname )
        
        console.log(chalk.blue("Adding font ") + chalk.magenta( fontname ) + chalk.blue(" to ") + chalk.cyan(this.project.token) + chalk.blue("..."))

        /* Install the font */
        // process.stdout.write( chalk.blue("Installing font ") + chalk.magenta( fontname ) + chalk.blue(" to ") + chalk.cyan(this.project.token) + chalk.blue("...") )
        await this.installFont( token )
        process.stdout.write( chalk.blue("done\n") )

        /* Add the css */
        // process.stdout.write( chalk.blue("Adding font to styles.scss... ") ) 
        await this.addFontStyles( token )
        process.stdout.write( chalk.blue("done\n") )

    }

    async installFont( token:string ) {
        try {
            const cmd = await spawn('npm', [ 'install', `@fontsource/${token}` ], { cwd: this.project.path });
            // console.log( cmd.toString() )
        }
        catch (e) {
            console.log(e.stderr.toString())
        }
    }

    async addFontStyles( token:string ) {

        const stylesDir = path.join(this.project.path, 'src', 'styles')
        const typographyFile = path.join( stylesDir, '_typography.scss' )

        fs.mkdirSync( stylesDir, { recursive: true } ) 

        fs.appendFileSync( typographyFile,  `@import "@fontsource/${token}";\n`);
    }

    promptForFont() {

    }

}


