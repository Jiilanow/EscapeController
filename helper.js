const fs = require("fs")
let helper = {}

helper.writeJSON = function (path, json) {
    fs.writeFileSync(path, JSON.stringify(json))
}

helper.readJSON = function (path) {
    return JSON.parse(fs.readFileSync(path))
}

module.exports = helper