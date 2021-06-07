

import { AngularProject } from '../project'
import { AddFontToAngularProjectCommand } from './add.font'


export class AddToAngularProjectCommand {

    constructor ( public project: AngularProject ) {

    }

    run( args:Array<string> = [ ] ) {

        let resource = args.pop()
        this.getHandler( resource ).run( args )
    }

    getHandler( resource ) {

        switch( resource ) {
            case "font":
                return new AddFontToAngularProjectCommand( this.project )
        }
    }

}


