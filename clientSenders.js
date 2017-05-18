const request = require('request')
const readline = require('readline')
const url = process.argv[2]
const port = process.argv[3]

const _homeMessage = "1: Send message\n2: Reset all message\nExit: enter 'exit' to quit\nChoice: ";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let constructURL = function (url, port) {
    return "http://" + url + ":" + port
}

let sendMessage = function (message) {
    let headers = {
        'User-Agent': 'ClientSenders/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    let options = {
        url: constructURL(url, port) + '/api/message/add',
        method: 'POST',
        headers: headers,
        form: { 'message': message }
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            // console.log(body)
        }
        // console.log(error)
    })

    return recursiveAsyncReadLine();
}

let getMessages = function () {
    let headers = {
        'User-Agent': 'ClientSenders/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    let options = {
        url: constructURL(url, port) + '/api/message/',
        method: 'GET',
        headers: headers,
    }

    // Start the request
    let message = []
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            helper.writeJSON("t.json", body)
            message = JSON.parse(body)
            console.log(body)
        }
    })
    console.log("lol")
    return message
}

let sendReset = function () {
    let headers = {
        'User-Agent': 'ClientSenders/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    let options = {
        url: constructURL(url, port) + '/api/message/reset',
        method: 'GET',
        headers: headers,
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            // console.log(body)
        }
        // console.log(error)
    })
}

let drawMessage = function () {
    rl.question("Send message: ", (answer) => {
        sendMessage(answer)
    })
}


let recursiveAsyncReadLine = function () {
    rl.question("1: Send message\n2: Reset all message\nExit: enter 'exit' to quit\nChoice: ", function (answer) {
        if (answer == 'exit') //we need some base case, for recursion
            return rl.close(); //closing RL and returning from function.
        else if (answer == 1)
            drawMessage();
        else if (answer == 2)
            sendReset();
        recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
}

recursiveAsyncReadLine()