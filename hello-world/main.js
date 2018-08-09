var fs = require("fs");

function callSync() {
    var data = fs.readFileSync('input.txt');

    console.log(data.toString());
    console.log("Program Ended");
}



function callAsync() {
    fs.readFile('input.txt', function (err, data) {
        if (err) return console.error(err);
        console.log(data.toString());
    });

    console.log("Program Ended");
}

callSync();
//callAsync();