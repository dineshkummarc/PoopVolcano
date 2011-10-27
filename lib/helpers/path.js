module.exports.rebase = rebase;
module.exports.readJSON = readJSON;
var util = require('util');

var path = require('path');

//Lightly adapted from https://github.com/substack/node-optimist
function rebase (base, dir) {
    var ds = path.normalize(dir).split('/').slice(1);
    var bs = path.normalize(base).split('/').slice(1);

    for (var i = 0; ds[i] && ds[i] == bs[i]; i++);
    ds.splice(0, i); bs.splice(0, i);

    var p = path.normalize(
        bs.map(function () { return '..'; }).concat(ds).join('/')
    ).replace(/\/$/,'').replace(/^$/, '.');
    return p.match(/^[.\/]/) ? p : './' + p;
}

function readJSON(file) {
    var fs = require('fs');
    try {
        return JSON.parse(fs.readFileSync(file) + "");
    } catch (x) {
        return null;
    }
}