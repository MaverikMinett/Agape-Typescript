
import { Model } from "../../../ts/model/src/lib/decorators/model"
import { ModelDescriptor } from "../../../ts/model/src/lib/descriptors"
import { Class } from "../../../ts/object"


export class ApiDescriptor {

	title: string

	description: string

	models: ModelDescriptor[]

	addModel( model:Class|ModelDescriptor ) {
		this.models ??= []
		let descriptor = model instanceof ModelDescriptor
			? model
			: Model.descriptor(model)
		this.models.push( descriptor )
	}

	toOpenApiJson() {
		const value:any = {
			swagger: "2.0",
			info: {
				title: this.title,
				description: this.description,
				
				"termsOfService": "http://example.com/terms/",
				"contact": {
					"name": "API Support",
					"url": "http://www.example.com/support",
					"email": "support@example.com"
				},
				"license": {
					"name": "Apache 2.0",
					"url": "https://www.apache.org/licenses/LICENSE-2.0.html"
				},
				"version": "1.0.1",
				"host": "petstore.swagger.io",
				"basePath": "/api",
				"schemes": [
					"http"
				],
				"consumes": [
					"application/json"
				],
				"produces": [
					"application/json"
				],
			},
			"definitions": { 

			}
		}

		for ( const descriptor of this.models ) {
			const definition = {
				type: "object",
				properties: { } as any
			}

			for ( const name of descriptor.fields.names ) {
				definition.properties[name] = {
						type: descriptor.field(name).type || 'string'
				}
			}

			value.definitions[descriptor.symbol] = definition
		}

		console.log(value)

		return value

	}

}

