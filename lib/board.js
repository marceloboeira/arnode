
var Board = function (model, port, baud, autoConnect) {
	this.setup();
	this.connect();
};

Board.Models = {
	UNO: 'UNO',
	DUAMILENOVE: 'DUAMILENOVE',
	LEONARDO: 'LEONARDO',
	MEGA_1280: 'MEGA_1280',
	MEGA_2560: 'MEGA_2560'
}

Board.model = null;
Board.baud = 9600;
Board.port = null;


Board.prototype.setup = function () {
  console.log('Setup');
};

Board.prototype.connect = function () {
  console.log('Connect');
};

Board.prototype.on = function (event, callback) {
  
};

module.exports = Board;