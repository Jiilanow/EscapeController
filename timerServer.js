const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
let app = express()

//Addon
app.use(morgan('dev'));

// Routes
const help = require('./route/help')
const message = require('./route/message')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080


app.use('/api/message/', message)
app.use('/api/help/', help)
app.listen(port)

console.log('Server on port ' + port)