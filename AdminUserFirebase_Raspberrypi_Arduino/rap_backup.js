var firebase = require("firebase");
var five = require("johnny-five"), board, button, Keypad;

board = new five.Board();

board.on("ready", function () {
    button = new five.Button(8);
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


    var config = {
        apiKey: "AIzaSyDa5xysepngVfS8y_ORgu7jjLHBFPVy7q4",
        authDomain: "project-magnetic-doorlock.firebaseapp.com",
        databaseURL: "https://project-magnetic-doorlock.firebaseio.com",
        projectId: "project-magnetic-doorlock",
        storageBucket: "project-magnetic-doorlock.appspot.com",
        messagingSenderId: "204237060173"
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    var ref = db.ref("button");

    // Listen for changes to the button state on Firebase Database
    ref.on("value", function (snapshot) {
        var val = snapshot.val();

        if (val == "unlock") {
            console.log("unlock");
            // Set new value on LED
            ledGreen.on();
            ledRed.off();
        } else {
            console.log("lock");
            ledGreen.off();
            ledRed.on();
        }
    });

    // Listen for button changes on hardware
    button.on("down", function () {
        // Set new value in Firebase
        ref.set("unlock");
    });

    button.on("up", function () {
        ref.set("lock");
    });
});
