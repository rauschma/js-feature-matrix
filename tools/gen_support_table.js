#!/usr/bin/env node

var fs = require('fs');

var text = fs.readFileSync(process.argv[2], "utf8");
console.log("var supportTable = {");
var objEntries = [];
text.split("\n").forEach(function (line) {
    var cells = line.split("\t");
    objEntries.push("    '"+cells[0]+"': [ "+cells.slice(1).map(function (x) { return "'"+x+"'" }).join(", ")+" ]")
});
console.log(objEntries.join(",\n"));
console.log("};");
