// // Promise

// // A promise is a special JavaScript object that links the "producing code" and the "consuming code" together

// // let promise = new Promise(function(resolve, reject) {
//     // executor (the producing code)
// // })

// // The function passed to new Promise is called the executor. 
// // When new Promise is created, the executor runs automatically. 
// // It contains the producing code which should eventually produce the result

// // It arguments resolve and reject are callbacks provided by JavaScript itself.
// // Our code is only inside the executor.

// // When the executor obtains the result, sooner or later, it should call one of these callbacks:
// // resolve(value) - if the job is finished successfully, with the result value.
// // reject(error) - if an error has occured, error is the error object.

// // To summarize:
// // The executor runs automatically and attempts to perform a job. When it is finished with the 
// // attemp, it calls resolve if it was successful or reject if there was an error

// // The promise object returned by new Promise constructor has these internal properties:
// // * state - initially "pending", then changes to either "fulfilled" when resolve is called or 
// // "rejected" when rejected is called
// // result - initially undefined, then changes to value when resolve(value) called or error when 
// // reject(error) is called


// // Here's an example of a promise constructor and a simple executor function with "producing code" that takes
// // them (via setTimeout)

// let promise = new Promise(function(resolve, reject) {
//     // the function is executed automatically when the promise is constructed

//     // after 1 second signal that the job is doen with the result "done"
//     setTimeout(() => resolve("done"), 1000);
// });

// let rejecterPromise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("Whoops!")), 1000)
// });

// // The executor should perform a job (usually a task that takes some time) and then call resolve or
// // reject to change the state of the corresponding promise object

// // A promise that is either resolved or rejected is called "settled", as opposed to initially "pending"

// // (!) There can only be a single result of an error
// // The executor should call only one resolve or one reject. Any state change is final.
// // All further calls of resolve and reject are ignored
// // The idea is that a job done by the executor may have only one result or an error
// // Also, resolve/ reject expect only one argument (or none) and will ignore additional arguments

// // (!) Reject with Error objects
// // In case something goes wrong, the executor should call reject. That can be done with any type of argument
// // (just like resolve). But it is recommended to use Error objects (or objects that inherit from Error)

// // (!) Imediately calling resolve/ reject
// // In practice, an executor usually does something asynchronously and calls resolve/reject after some time,
// // but it doesn't have to. We also can call resolve or reject immediately, like this:
// let promise1 = new Promise(function(resolve, reject) {
//     // not taking our time to do the job
//     resolve(123); // immediately give the result: 123
// });

// // For instance, this might happen when we start to do a job but then see that everything has already been completed
// // and cached. That's fine. We immediately have a resolved promise.

// // (!) The state and result are internal
// // The properties state and result of the Promise object are internal. We can't directly access them. 
// // We can use methods .then/.catch/.finally for that.

// // Consumer: then, catch

// // then

// // promise.then(
// //     function(result) { /* handle a successful result */}
// //     function(error) { /* hand an error */ }
// // );

// // The first argument of .then is a function that runs when the promise is resolved, and receives the result
// // The second argument of .then is a function that runs when the promise is rejected, and receives the result

// let promise2 = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve("done!"), 1000);
// });

// // resolve runs the first function in .then
// promise.then(
//     result => alert(result), // shows "done!" after 1 second
//     error => alert(error)  // doesn't run
// );

// // catch

// // If we're interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction)
// // Or we can use .catch(errorHandlingFunction), which is exactly the same

// let promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => reject(new Error("Whoops!")), 1000);
// });
// // .catch(f) is the same as promise.then(null, f)
// promise.catch(alert); // shows "Error: Whoops!" after 1 second

// // The call .catch(f) is a complete analog of .then(null, f), it just a shorthand

// // Cleanup: finally

// // The call .finally(f) is similar to .then(f, f) in the sense that f runs always, when the promise is settled:
// // be it resolve or reject

// // The idea of finally is to set up a handler for performing cleanup/ finalizing after the previos operations are complete

// // E.g. stopping loading indicators, closing no longer needed connections etc.

// new Promise((resolve, reject) => {
//     /* do something that takes time, and then call resolve or maybe reject */
// })

// //  runs when the promise is settled, doesn't matter successfully or not
// .finally(() => stop loading indicator)
// // so the loading indicator is always stopped before we go on
// .then(result => show result, err => show error)

// // 1. A finally handler has no arguments. We don't know is a promise is resolved or rejected. 
// // our task is only to perform "general" finalizing procedures
// // 2. A finally handler "passes through" the reuslt or error to the next suitable handler

// // For instance, here the result is passed through finally to then:

// new Promise((resolve, reject) => {
//     setTimeout(() => resolve("value"), 2000);
// });
//   .finally(() => alert("Promise ready")); // triggerst first
//   .then(result => alert(result)); // <-- .then show "value"

// // The value returned by the first promise is passed through finally to the next then.

// // It can also pass through an error
// new Promise((resolve, reject) => {
//   throw new Error("error");
// })
//   .finally(() => alert("Promise ready")) // triggers first
//   .catch(err => alert(err));  // <-- .catch shows the error

// // 3. A finally handler also shouldn't return anything. If it does, the returned value is silently ignored.
// // The only exception is when finally handler throws an error. Then this error goes to the next handler,
// // instead of any previous outcome

// // To summarize:
// /*
// To summarize:

// A finally handler doesn’t get the outcome of the previous handler (it has no arguments). 
// This outcome is passed through instead, to the next suitable handler.
// If a finally handler returns something, it’s ignored.
// When finally throws an error, then the execution goes to a nearest error handler.
// These features are helpful and make things work just the right way if we finally how it’s supposed to be used: 
// for generic cleanup procedures.
// */

// // (!) We can attach handlers to settled promises
// // If a promise is pending .then/catch/finally handlers wait for its outcome
// // If a promise is already settler when we add a handler to it, the handlers just runs immediately

// // Example: loadScript

// callback based
function callbackLoadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

// Rewrite with Promises

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));

        document.head.append(script);
    })
}

// Usage

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then( 
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);

promise.then(script => alert(`Another handler...`));

// Tasks TODO: