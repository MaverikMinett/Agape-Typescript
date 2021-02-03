
import { include } from '@agape/object'
import { Scope } from './scope'
import { LazyScope } from './traits'


export interface Command extends LazyScope {}

@include( LazyScope )
export class Command {

    constructor( scope?: Scope ) {
        if ( scope != undefined ) this.scope = scope
    }

    run( ) {
        throw new Error(`run method not implemented in ${this.constructor.name}`)
    }

}