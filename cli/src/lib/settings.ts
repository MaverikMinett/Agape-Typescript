
import * as fs from 'fs'
import * as path from 'path'

import { build, lazy } from '@agape/object'

import { AuthorDescriptor } from './descriptors'

import { load_author_file } from '../lib/util'

export class Settings {

    @lazy @build
    appDataDir: string

    @lazy @build
    author: AuthorDescriptor

    _build_appDataDir() {
        const system_appdata_dir = process.env.APPDATA 
        || ( process.platform == 'darwin' 
                ? process.env.HOME + '/Library/Preferences' 
                : process.env.HOME + "/.local/share" )

        return path.join( system_appdata_dir, 'agape' );
    }


    _build_author() {
        const filepath = path.join( this.appDataDir, 'author.json' );
        return load_author_file( filepath )
    }

}