"use strict";

var EventEmitter = new require('events').EventEmitter;
var util = require('util');

/**
 * Component object Led
 *
 */
var Led = function () {
  EventEmitter.call(this);

};

util.inherits(Led, Interface);

/**
 * Export the Led Class
 * @type {Led}
 */
module.exports = Led;
