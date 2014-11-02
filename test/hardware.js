
var Arnode = require("./../arnode.js");
var Board = Arnode.Board;
var assert = require("assert");

/**
 * This tests must me executed with a board connected
 * running the lastest firmware.
 *
 */
var data = {
  name: "UnoTestBoard",
  model: Board.Models.UNO,
  port: "/dev/ttyACM0",
  baud: 9600,
  connect: true
};

describe("Board", function(){
  describe("on serial available", function(){
    it("should send the hand-shake", function(){

      var t = new Board(data);

      t.on("connect", function(e) {


        console.log(e);
        console.log('connect');
      });
    });
  });
});

