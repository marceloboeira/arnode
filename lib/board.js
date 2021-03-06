"use strict";

var EventEmitter = new require('events').EventEmitter;
var SerialPort = require("serialport").SerialPort;
var util = require('util');

var LN = '\n';

/**
 * Board object to manage a single Arduino board.
 *
 * @param {String} name
 * @param {String} model
 * @param {String} port
 * @param {int} baud
 * @param {boolean} connect
 * @return {Board} itself
 */
var Board = function (name, model, port, baud, connect) {
  var args = arguments;

  /* #3 - Event Support */
  EventEmitter.call(this);

  if (args[0] === null || typeof args[0] !== "object") {
    args = {
      name:  args[0] || null,
      model: args[1] || null,
      port:  args[2] || null,
      baud:  args[3] || null,
      connect: args[4] || false
    };
  }
  else {
    args = arguments[0];
  }

  this.setup(args.name, args.model, args.port, args.baud);

  if (args.connect) {
    this.connect();
  }
};

/**
 * Inherits Event Support
 *
 * @see [description]
 */
util.inherits(Board, EventEmitter);

/**
 * Board Messages API
 *
 * @type {Array}
 */
Board.messages = {
  HANDSHAKE_IN: 'AN:HELLO_NODE',
  HANDSHAKE_OUT: 'AN:HELLO_ARDUINO'
};


/**
 * Constants
 *
 * @see https://github.com/marceloboeira/arnode/issues/12
 */

/**
 * HIGH Constant
 * @type {Number}
 */
Board.HIGH = 255;

/**
 * LOW Constant
 * @type {Number}
 */
Board.LOW = 0;

/**
 * OUTPUT Constant
 * @type {Boolean}
 */
Board.OUTPUT = 1;

/**
 * INTPUT Constant
 * @type {Boolean}
 */
Board.INPUT = 0;

/**
 * Board Models
 */
Board.Models = {

  /**
   * Arduino Due
   * @see http://arduino.cc/en/Main/ArduinoBoardDue
   * @type {String}
   */
  DUE: 'DUE',

  /**
   * Arduino Diecimila
   * @see http://arduino.cc/en/Main/ArduinoBoardDiecimila
   * @type {String}
   */
  DIECIMILA: 'DIECIMILA',

  /**
   * Arduino Duemilanove
   * @see http://arduino.cc/en/Main/ArduinoBoardDuemilanove
   * @type {String}
   */
  DUEMILANOVE: 'DUEMILANOVE',

  /**
   * Arduino Esplora
   * @see http://arduino.cc/en/Main/ArduinoBoardEsplora
   * @type {String}
   */
  ESPLORA: 'ESPLORA',

  /**
   * Arduino Fio
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardFio
   * @type {String}
   */
  FIO: 'FIO',

  /**
   * Arduino Leonardo
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardLeonardo
   * @type {String}
   */
  LEONARDO: 'LEONARDO',

  /**
   * Arduino Mega 1280
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardMega1280
   * @type {String}
   */
  MEGA_1280: 'MEGA_1280',

  /**
   * Arduino Mega 2560
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardMega2560
   * @type {String}
   */
  MEGA_2560: 'MEGA_2560',

  /**
   * Arduino Mega ADK
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardMegaADK
   * @type {String}
   */
  MEGA_ADK: 'MEGA_ADK',

  /**
   * Arduino Micro
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardMicro
   * @type {String}
   */
  MICRO: 'MICRO',

  /**
   * Arduino Nano
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardNano
   * @type {String}
   */
  NANO: 'NANO',

  /**
   * Arduino Pro
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardPro
   * @type {String}
   */
  PRO: 'PRO',

  /**
   * Arduino Uno
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardUno
   * @type {String}
   */
  UNO: 'UNO',

  /**
   * Arduino Zero
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardZero
   * @type {String}
   */
  ZERO: 'ZERO',

  /**
   * Arduino YUN
   *
   * @see http://arduino.cc/en/Main/ArduinoBoardYun
   * @type {String}
   */
  YUN: 'YUN'
};

/**
 * Board Name, only for show at logs
 * @type {String}
 */
Board.prototype.name = 'ArnodeBoard1';

/**
 * Board Model, for technical stuff
 * @type {String}
 */
Board.prototype.model = Board.Models.UNO;

/**
 * Board Serial Port, for serial connection
 * @type {String}
 */
Board.prototype.port = null;

