
import * as path from 'path'
import * as fs from 'fs'
import * as handlebars from 'handlebars'

import { deflate } from '@agape/object'



import { Macro } from '../lib/macro'




export class CreateReadmeMacro extends Macro {

    public async run ( ) {

        let data = deflate( this.scope.project )
        this.scope.templateer.renderFile(
            "README.md", path.join( this.scope.project.path, "README.md"), { project: data }
        )



        // console.log( this.scope )

        // this.scope.renderFile( 'README.md' )

        // this.scope.templateer.renderFile



        // let t = new Templateer( deflate(this.scope) )
        // t.render( 'README.md' )


        // // console.log( this.scope )

        // // console.log( JSON.stringify(this.scope))

        // let context = deflate( this.scope )

        // console.log( context )

        // const filepath = path.join( __dirname, '..', 'templates', 'README.md' );

        // const text = fs.readFileSync( filepath, "utf-8" );

        // const template = handlebars.compile(text);

        // fs.writeFileSync( path.join( this.scope.project.path, 'README.md'), template(context) );
    }


    // deflateObject( o:any ) {
    //     o = JSON.parse(JSON.stringify(o))

    //     function _deflate( o ) {
    //         let r:any = {}
    //         for ( let field in o ) {
    //             let key = field
    //             if ( field.startsWith('ʘ') ) key = field.substring(1)

    //             let value = o[field]
    //             if ( value instanceof Object ) value = _deflate(value)
    //             r[key] = value
    //         }
    //         return r
    //     }

    //     return _deflate( o )

    // }


    
}