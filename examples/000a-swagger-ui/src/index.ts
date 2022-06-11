
import cors from 'cors';
import express, { Router } from 'express';

const PORT=3200

const app = express()
app.use( cors({origin: '*'}) )
app.get('', (req, res) => { res.redirect('/api')})

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
app.use( '/api', express.static('public') )
app.use( '/api', express.static(pathToSwaggerUi) )
app.use( '/swagger.json', ( req, res ) => {
    res.send({
        "swagger": "2.0",
        "info": {
          "version": "1.0.0",
          "title": "Swagger Petstore",
          "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
          "termsOfService": "http://swagger.io/terms/",
          "contact": {
            "name": "Swagger API Team"
          },
          "license": {
            "name": "MIT"
          }
        },
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
        "definitions": {
          "Pet": {
            "type": "object",
            "required": [
              "id",
              "name"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              },
              "tag": {
                "type": "string"
              }
            }
          }
        }
      })
})
app.listen( PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/api`)   
})





app.listen(3000)