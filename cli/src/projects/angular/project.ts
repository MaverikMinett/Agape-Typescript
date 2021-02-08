

import * as fs from 'fs'
import * as path from 'path'

import { lazy } from '@agape/object'
import { tokenize } from '@agape/string'

import { spawnSync } from 'child_process'
import * as chalk from 'chalk'

import { ProjectDescriptor } from '../../lib/descriptors'
import { Scope } from '../../lib/scope'



export class AngularTypography {

    
    constructor( public project: AngularProject ) {

    }


    get typographyFile() {
        return path.join(this.project.path, 'src/styles/_typography.scss')
    }

    createTyopgraphyFile() {
        fs.writeFileSync( this.typographyFile, "" )
    }

    typographyFileExists() {
        return fs.existsSync( this.typographyFile )
    }

    installFont( token:string ) {
        let cmd = spawnSync('npm', [ 'install', '@fontsource/${token}' ], { cwd: this.project.path });
    }

    importFont( token: string ) {
        fs.appendFileSync( this.typographyFile, "@import '@fontsource/${token}'\n")
    }

    addFont( fontName: string ) {
        const token = tokenize( fontName )

        this.installFont( token )

        if ( ! this.typographyFileExists() ) this.createTyopgraphyFile

        this.importFont( token )
    }




    // public async addMaterialIconsToAngularProject( ) {
    //     console.log("Adding material icons to project")
    //     this.addFontToAngularProject("material-icons")
    // }


    // public async addFontToAngularProject ( fontName:string ) {

    //     let cmd
    //     let token = tokenize( fontName )

    //     let p = this.scope.project

    //     process.stdout.write( chalk.blue(`Installing font ${fontName}... `) )
    //     cmd = spawnSync('npm', [ 'install', '@fontsource/${token}' ], { cwd: p.path });
    //     process.stdout.write( chalk.blue("done\n") )

    //     try {
    //         fs.appendFileSync( path.join(p.path, 'src', 'styles.scss'), "\n" + `import "@fontsource/${token}"` + "\n");
    //         process.stdout.write( chalk.blue("done\n") )
    //     }
    //     catch (error) {
    //         process.stdout.write( chalk.red("error\n") )
    //         process.stdout.write( chalk.red(`  ${error}error\n`) )
    //     }

    // }

}


export class AngularProject extends ProjectDescriptor {

    // @lazy( o => new AngularTypography( o ) )
    // typography: AngularTypography


    async create( slug:string, sourcePath:string ) {

        if ( fs.existsSync( path.join( sourcePath, slug) ) ) {
            throw new Error(`Cannot create project ${slug} in ${sourcePath}, directory already exists` )
        }

        const cmd = spawnSync(`ng`, ['new', slug, '--routing', '--style=scss' ], { cwd: sourcePath });

        this.path = path.join( sourcePath, slug )
    }


    async installMaterial() {
        const cmd = spawnSync('npm', [ 'install', '@angular/material',  '@angular/cdk', '--save' ], { cwd: this.path });
    }

    async installMoment() {
        const cmd = spawnSync('npm', [ 'install', 'moment', '--save' ], { cwd: this.path });
    }

    async installMaterialMomentAdapter() {
        const cmd = spawnSync('npm', [ 'install', '@angular/material-moment-adapter', '--save' ], { cwd: this.path });
    }


    readAngularFile() {
        return JSON.parse( fs.readFileSync( path.join(this.path, 'angular.json'), 'utf-8' ) )
    }

    readPackageFile() {
        return JSON.parse( fs.readFileSync( path.join(this.path, 'package.json'), 'utf-8' ) )
    }


}

