
import { include } from '@agape/object'
import { Scope } from './scope'
import { LazyScope } from './traits'


export interface Macro extends LazyScope {}

@include( LazyScope )
export class Macro {

    constructor( scope?: Scope ) {
        if ( scope != undefined ) this.scope = scope
    }

}