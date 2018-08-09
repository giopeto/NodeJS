let stringBuf = new Buffer(256);
let len = stringBuf.write("Simply Easy Learning");

console.log("Octets written : "+  len);
console.log("To string : " + stringBuf.toString());

let jsonBuf = new Buffer('Simply Easy Learning');
let json = jsonBuf.toJSON(jsonBuf);

console.log(json);


let buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

/* Concat buffers */
var buffer1 = new Buffer('TutorialsPoint ');
var buffer2 = new Buffer('Simply Easy Learning');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());


/* Compare buffers */
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
    console.log(buffer1 +" comes before " + buffer2);
}else if(result == 0){
    console.log(buffer1 +" is same as " + buffer2);
}else {
    console.log(buffer1 +" comes after " + buffer2);
}