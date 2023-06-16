'use strict';
/**
 * Read the configuration file in the process config object. Config can now be used directly from process.config
 */
let constant = "./config/config.local.js";
process.config.global_config = require(constant);



let express = require('express'),
    app = express(),
    cors = require("cors"),
    responseHandler = require('./modules/middleware/responseHandler'),
    bodyParser = require('body-parser');


console.log('Initializing Server.');
console.log("Environment: " + process.env.NODE_ENV);
console.log("Loading Environment Constant: " + constant);

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use(bodyParser.json({ limit: '50mb' }));

console.log('Setting up routes.');
app.use('/', require('./routes'));


module.exports = app;

/**
 * START THE SERVER
 */
console.log('Ready for requests.');
let port = Number(process.env.PORT || process.config.global_config.server.port);
let server = app.listen(port, function () {
    console.log('server listening on port ' + server.address().port);
});

server.timeout = process.config.global_config.server.networkCallTimeout;