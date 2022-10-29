
import { Model } from "../../../ts/model/src/lib/decorators/model"
import { ModelDescriptor } from "../../../ts/model/src/lib/descriptors"
import { Class } from "../../../ts/object/src"
import {
	Api,
	ActionDescriptor,
	Controller,
	ApiController,
	Router,
	BodyDescriptor,
	ControllerDescriptor
} from '../../../ts/api/src';


const BASE = {
	"openapi": "3.0.3",
	"title": "Sample Pet Store App",
	"description": "This is a sample server for a pet store.",
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
	"version": "3.0.3",
	"servers": [
		{ "url": "petstore.swagger.io", "description": "Swagger Pet store" }
	],
	"basePath": "/api",
	"paths": {

	},
	"components": {
		"schemas": { },
		"requestBodies": { },
	}
}

export class SwaggerApi {

	title: string

	description: string

	models: ModelDescriptor[]

	routers: Router<ApiController>[] = []

	apis: Api[] = []

	addApi( api: Api ) {
		this.apis.push(api)
	}

	addModel( model:Class|ModelDescriptor ) {
		this.models ??= []
		let descriptor = model instanceof ModelDescriptor
			? model
			: Model.descriptor(model)

		// TODO: Could be a map
		if ( ! this.models.includes(descriptor) ) {
			this.models.push( descriptor )
		}

		const ref = `#/components/schemas/${descriptor.symbol}`
		return ref
	}

	addRouter( router: Router<ApiController> ) {
		this.routers.push( router )
	}

	toOpenApiJson() {
		const openApi:any = { ...BASE }

		const apiPath = 'api';
		for (let api of this.apis) {
			for ( let controller of api.controllers ) {
				// console.log("Controller", controller )
				// const prototype = Object
				//
				// getPrototypeOf(controller)
				const controllerClass = controller.constructor
				const controllerPath  = controller.path
				const controllerDescriptor = Controller.descriptor(controllerClass)

				for ( let action of controllerDescriptor.actions.values() ) {
					const actionRoute = action.route()
					const actionPath = actionRoute.path
					let path = '';
					apiPath && ( path += `/${apiPath}` );
					controllerPath && ( path += `/${controllerPath}` );
					actionPath && ( path += `/${actionPath}` );

					const operationDefinition = this.buildOperationDefinition( controllerDescriptor, action )

					openApi.paths[path] ??= {}
					Object.assign(openApi.paths[path], operationDefinition)

				}
				console.log("==================================================")
				console.log(controllerDescriptor.actions.entries())
				console.log("==================================================")
			}
		}

		// Generate swagger model definitions docs using model meta data
		for ( const descriptor of this.models ) {
			const definition = this.buildModelDefinition(descriptor)
			openApi.components.schemas[descriptor.symbol] = definition
		}

		return openApi

	}

	buildModelDefinition( descriptor: ModelDescriptor ) {
		const modelDefinition = {
			type: "object",
			properties: { } as any
		}

		// Create Open API model property definitions from model metadata
		for ( const name of descriptor.fields.names ) {
			const fieldDescriptor =  descriptor.field(name)
			const fieldDefinition: any = { type: fieldDescriptor.type || 'string' }

			if ( fieldDescriptor.example ) {
				fieldDefinition.example = fieldDescriptor.example
			}

			modelDefinition.properties[name] = fieldDefinition
		}

		return modelDefinition
	}


	buildRequestBody( body: BodyDescriptor ) {
		const $ref = this.addModel( body.model )

		const requestBody = {
			description: body.description,
			content: {
				[body.contentType]: {
					schema: { $ref }
				}
			}
		}

		return requestBody
	}

	buildOperationDefinition( controller: ControllerDescriptor, action: ActionDescriptor ) {
		const operationDefinition: any = {
			"description": action.getDescription(),
			"produces": [
				"application/json"
			],
			"responses": {
				[action.status()]: {
					"description": "Success",
					"schema": {
						"type": "array",
						"items": {
							"$ref": "#/definitions/Pet"
						}
					}
				}
			}
		}

		const bodyDescriptor = action.body()
		if ( bodyDescriptor ) {
			const requestBody = this.buildRequestBody( bodyDescriptor )
			operationDefinition.requestBody = requestBody
		}

		return { [action.route().method]: operationDefinition }
	}

}

