
import { Controller, Body, Get, Put, Respond } from '../../../../../../ts/api/src'

import { Media } from '../../media.models'

import { LibraryBackend } from './library.backend';


@Controller({ path: 'library' })
export class LibraryController {

    constructor( private library: LibraryBackend ) { }

    @Get()
    @Respond(Media)
    list() {
        return this.library.list()
    }

    @Get()
    @Respond(null)
    index() {

    }

    @Put(':id')
    @Body(Media)
    update() {

    }

    @Get(':id')
    @Respond(Media)
    retrieve() {

    }
}


// export class LibraryCommandParser {
//
//
//     update = {
//         positional: ['params.id'],
//         // body == named arguments
//     }
//
//     retrieve = {
//         positional: ['params.id'],
//         named: {
//             view: 'headers.x-.........'
//         },
//         named2: {
//             view: {
//                 description: 'Some descriprtoion',
//                 mapTo: 'headers.x-xxxxxxxxxxx',
//                 transformer: () => {}
//             }
//         }
//         // body == named arguments
//     }
//
//
//     // mk library update 2349823 --title "Johhny Cash"
//
// }
//
