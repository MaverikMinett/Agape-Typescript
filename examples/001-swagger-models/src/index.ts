
import cors from 'cors';
import express from 'express';
import api from './api.definition';

const PORT=3200

const app = express()
app.use( cors({origin: '*'}) )
app.get('', (req, res) => { res.redirect('/api')})

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
app.use( '/api', express.static('public') )
app.use( '/api', express.static(pathToSwaggerUi) )

app.use( '/swagger.json', ( req, res ) => {
    res.send( api )
})

app.listen( PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/api`)   
})

app.listen(3000)