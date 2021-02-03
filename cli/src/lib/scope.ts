/* Files */
import * as path from 'path'

import { build, lazy, nonenumerable } from '@agape/object'
import { Templateer } from '@agape/templateer'

import { load_closest_project } from '../lib/util'

import { ProjectDescriptor } from './descriptors'
import { Settings } from './settings'

/**
 * Cli application state
 */
export class Scope {

    @lazy( o => load_closest_project() )
    project: ProjectDescriptor

    @lazy( o => new Settings() )
    settings: Settings

    @nonenumerable @lazy @build
    templateer: Templateer

    /**
     * @param stash For holding user responses and temporary data
     */
    constructor( project?:ProjectDescriptor, public stash:{[key:string]:any} = {} ) {
        if ( project != undefined ) this.project = project
    }

    _build_templateer() {
        let t = new Templateer()

        t.addSource( path.join( this.settings.appDataDir, 'templates' ) )

        t.addSource( path.join( path.dirname(__dirname), 'templates' ) )

        return t
    }

    renderFile( filepath:string, outpath?:string ) {
        let templatePath = filepath
        let targetPath   = outpath || templatePath;

        this.templateer.renderFile( templatePath, targetPath, this )
    }

}