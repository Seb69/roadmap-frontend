"usestrict";

// Required modules
var express = require("express");
var http = require("http");
var bodyParser = require('body-parser');
var request = require("request");
var express = require("express");
var router = express.Router();

// Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// Init server
var app = express();
var server = http.createServer(app);

// ROUTES CLIENT ANGULAR
// login module
app.use("/", express.static(__dirname + "/public/login"));
// dashboard module
app.use("/dashboard", express.static(__dirname + "/public/dashboard"));
// bower_components
app.use("/bower_components",  express.static(__dirname + "/public/bower_components"));
// components
app.use("/components",  express.static(__dirname + "/public/components"));

// BRIDGE TO J2EE
var authRouter = require("./routes/auth.route.js");
app.use('/auth', authRouter);
var apiRouter = require("./routes/api.route.js");
app.use('/api', apiRouter);

// RUNNING SERVER
server.listen(CONFIG.port, function() {
  console.log("Roadmapp server is running at port " + CONFIG.port);
});
