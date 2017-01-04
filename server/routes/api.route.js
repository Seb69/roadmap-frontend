"usestrict";

var bodyParser = require('body-parser');
var request = require("request");
var  express = require("express");
var  router = express.Router();
module.exports = router;

router.use( bodyParser.json() );
router.use(bodyParser.urlencoded({
  extended: true
}));

router.route('/users')
.get(function(req, res) {
  request.get({
    headers: req.headers,
    url:'http://localhost:8080/api/users'
  }, function optionalCallback(err, httpResponse, body) {
    console.log("STATUS: " + httpResponse.statusCode);
    console.log("BODY: " + body);
    res.status(httpResponse.statusCode).json(body);
  });
});

router.route('/users')
.post(function(req, res) {
  request.post({
    headers: req.headers,
    url:'http://localhost:8080/api/users',
    json: req.body
  }, function optionalCallback(err, httpResponse, body) {
    console.log("STATUS: " + httpResponse.statusCode);
    console.log("BODY: " + body);
    res.status(httpResponse.statusCode).json(body);
  });
});
