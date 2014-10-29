
var Arnode = require("./../arnode.js");
var Board = Arnode.Board;
var assert = require("assert");

/**
 * Tests Fake Data
 * @type {Object}
 */
var data = {
  name: "MyTestBoard",
  model: Board.Models.UNO,
  port: "/dev/ttyACM0",
  baud: 9600,
  connect: true
};

describe("Board", function(){

  /**
   * Constructor tests
   */
  describe("Constructor", function(){

    it("should create the board with object of arguments", function(){

      var t = new Board(data);

      assert.equal(t.getName(),  data.name);
      assert.equal(t.getModel(), data.model);
      assert.equal(t.getPort(),  data.port);
      assert.equal(t.getBaud(),  data.baud);

    });

    it("should create the board with list of arguments", function(){

      var t = new Board(data.name, data.model, data.port, data.baud);

      assert.equal(t.getName(),  data.name);
      assert.equal(t.getModel(), data.model);
      assert.equal(t.getPort(),  data.port);
      assert.equal(t.getBaud(),  data.baud);

    });
  });

  /**
   * Name Tests
   */
  describe("Name", function(){
    it("should throw exception when a null value is set", function(){
      var e = null;
      try {
        var t = new Board(null, data.model, data.port, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Name");
      }
    });

    it("should throw exception when is not a valid value", function(){
      var e = null;
      try {
        var t = new Board(9999, data.model, data.port, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Name");
      }
    });
  });

  /**
   * Models
   */
  describe("Model", function(){
    it("should throw exception when a null value is set", function(){
      var e = null;
      try {
        var t = new Board(data.name, null, data.port, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Model");
      }
    });

    it("should throw exception when the value is not on the models list", function(){
      var e = null;
      try {
        var t = new Board(data.name, "UNSUPPORTED_MODEL", data.port, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Model");
      }
    });
  });

  describe("Port", function(){
    it("should throw exception when a null value is set", function(){
      var e = null;
      try {
        var t = new Board(data.name, data.model, null, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Port");
      }
    });

    it("should throw exception when is not a valid value", function(){
      var e = null;
      try {
        var t = new Board(data.name, data.model, 9999, data.baud);
      }
      catch (error) {
        e = error;
      }
      finally {
        assert.equal(e, "Invalid Board Port");
      }
    });
  });
});
