
import { Model } from "../../../ts/model/src/lib/decorators/model"
import { ModelDescriptor } from "../../../ts/model/src/lib/descriptors"
import { Class } from "../../../ts/object/src"
import { Api, ActionDescriptor, Controller, ApiController, Router } from '../../../ts/api/src';


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
		this.models.push( descriptor )
	}

	addRouter( router: Router<ApiController> ) {
		this.routers.push( router )
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

			},
			"paths": {
				"/pets": {
					"get": {
						"description": "Returns all pets from the system that the user has access to",
						"produces": [
							"application/json"
						],
						"responses": {
							"200": {
								"description": "A list of pets.",
								"schema": {
									"type": "array",
									"items": {
										"$ref": "#/definitions/Pet"
									}
								}
							}
						}
					}
				}
			},
		}

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

					const definition = {
						[action.route().method]: {
							"description": "Returns all pets from the system that the user has access to",
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
					}
					value.paths[path] ??= {}
					Object.assign(value.paths[path], definition)

					console.log()
				}
				console.log("==================================================")
				console.log(controllerDescriptor.actions.entries())
				console.log("==================================================")
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

		// Generate paths from routers
		// for ( let router of this.routers ) {
		// 	for ( let route of router.routes ) {
		//
		// 		// Model.field()
		//
		// 		const definition = {
		// 			[route.method]: {
		// 				"description": "Returns all pets from the system that the user has access to",
		// 				"produces": [
		// 					"application/json"
		// 				],
		// 				"responses": {
		// 					"200": {
		// 						"description": "A list of pets.",
		// 						"schema": {
		// 							"type": "array",
		// 							"items": {
		// 								"$ref": "#/definitions/Pet"
		// 							}
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 		value.paths[route.path] ??= {}
		// 		Object.assign(value.paths[route.path], definition)
		// 	}
		// }

		// console.log(value)

		return value

	}



}

