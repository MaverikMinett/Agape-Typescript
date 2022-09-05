
import { Model } from "../../../ts/model/src/lib/decorators/model"
import { ModelDescriptor } from "../../../ts/model/src/lib/descriptors"
import { Class } from "../../../ts/object/src"


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

		// Generate swagger model definitions docs using model meta data
		for ( const descriptor of this.models ) {

			// Open API model definition
			const definition = {
				type: "object",
				properties: { } as any
			}

			// Create Open API model property definitions from model meta data
			for ( const name of descriptor.fields.names ) {
				definition.properties[name] = {
						type: descriptor.field(name).type || 'string'
				}
			}

			// Add the model definition to the open api spec
			value.definitions[descriptor.symbol] = definition
		}

		console.log(value)

		return value

	}

}

