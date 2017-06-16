const fs = require('fs')
const helper = require("./helper")
const blessed = require('blessed');

// Create a screen object. 
let screen = blessed.screen({
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
let box = blessed.box({
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

function getTimeRemaining() {
  let endtime = helper.readJSON("./res/time.json");
  let t = endtime - Date.now()
  let now = Date.now()
  return {
    'total': t,
    'days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'minutes': Math.floor((t / 1000 / 60) % 60),
    'seconds': Math.floor((t / 1000) % 60)
  };
}

function initializeClock(box, screen) {
  let timeinterval = setInterval(function () {
    let t = getTimeRemaining();
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
screen.key(['C-c'], function (ch, key) {
  return process.exit(0);
});

// Focus our element. 
box.focus();

// Render the screen. 
screen.render();

initializeClock(box, screen)