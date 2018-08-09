function doubleNumber(x, cb) {
    cb(x*2);
}

var testCallback = doubleNumber(5, function(x) {
    console.log(x);
});


var testCallback2 = doubleNumber(2, function(x) {
    console.log("Number is: ", x*15);
});