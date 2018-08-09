let message = "";

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += "my";
        resolve(message);
    }, 2000)
})

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " first";
        resolve(message);
    }, 2000)
})

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " promise";
        resolve(message);
    }, 2000)
})

var printResult = (results) => {console.log("Results = ", results, "message = ", message)}

function main() {
    // See the order of promises. Final result will be according to it
    Promise.all([promise1, promise2, promise3]).then(printResult);
    Promise.all([promise2, promise1, promise3]).then(printResult);
    Promise.all([promise3, promise2, promise1]).then(printResult);
    console.log("\"\"" + message);
}

main();



// Different speed async operations
const slow = new Promise(resolve => {
    setTimeout(resolve, 200, 'slow');
});
const instant = 'instant';
const quick = new Promise(resolve => {
    setTimeout(resolve, 50, 'quick');
});

// The order is preserved regardless of what resolved first
Promise.all([slow, instant, quick]).then(responses => {
    responses.map(response => console.log(response));
});