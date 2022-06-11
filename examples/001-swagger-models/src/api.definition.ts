import { ApiDescriptor } from "./api.descriptor"
import { EventDetail, EventList } from "./models"

const api = new ApiDescriptor()
api.title = "Foo API"
api.description = "An automatically generated API"
api.addModel(EventList)
api.addModel(EventDetail)


export default api.toOpenApiJson();