
import { Api, Module } from '../../../api/src'

export class Commander {

    constructor( public api: Api ) {

    }


    displayHelp() {


    }
    
    
    displayControllerMenu() {
        
        for ( const module of this.api.modules ) {
            const descriptor = Module.descriptor( module )
            console.log( descriptor.name )
            console.log( descriptor.description )
        }
        
        // for each controller

        // display the controller name and description


    }

    run() {
        
    }

}
