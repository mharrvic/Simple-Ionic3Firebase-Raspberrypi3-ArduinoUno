var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

    var ledGreen = new five.Led(13);
    var ledRed = new five.Led(12);
 
  var keypad = new five.Keypad({
    controller: "3X4_I2C_NANO_BACKPACK",
    keys: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["*", "0", "#"]
    ]
  });
  setLocked(true);
  var position = 0;
  var secretCode = "123456";

  var key = keypad.getKey();

  if (key == '*' || key == '#') {
    position = 0;
    setLocked(true);
  }

  if (key == secretCode[position]) {
    position++;
  }
 
  if (position == 6) {
    setLocked(false);
  }
  delay(50);
},

void setLocked(locked) {
  if (locked) {
    console.log("unlock");
    ledGreen.off();
    ledRed.on();
  } else {
    console.log("lock");
    ledGreen.on();
    ledRed.off();
  }
}



  ["change", "press", "hold", "release"].forEach(function(eventType) {
    keypad.on(eventType, function(data) {
      console.log("Event: %s, Target: %s", eventType, data.which);
      
    });
  });
});