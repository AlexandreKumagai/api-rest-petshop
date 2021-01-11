const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () =>{
    const express = require('express')
    const app = express()
    app.use(bodyParser.json())
    consign().include('controllers').into(app)
    
    return app
}
