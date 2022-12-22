
import { Controller, Body, Get, Put, Respond } from '../../../../../../ts/api/src'
import { Dictionary } from '../../../../../../ts/object/src';

import { Media } from '../../media.models'
import { StreamingBackend } from './streaming.backend';




@Controller()
export class StreamingController {

    constructor(
        private request: ApiRequest,
        private streaming: StreamingBackend
    ) { }

    @Get('stream/:id')
    @Respond(Media)
    list() {
        const { id } = this.request.params;
        return this.streaming.stream( id )
    }


}

