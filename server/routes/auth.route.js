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

router.route('/')
.post(function(req, res) {

  // request parameters
  var data =	{
    grant_type:"password",
    username: req.body.username,
    password: req.body.password,
    client_id: "client"
  };

  // client_id and client_secret encoded base64
  var b = new Buffer("client:secret");
  var encoded = b.toString("base64");

  //request
  request.post({
    headers: {
      "Authorization": "Basic " + encoded,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    url:'http://localhost:8080/oauth/token',
    form: data
  }, function optionalCallback(err, httpResponse, body) {
    console.log("STATUS: " + httpResponse.statusCode);
    console.log("BODY: " + body);
    res.status(httpResponse.statusCode).json(body);
  });
});
