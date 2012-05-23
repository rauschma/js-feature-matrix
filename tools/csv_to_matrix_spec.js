#!/usr/bin/env node

var fs = require('fs');

function main(text) {
    var rowArrays = text.split("\n")
        .filter(function (l) { return l.indexOf(",") >= 0 })
        .map(lineToArray);
    var colTitles = rowArrays.shift(); // use and remove first row
    var firstTestCol = colTitles.indexOf("") + 1;

    var rowMaps = [];

    rowArrays.forEach(function (rowArray) {
        var rowMap = {};

        rowMap.userAgent = rowArray[0];
        rowMap.sortKey = rowMap.userAgent.toLowerCase(); // We need full version
        rowMap.shortUserAgent = abbreviateUserAgent(rowMap.userAgent);

        if (rowMap.shortUserAgent !== null) { // skip row?
            for(var colCount=firstTestCol; colCount < rowArray.length; colCount++) {
                var key = colTitles[colCount];
                var value = Number(rowArray[colCount]);
                rowMap[key] = value;
            }
            rowMaps.push(rowMap);
        }
    });
    var testNames = colTitles.slice(firstTestCol);

    // Sort by user agent, but in reverse, so that more specific (minor) versions come first
    // (later rows with the same major version can be skipped)
    rowMaps.sort(function (a, b) {
        return compareStrings(b.sortKey, a.sortKey);
    });

    var result = {};
    var visitedAgents = {};

    rowMaps.forEach(function (row) {
        if (!visitedAgents[row.shortUserAgent]) {
            visitedAgents[row.shortUserAgent] = true;
            getArraySafely(result, "").unshift({ title: row.shortUserAgent, tooltip: row.userAgent });
            testNames.forEach(function (testName) {
                getArraySafely(result, testName).unshift(row[testName]);
            });
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
    [ /^Android ([0-9]+\.[0-9]+)\.[0-9]+$/, "Andr $1" ],
    [ /^Chrome ([0-9]+\.[0-9]+)\.[0-9]+$/, "Chr $1" ],
    [ /^Chromium ([0-9]+\.[0-9]+)\.[0-9]+$/, null ],  // ignore
    [ /^Fennec (.+)$/, "Fen $1" ],
    [ /^Firefox (.+)$/, "FF $1" ],
    [ /^IE 8 in Compatibility Mode ([0-9]+\.[0-9]+)\.[0-9]+$/, "IE 8 as $1" ],
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

function compareStrings(a, b) {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return +1;
    }
}

// Call main
process.stdin.resume();
streamToString(process.stdin, main);


/*

"useragent", "ua_rowscore_display", "ua_rowscore_1-10", "", "Array.isArray", "Array.prototype:indexOf", "Array.prototype:iterate", "Array.prototype:reduce", "Date.now", "Date.prototype.toISOString", "Function.prototype.bind", "JSON", "Object.create", "Object.getPrototypeOf", "Object:prop_def", "Object:prop_names", "Object:protect", "String.prototype.trim", "arguments.callee", "getters_setters", "named_func_expr", "reserved_prop_names", "str_index", "strict_mode", "trailing_comma "
"Android 4.0.3", "", "0" , "" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "0" , "1"
"Android 4.0.4", "", "0" , "" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "1" , "0" , "1"

matrix.spec = {
    '': [ 'IE', 'FF', 'Chr', 'Op', 'Saf', 'SafM', 'Andr', 'OpM' ],
    'Object.create': [ '9', '4', '7', '12', '5', '', '', '' ],
};

*/