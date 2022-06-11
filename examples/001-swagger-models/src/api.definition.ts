import { Model } from "../../../ts/model/dist/cjs"
import { ApiDescriptor } from "./api.descriptor"
import { EventDetail, EventList } from "./models"

const api = new ApiDescriptor()
api.title = "Foo API"
api.description = "An automatically generated API"
api.addModel(EventList)
api.addModel(EventDetail)

const d = Model.descriptor(EventList)
console.log(d)


export default api.toOpenApiJson();