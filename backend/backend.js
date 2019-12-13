"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");
var records = require('./records.json');
var app = express();
var port = 8080;
app.use(cors());
app.options('/', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.json(records);
});
app.post('/', function (req, res) {
    var newRec = req.body;
    newRec.deleted = false;
    records.push(newRec);
    fs.writeFile('records.json', JSON.stringify(records), function () { });
    res.end();
});
app["delete"]('/', function (req, res) {
    var to_delete = req.body;
    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
        if (record.name == to_delete.name &&
            record.reason == to_delete.reason &&
            record.amount == to_delete.amount &&
            !record.deleted) {
            record.deleted = true;
            fs.writeFile('records.json', JSON.stringify(records), function () { });
            res.end();
            return;
        }
    }
    res.end();
});
app.listen(8080, function () { });
