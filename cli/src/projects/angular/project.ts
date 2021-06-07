

import * as fs from 'fs'
import * as path from 'path'

// import { lazy } from '@agape/object'
// import { tokenize } from '@agape/string'

import { spawnSync } from 'child_process'


import { Project } from '../project'


export class AngularProject extends Project {

    // @lazy( o => new AngularTypography( o ) )
    // typography: AngularTypography

    type: string = "angular"


    async create( targetDirectory:string ) {

        if ( this.name === undefined ) throw new Error("Cannot initialize project without a name")
        if ( this.slug === undefined ) throw new Error("Cannot initialize project without a slug")

        if ( fs.existsSync( path.join( targetDirectory, this.slug) ) ) {
            throw new Error(`Cannot create project ${this.slug} in ${targetDirectory}, directory already exists` )
        }

        // create target directory if it does not exist
        fs.mkdirSync(targetDirectory, { recursive: true } )

        spawnSync(`ng`, ['new', this.slug, '--routing', '--style=scss' ], { cwd: targetDirectory });
        this.path = path.join( targetDirectory, this.slug )

        await Promise.all( [this.writeProjectFile(), this.writeReadmeFile()] )
    }


    async installMaterial() {
        return spawnSync('npm', [ 'install', '@angular/material',  '@angular/cdk', '--save' ], { cwd: this.path });
    }

    async installMoment() {
        return spawnSync('npm', [ 'install', 'moment', '--save' ], { cwd: this.path });
    }

    async installMaterialMomentAdapter() {
        return spawnSync('npm', [ 'install', '@angular/material-moment-adapter', '--save' ], { cwd: this.path });
    }


    readAngularFile() {
        return JSON.parse( fs.readFileSync( path.join(this.path, 'angular.json'), 'utf-8' ) )
    }

    readPackageFile() {
        return JSON.parse( fs.readFileSync( path.join(this.path, 'package.json'), 'utf-8' ) )
    }


}

