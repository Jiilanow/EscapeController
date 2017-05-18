const helper = require("../helper");
let message = {};

message.path  = "./res/message.json"

message.addMessage = function (post) {
    if (typeof(post) != 'string') return;
    let mes = helper.readJSON(message.path)
    mes.push(post)
    helper.writeJSON(message.path, mes)
}

message.getMessages = function () {
    return helper.readJSON(message.path)
}

message.resetMessage = function () {
    helper.writeJSON(message.path, [])
}

module.exports = message