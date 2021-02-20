

import * as fs from 'fs'
import * as path from 'path'

// import { lazy } from '@agape/object'
// import { tokenize } from '@agape/string'

import { spawnSync } from 'child_process'


import { Project } from '../project'
import { WSASERVICE_NOT_FOUND } from 'constants'


export class DjangoProject extends Project {

    type: string = "django"

    primaryModule: string = "app"

    get settingsFilePath():string {
        return path.join( this.path, this.primaryModule, 'settings.py' );
    }

    async create( targetDirectory:string ) {

        if ( this.name === undefined ) throw new Error("Cannot initialize project without a name")
        if ( this.slug === undefined ) throw new Error("Cannot initialize project without a slug")

        if ( fs.existsSync( path.join( targetDirectory, this.slug) ) ) {
            throw new Error(`Cannot create project ${this.slug} in ${targetDirectory}, directory already exists` )
        }

        // create target directory if it does not exist
        fs.mkdirSync(targetDirectory, { recursive: true } )

        this.path = path.join( targetDirectory, this.slug )

        await this.startDjangoProject( targetDirectory )
        await Promise.all( [this.writeProjectFile(), this.writeReadmeFile()] )

        await this.createVirtualEnvironment()
        await this.installDjangoToVirtualEnv()
        await this.createRequirementsFile()
        await this.migrateDatabase()
        await this.createGitIgnoreFile()

        await this.addCsrfToSettingsFile()
    }

    async startDjangoProject( targetDirectory ) {
        spawnSync(`django-admin`, ['startproject', this.primaryModule], { cwd: targetDirectory });
        fs.renameSync( path.join(targetDirectory, this.primaryModule), path.join(targetDirectory, this.slug) )
    }

    async createVirtualEnvironment() {
        spawnSync(`virtualenv`, ['-p', 'python3', 'venv'], { cwd: this.path, stdio: 'pipe' });
    }

    async installDjangoToVirtualEnv() {
        spawnSync(`venv/bin/pip`, ['install', 'django'], { cwd: this.path, stdio: 'pipe' });
    }

    async createRequirementsFile() {
        spawnSync(`venv/bin/pip`, ['install', 'django'], { cwd: this.path, stdio: 'pipe' });
    }

    async migrateDatabase() {
        spawnSync(`venv/bin/python`, ['manage.py', 'migrate'], { cwd: this.path, stdio: 'pipe' });
    }

    async createGitIgnoreFile() {
        fs.writeFileSync( path.join(this.path, '.gitignore'), `venv\n${this.primaryModule}/settings_local.py\n` )
    }

    async installDjangoCorsHeaders() {

        // install cors to venv
        spawnSync(`venv/bin/pip`, ['install', 'django-cors-headers'], { cwd: this.path, stdio: 'pipe' });

        // add middleware to settings file
        this.addMiddlewareToSettingsFile(
            'corsheaders.middleware.CorsMiddleware',
            { before: 'django.middleware.common.CommonMiddleware'})

        // add cors settings to settings file
        const settings = `
## CORS Settings, see https://pypi.org/project/django-cors-headers/

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOWED_ORIGINS = []

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-xsrf-token',
    'x-requested-with',
)

`

        fs.appendFileSync( this.settingsFilePath, settings )
    }

    async addCsrfToSettingsFile() {
        const settings = `
## CSRF Settings, Default settings used by angular

CSRF_COOKIE_NAME="XSRF-TOKEN"
CSRF_HEADER_NAME="HTTP_X_XSRF_TOKEN"

`
        fs.appendFileSync( this.settingsFilePath, settings )
    }

    async installDjangoRestFramework() {
        spawnSync(`venv/bin/pip`, ['install', 'djangorestframework'], { cwd: this.path, stdio: 'pipe' });
        this.addAppToSettingsFile(['rest_framework'])
    }

