/**
 * Board object to manage a single Arduino board.
 * 
 * @param {String} name
 * @param {String} model
 * @param {String} port
 * @param {int} baud
 * @param {boolean} autoConnect
 */
var Board = function (name, model, port, baud, autoConnect) {

	if (name !== null) {
		this.setup(name, model, port, baud);	
	}
	
	if (autoConnect)
		this.connect()
};

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
Board.name = 'ArnodeBoard1';

/**
 * Board Model, for technical stuff
 * @type {String}
 */
Board.model = Board.Models.UNO;

/**
 * Board Serial Port, for serial connection
 * @type {String}
 */
Board.port = null;

/**
 * Board Serial Baud Rate, for serial connection
 * @type {Number}
 */
Board.baud = 9600;


/**
 * Set board name
 * @param {String} name
 * @return {Board} itself
 */
Board.prototype.setName = function (name) {
	this.name = name;	
	return this;
};

/**
 * Get Board Name
 * @return {String} board name
 */
Board.prototype.getName = function () {
	return this.name;	
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

	if (name.isArray) {
		console.log(name);
	}

  console.log('Setup');
};


/**
 * Connect the board
 * 
 * @return {[type]}
 */
Board.prototype.connect = function () {
  console.log('Connect');
};

Board.prototype.on = function (event, callback) {
  
};

module.exports = Board;