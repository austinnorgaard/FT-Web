var express = require("express");
var console = require("console");
var compression = require("compression");
var app = express();
var path = require("path");
var cors = require("cors");
var public = path.join(__dirname, "dist");

app.use(cors());
app.use(new compression());
app.use(express.static(__dirname + "/dist"));

app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/dist" });
});

app.listen(80);