    async installDjangoJWT() {
        spawnSync(`venv/bin/pip`, ['install', 'djangorestframework-jwt'], { cwd: this.path, stdio: 'pipe'});
    }

    private addAppToSettingsFile( app:string|Array<string> )  {

        const apps = typeof app === "string" ? [ app ] : app

        console.log("Adding to settings file..." )

        const settingsFilePath = path.join( this.path, this.primaryModule, 'settings.py' );
        const input = fs.readFileSync( settingsFilePath, 'utf-8' )
        let output:Array<string> = []

        let appsBlockOpen:boolean = false
        let appsBlockClosed:boolean = false
        for ( let line of input.split("\n") ) {

            if ( appsBlockOpen ) {
                console.log("appsBlockOpen")
                // if found end of apps block, add apps into output here
                if ( line.match(/^\s*\]/) ) {
                    // ensure last line has a comma at the end
                    if ( ! (output[output.length - 1].match(/,\s*$/) ) ) {
                        output[output.length - 1] = output[output.length - 1] + ","
                    }
                    // add apps
                    for ( let app of apps ) {
                        console.log("adding app");
                        output.push( `    '${app}',` )
                    }
                    output.push(line)
                    appsBlockOpen = false
                    appsBlockClosed = true
                }
                else {
                    output.push(line)
                }

            }

            else if ( appsBlockClosed == false && line.match(/^\s*INSTALLED_APPS\s+=/) ) {
                console.log("found installed apps")
                appsBlockOpen = true
                output.push(line)
            }

            else {
                output.push(line)
            }
        }

        fs.writeFileSync(settingsFilePath, output.join("\n") + "\n" )
    }

    addMiddlewareToSettingsFile( middleware:string|Array<string>, opts:{[key:string]: any} = {} ) {
        middleware = typeof middleware === "string" ? [ middleware ] : middleware

        console.log("Adding to settings file..." )

        const settingsFilePath = path.join( this.path, this.primaryModule, 'settings.py' );
        const input = fs.readFileSync( settingsFilePath, 'utf-8' )
        let output:Array<string> = []

        let blockOpen:boolean = false
        let blockClosed:boolean = false

        let placementRegex 
        if ( opts.after) placementRegex = new RegExp(opts.after.replace('.', '\\.') )
        if ( opts.before ) placementRegex = new RegExp(opts.before.replace('.', '\\.') )
        for ( let line of input.split("\n") ) {

            if ( blockOpen ) {
                console.log("blockOpen")

                // if adding after specific line
                if ( opts.after && line.match(placementRegex) ) {
                    // ensure line has comma at the end
                    if ( ! ( line.match(/,\s*$/) ) ) line += ","
                    output.push(line)
                    // add apps
                    for ( let app of middleware ) {
                        console.log("adding app");
                        output.push( `    '${app}',` )
                    }
                    blockOpen = false
                    blockClosed = true
                }

                if ( opts.before && line.match(placementRegex) ) {
                    for ( let app of middleware ) {
                        console.log("adding app");
                        output.push( `    '${app}',` )
                    }
                    output.push(line)
                    blockOpen = false
                    blockClosed = true
                }

                // if adding before end of middleware block
                else if ( !(opts.after) && line.match(/^\s*\]/) ) {
                    // ensure last line has a comma at the end
                    if ( ! (output[output.length - 1].match(/,\s*$/) ) ) {
                        output[output.length - 1] +=  ","
                    }
                    // add apps
                    for ( let app of middleware ) {
                        console.log("adding app");
                        output.push( `    '${app}',` )
                    }
                    output.push(line)
                    blockOpen = false
                    blockClosed = true
                }
                else {
                    output.push(line)
                }

            }

            else if ( blockClosed == false && line.match(/^\s*MIDDLEWARE\s+=/) ) {
                console.log("found installed apps")
                blockOpen = true
                output.push(line)
            }

            else {
                output.push(line)
            }
        }

        fs.writeFileSync(settingsFilePath, output.join("\n") + "\n" )
    }

}

