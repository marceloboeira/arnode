
var Board = function (model, port, baud, autoConnect) {
	this.setup();
	this.connect();
};

Board.model = null;
Board.baud = 9600;
Board.port = null;

// Example models static constants
Board.UNO = 'UNO';
Board.DUAMILENOVE = 'DUAMILENOVE';
Board.LEONARDO = 'LEONARDO';
Board.MEGA_1280 = 'MEGA_1280';
Board.MEGA_2560 = 'MEGA_2560';


Board.prototype.setup = function () {
  console.log('Setup');
};

Board.prototype.connect = function () {
  console.log('Connect');
};


// Events support
Board.prototype.on = function (event, callback) {
  // 
};

exports.Board = Board;