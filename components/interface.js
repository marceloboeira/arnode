"use strict";

var EventEmitter = new require('events').EventEmitter;
var util = require('util');

/**
 * Component object interface
 *
 */
var Interface = function () {
  EventEmitter.call(this);

};

util.inherits(Interface, EventEmitter);

/**
 * Export the Interface Class
 * @type {Interface}
 */
module.exports = Interface;
