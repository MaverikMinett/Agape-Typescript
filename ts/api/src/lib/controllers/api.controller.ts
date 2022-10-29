import { Router } from '../router';

// TODO: REMOVE THIS
export abstract class ApiController {

    // CONTROLLER SHOULD BE AGNOSTIC (NO ROUTER)
    router: Router<ApiController> = new Router(this)

    // PATH BELONGS ON THE CONTROLLER DESCRIPTOR (CONRTOLLER DECORATOR)
    path: string

}


