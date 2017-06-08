const helper = require("../helper");
let timer = {};
timer.path = "./res/time.json";

timer.GetTime = function()
{
    return helper.readJSON(timer.path);
}

module.exports = timer