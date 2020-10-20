var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var chiiPort = process.env["CHII_PORT"];

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Shahid TV devtools", chiiPort });
});

router.get("/sdk", function (req, res, next) {
    var scriptTemplatePath = path.resolve("./public/sdk/sdk.compiled.js");
    var scriptTemplate = fs.readFileSync(scriptTemplatePath, "utf8");
    scriptTemplate.replace("{#PORT#}", chiiPort);
    res.send(scriptTemplate);
});

module.exports = router;