/**
 * Board Serial Baud Rate, for serial connection
 * @type {Number}
 */
Board.prototype.baud = 9600;

/**
 * Board Serial Connect
 * @type {Boolean}
 */
Board.prototype.state = false;

/**
 * Board Serial Connection Object
 * @type {Boolean}
 */
Board.prototype.serial = null;


/**
 * Set board name
 * @param {String} name
 * @return {Board} itself
 */
Board.prototype.setName = function (name) {
  if (!(typeof name === "string" || name instanceof String)) {
    throw "Invalid Board Name";
  }
  // Force to String
  this.name = String(name);
  return this;
};

/**
 * Get Board name
 * @return {String} board name
 */
Board.prototype.getName = function () {
  return this.name;
};

/**
 * Set board model
 * @param {String} model
 * @return {Board} itself
 */
Board.prototype.setModel = function (model) {
  var isRealModel = false;

  // Check if the model is in the Moldels list
  //TODO - Improve this method with underscore
  for (var m in Board.Models) {
    if (m === model) {
      isRealModel = true;
    }
  }

  if (!(typeof model === "string" || model instanceof String) || !isRealModel) {
    throw "Invalid Board Model";
  }

  this.model = String(model);
  return this;
};

/**
 * Get Board model
 * @return {String} board model
 */
Board.prototype.getModel = function () {
  return this.model;
};

/**
 * Set board port
 * @param {String} port
 * @return {Board} itself
 */
Board.prototype.setPort = function (port) {
  if (!(typeof port === "string" || port instanceof String)) {
    throw "Invalid Board Port";
  }

  this.port = String(port);
  return this;
};

/**
 * Get Board port
 * @return {String} board port
 */
Board.prototype.getPort = function () {
  return this.port;
};

/**
 * Set board baud rate
 * @param {int} baud
 * @return {Board} itself
 */
Board.prototype.setBaud = function (baud) {
  this.baud = baud;
  return this;
};

/**
 * Get Board baud
 * @return {int} board baud rate
 */
Board.prototype.getBaud = function () {
  return this.baud;
};

/**
 * Get Board state of connection
 * @return {Boolean} board state
 */
Board.prototype.getState = Board.prototype.isConnected = function () {
  return this.state;
};

/**
 * Get serial
 * @return {String} board port
 */
Board.prototype.getSerial = function () {
  return this.port;
};

/**
 * Set serial
 * @param {int} Serial
 * @return {Board} itself
 */
Board.prototype.setSerial = function (serial) {
  this.serial = serial;
  return this;
};

/**
 * Setup the board
 *
 * @param {String} name
 * @param {String} model
 * @param {String} port
 * @param {int} baud
 * @return {Board}
 */
Board.prototype.setup = function (name, model, port, baud) {

  this.setName(name);
  this.setModel(model);
  this.setPort(port);
  this.setBaud(baud);

  this.setupSerial();

  return this;
};

/**
 * Setup Serial
 * @param  {Boolean} a
 * @return {Board}
 */
Board.prototype.setupSerial = function() {
  var self = this;

  this.setSerial(new SerialPort(this.getPort(), {
    baudRate: this.getBaud()
  }, false));

  self.serial.on("data", function(a,b){
    if (b == Board.messages.HANDSHAKE_OUT) {
      self.emit('handshaked');
      return;
    }
  });
};

/**
 * Connect the board
 *
 * @return {Boolean}
 */
Board.prototype.connect = function (cb) {
  var self = this;

  self.emit('before-connect');
  this.serial.open(function (error) {
    self.emit('connect', error);
    self._handshake();
    self.on('handshaked', function(){
      console.log('thats it');
    });
  });


  return this;
};


/**
 * Write HIGH/LOW on a Digital port
 *
 * @param  {[type]} port  [description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
Board.prototype.digitalWrite = function(port, state) {
  //
};

/**
 *
 * @param  {} s [description]
 * @return {[type]}   [description]
 */
Board.prototype._st = function(s) {
  return s = LN;
};

/**
 * Sends handshake to test if everything is fine
 *
 */
Board.prototype._handshake = function() {
  var self = this;
  self.emit('berfore-handshake');
  self.serial.write(self._st(Board.messages.HANDSHAKE_OUT), function(e, r) {
    self.emit('handshake');
  });
  self.emit('after-handshake');
};

/**
 * Export the Board Class
 * @type {Board}
 */
module.exports = Board;
