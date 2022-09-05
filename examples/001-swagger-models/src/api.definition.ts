import { Model } from "../../../ts/model/src"
import { ApiDescriptor } from "./api.descriptor"
import { Event, EventDetail, EventList } from "./models"

/**
 * Generation of the Open API (swagger.json) spec file happens here
 */

const api = new ApiDescriptor()
api.title = "Foo API"
api.description = "An automatically generated API"
api.addModel(Event)
api.addModel(EventList)
api.addModel(EventDetail)

const d = Model.descriptor(EventList)
console.log(d)


export default api.toOpenApiJson();