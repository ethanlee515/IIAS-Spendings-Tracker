"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var id = crypto.randomBytes(16).toString("hex");
console.log(id);
