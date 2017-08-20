var firebase = require("firebase");
var five = require("johnny-five"), board, button;

board = new five.Board();

board.on("ready", function () {
    button = new five.Button(8);
    var led = new five.Led(13);

    var config = {
      apiKey: "AIzaSyDe1GOyzSom4q6Y3IEj58EbgJXj5-z4ffk",
      authDomain: "test-936f7.firebaseapp.com",
      databaseURL: "https://test-936f7.firebaseio.com",
      projectId: "test-936f7",
      storageBucket: "test-936f7.appspot.com",
      messagingSenderId: "428996715721"
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    var ref = db.ref("button");

    // Listen for changes to the button state on Firebase Database
    ref.on("value", function (snapshot) {
        var val = snapshot.val();

        if (val == "down") {
            console.log("down");
            // Set new value on LED
            led.on();
        } else {
            console.log("up");
            led.off();
        }
    });

    // Listen for button changes on hardware
    button.on("down", function () {
        // Set new value in Firebase
        ref.set("down");
    });

    button.on("up", function () {
        ref.set("up");
    });
});