var express = require('express');
var router = express.Router();
var path = require("path")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shahid TV devtools' });
});

router.get('/sdk', function(req, res, next) {
  res.sendFile(path.resolve("./public/sdk/sdk.compiled.js"));
});

module.exports = router;
