import { Dictionary } from "../../../object/src/lib/types"



class ApiRequest {

    body: any

    params: Dictionary

    queryParams: Dictionary

    route: string[]

    context: 'commander'|'rest'|string

}
