var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var UglifyJS = require('uglify-js')

var chiiPort = process.env["CHII_PORT"];
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Shahid TV devtools", chiiPort });
});

router.get("/sdk", function (req, res, next) {
    var scriptTemplatePath = path.resolve("./public/sdk/sdk.template.js");
    var scriptCompiledPath = path.resolve("./public/sdk/sdk.compiled.js");
    // Compile the script template
    var scriptTemplate = fs.readFileSync(scriptTemplatePath, "utf8").toString();
    scriptTemplate = scriptTemplate.replace("{#PORT#}", chiiPort);
    scriptTemplate = scriptTemplate.replace("{#PREFIX#}", '338811');
    // Minify script
    scriptTemplate = UglifyJS.minify(scriptTemplate, { 
        ie8: true, // support IE8
     }).code;
    fs.writeFileSync(scriptCompiledPath, scriptTemplate)
    // Responed with script file
    res.sendFile(scriptCompiledPath);
});

module.exports = router;
