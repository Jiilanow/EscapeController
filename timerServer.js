const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors');
let app = express()

//Addon
app.use(morgan('dev'));

// Routes
const help = require('./route/help')
const message = require('./route/message')
const time = require('./route/time')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./res/html'));

// Allow externe request
let originWhitelist = ['http://localhost:4200'];
let corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));

let port = process.env.PORT || 8080


app.use('/api/message/', message)
app.use('/api/help/', help)
app.use('/api/time/', time)
app.listen(port)

console.log('Server on port ' + port)