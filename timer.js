const fs = require('fs')
const helper = require("./helper")
const blessed = require('blessed');
const timeToGo = process.argv[2];

// Create a screen object. 
var screen = blessed.screen({
  smartCSR: true,
  cursor: {
    artificial: true,
    shape: 'line',
    blink: true,
    color: 'default' // null for default 
  }
});

screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically. 
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});



function getTimeRemaining(endtime) {
  var t = endtime - Date.now()
  var now = Date.now()
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(box, screen) {
  var endTime = Date.now() + 1000 * 60 * timeToGo;
  helper.writeJSON("./res/time.json", endTime);
  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(endTime);
    line = helper.readJSON("./res/message.json")
    box.setContent("{center}{red-fg}Time{/red-fg}: " + t.minutes + "m " + t.seconds + "s{/center}")
    
    for (let i = 0+1; i < line.length+1; i++)
      box.setLine(i, line[i-1]);


    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
    screen.render();
  }, 1000);
}

// Append our box to the screen. 
screen.append(box);

// Quit on Escape, q, or Control-C. 
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

// Focus our element. 
box.focus();

// Render the screen. 
screen.render();

initializeClock(box, screen)