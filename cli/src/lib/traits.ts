

import { lazy } from '@agape/object'
import { Scope } from './scope'

export class LazyScope {

    @lazy( o => new Scope() )
    public scope: Scope

}