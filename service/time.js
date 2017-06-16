const helper = require("../helper");
let timer = {};
timer.path = "./res/time.json";

timer.GetTime = function()
{
    return helper.readJSON(timer.path);
}

timer.SetTime = function (time)
{
    time = Date.now() + 1000 * 60 * time;
    helper.writeJSON(timer.path, time);
}

module.exports = timer