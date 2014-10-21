Arnode [![Build Status](http://img.shields.io/travis/marceloboeira/arnode.svg?style=flat)](https://travis-ci.org/marceloboeira/arnode)
======

Arnode is a simple NodeJS package that can be used to control your board.

More information about it coming soon!

### Coverage

[![Coverage Status](http://img.shields.io/coveralls/marceloboeira/arnode/master.svg?style=flat)](https://coveralls.io/r/marceloboeira/arnode)



# Examples:

## Blinking led (Hello World)

```javascript

var Arnode = require("arnode");
var Board = Arnode.Board;

var board = new Board("MyBoardName", Board.Models.UNO, '/dev/ttyUSB0', 9600, true);

board.on("ready", function() {
  
  board.pinMode(13, Board.OUTPUT);

  while (true) {
    board.digitalWrite(13, Board.HIGH);
    sleep(500);
    board.digitalWrite(13, Board.LOW);
    sleep(500);
  }
});

```

## Blinking led with Led Component

```javascript

var Arnode = require("arnode");
var Board = Arnode.Board;
var Led = Arnode.Components.Led;

var board = new Board("MyBoardName", Board.Models.UNO, '/dev/ttyUSB0', 9600, true);

board.on("ready", function() {
  
  board.attach('led', new Led(13));

  while (true) {
    board.getComponents().led.turnOn();
    sleep(500);
    board.getComponents().led.turnOff();
    sleep(500);
  }
});

```
