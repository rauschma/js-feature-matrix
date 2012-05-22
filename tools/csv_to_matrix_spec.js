#!/usr/bin/env node

var fs = require('fs');

var FIRST_COL = 4;
function main(text) {
    var lines = text.split("\n");
    var colTitles = lineToArray(lines[0]);
    var result = { };
    lines.slice(1).forEach(function (line) {
        if (line.indexOf(",") < 0) return;
        var cells = lineToArray(line);
        var userAgent = cells[0];
        var shortUserAgent = abbreviateUserAgent(userAgent);

        if (shortUserAgent !== null) {
            getArraySafely(result, "").push({ title: shortUserAgent, tooltip: userAgent });
            for(var i=FIRST_COL; i<cells.length; i++) {
                var key = colTitles[i];
                var value = Number(cells[i]);
                getArraySafely(result, key).push(value); // push a string
            }
        }
    });
    console.log("var matrixBrowsers = "+JSON.stringify(result, null, 4)+";");
}

// Trim both before and after a quote (")
var CELL_REGEX = /^\s*"\s*(.*?)\s*"\s*$/;
function lineToArray(line) {
    var cells = line.split(",");
    return cells.map(function (cell) {
        var match = CELL_REGEX.exec(cell);
        if (!match) {
            throw new Error("No match for: "+JSON.stringify(cell));
        }
        return match[1];
    });
}

function abbreviateUserAgent(userAgent) {
    var result;
    var foundMatch = USER_AGENTS.some(function (elem) {
        if (elem[0].test(userAgent)) {
            if (elem[1] === null) {
                result = null;
            } else {
                result = userAgent.replace(elem[0], elem[1]);
            }
            return true; // break
        }
    });
    return foundMatch ? result : userAgent;
}
var USER_AGENTS = [
    [ /^Android (.+)$/, "Andr $1" ],
    [ /^Chrome ([0-9]+\.[0-9]+)\.[0-9]+$/, "Chr $1" ],
    [ /^Chromium ([0-9]+\.[0-9]+)\.[0-9]+$/, null ],
    [ /^Fennec (.+)$/, "Fen $1" ],
    [ /^Firefox (.+)$/, "FF $1" ],
    [ /^IE 8 in Compatibility Mode (.+)$/, "IE 8 as $1" ],
    [ /^IE (.+)$/, "IE $1" ],
    [ /^iPad (.+)$/, "iPad $1" ],
    [ /^iPhone (.+)$/, "iPh $1" ],
    [ /^Opera ([0-9]+)\.[0-9]+$/, "Op $1" ],
    [ /^Opera Mini ([0-9]+)\.[0-9]+$/, "OpM $1" ],
    [ /^Safari (.+)$/, "Saf $1" ]
];



function getArraySafely(obj, key) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = [];
    }
    return obj[key];
}

function streamToString(stream, callback) {
    var str = "";
    stream.on('data', function (data) {
        str += data;
    });

    stream.on('end', function () {
        callback(str);
    });
}

// Call main
process.stdin.resume();
streamToString(process.stdin, main);


/*

"useragent", "ua_rowscore_display", "ua_rowscore_1-10", "", "Array.isArray", "Array.prototype:indexOf", "Array.prototype:iterate", "Array.prototype:reduce", "Date.now", "Date.prototype.toISOString", "Function.prototype.bind", "JSON", "Object.create", "Object.getPrototypeOf", "Object:prop_def", "Object:prop_names", "Object:protect", "String.prototype.trim", "arguments.callee", "getters_setters", "named_func_expr", "reserved_prop_names", "str_index", "strict_mode", "trailing_comma "
"Android 4.0.4", "", "0" , "" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "0" , "1"

matrix.spec = {
    '': [ 'IE', 'FF', 'Chr', 'Op', 'Saf', 'SafM', 'Andr', 'OpM' ],
    'Object.create': [ '9', '4', '7', '12', '5', '', '', '' ],
};

*/