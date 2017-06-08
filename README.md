# How to use the Escape Controller ?

## Install what you need
* Install nodejs < v7
* Clone this repo on the different machine
* Launch the: npm install 

## Launch
### On the Timer machine
* Launch the timerServer.js: node timerServer
* Launch the timer.js, he takes in argument the number of minutes for the timer: node timer 16, to launch a 16 minutes timer

### On the 'master' machine
* Launch the clientSender.js, he takes in argument the ip adress of your 'timer machine' and the port (default 8080): node clientSender 127.0.0.1 8080, to launch the client sender with your Timer Machine on your local machine on the port 8080.