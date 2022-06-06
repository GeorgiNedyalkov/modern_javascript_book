// Scheduling: setTimeout and setInterval
// We may decide to execute a function not right now, but at a certain time later.
// That's called "scheduling a call"
// There are two methods for it:
// * setTimeout allows to run a function once after the interval of time
// * setInterval allows to run a function repeatedly, starting after the interval of time
// ... then repeating continuously at that interval

// These methods are not part of the javascript specification.
// But most environments have the internal scheduler and provide these methods.
// They are supported in all browsers and Node.js

// setTimeout
// The syntax:

// let timeId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

// Parameters:
// func|code
// function or a string of code to execute. Usually, that's a function.
// For historical reasons, a string of code can be passed, but that's not recommended.

// delay:
// The delay before run, in milliseconds (1000 ms = 1 second), by default 0

// arg1, arg2, ...
// arugments for the function (not supported in IEP-)

// Example without arguments:
function sayHi() {
    console.log('Hello');
}

setTimeout(sayHi, 1000);

// Example with arguments
function itroduceYourself(phrase, name) {
    console.log(phrase + ', ' + name);
}

setTimeout(itroduceYourself, 1000, "Hi, my name is", "Georgi");

// if the first argument is a string then JavaScript creates a function from it
// but using strings is not recommended we can use arrow functions instead

setTimeout(() => console.log("Hi"), 1000);

// Pass a funciton, but don't run it
// Do not add () after the function - setTimeout(sayHi(), 1000); this is wrong
// It doesn't work because setTimeout expects a reference to a function.
// If we add () the result of the execution of the function is passed as an argument

// Cancelling with clearTimeout
// A call to setTimeout returns a "timer identifier" timerId that we can use to cancel the execution
// Syntax
// let timerId = setTimeout(...);
// clearTimeount(timerId);

let timerId = setTimeout(() => console.log('nothing happens'), 1000);
console.log(timerId); // timer identifier

clearTimeout(timerId);
console.log(timerId);
// A timer object is returned with additional methods

// setInterval
// the same syntax as setTimeout
// let timerId = setInterval(func|code, [delay], [arg1], [arg2], [argN], ...);

// All arguments have the same meaning. Unlike setTimeout it runs the funciton regularly
// ... at a given interval of time.

let tickingTimerId = setInterval(() => console.log(`tick`), 2000);

setTimeout(() => {
    clearInterval(tickingTimerId);
    console.log('stop')
}, 5000);

// Time goes on while alert is shown

// Nested setTimeout
// There are two ways of running something regularly
// One is setInterval. The other one is a nested setTimeout

/** instead of:
    let timerId = setInterval(() => console.log('tick'), 2000);
*/

let nestedTimerId = setTimeout(function tick() {
    console.log('A');
    nestedTimerId = setTimeout(tick, 2000); // (*)
}, 2000);

// The setTimeout above schedule the next call right at the end of the current one (*)
// The nested setTimeout is a more flexible method than setInterval.
// This way the next call may be scheduled differently, depending on the result of the current one.

// For instance, we need to write a service that sends a request to the server every 5 seconds asking for data
// but in case the server is overloaded, it should increase the interval to 10, 20, 40 seconds...

// Here is a pseudocode:
/*
    let delay = 5000;

    let timerId = setTimeout(function request() {
        ... send request ...

        if(request failed due to server overload) {
            // increase the interval to the next run
            delay *= 2;
        }

        timerId = setTimeout(request, delay);
    }, delay);
*/

// And if the functions that we're scheduling are CPU-hungry, then we can measure the time taken by the execution
// ... and plan the next call sooner or later.

// Nested setTimeout allows to set the delay between the executions more precisely than setInterval
// Let's compare two code fragments. 
// First one uses setInterval

// let i = 1;
// setInterval(function () {
//     func(i++);
// }, 100);

// the second one uses nested setTimeout:

// let i = 1;
// setTimeout(function run() {
//     func(i++);
//     setTimeout(run, 100);
// }, 100);

// For setInterval the internal scheduler will run func(i++) every 100ms:

// Garbage collection and setInterval/setTimeout callback

// When a function is passed in setInterval/ setTimeout, an internal reference is created to it and saved
// ... in the scheduler. It prevents the function from being garbage collected, even if there are no other
// references to it.

// the function stays in memory until the scheduler calls it
//  setTimeout(function() {...}, 100);
// For setInterval the function stays in memory until clearInterval is called.

// There's a side effect. A function references the outer lexical environment, so while it lives,
// ... outer variables live too. They may take much more memory than the function itself.
// So when we don't need the scheduled function anymore, it's better to cancel it, even if it's very small

// Zero delay setTimeout
// There is a special use case: setTimeout(func, 0), or just setTimeout(func)
// This schedules the execution of func as soon as possible. But the scheduler will invoke it only after
// the currently executing script is complete.
// So the function is scheduled to run "right after" the current script

// For instance, this outputs "Hello", then immediately "World":

setTimeout(() => console.log("World"));

console.log("Hello");

// There are also advanced browser-related use cases of zero-delay timeout, that will be discussed another chapter

// Zero delay is in fact not zero (in a browser)
// In the browser, there's a limitation of how often nested timers can run. The HTML5 standard says:
// "after five nested timers, the interval is forced to be at least 4 milliseconds"

// Summary
/*
    * Methods setTimeout(func, delay, ...args) and setInterval(func, delay, ... args) allow us to run the
    fun once/ regularly after delay milliseconds.
    * To cancel the execution, we should call clearTimeout/ clearInterval with the value returned by setTimeout/ setInterval
    * Nested setTimeout calls are a more flexible alternative to setInterval, allowing us to set the time between
    executions more precisely.
    * Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) is used to schedule the call
    "as soon as possible, but after the current script is complete"
    * The browset limits the minimal delay for five or more nested calls of setTimeout or for setInterval
    (after 5th call) to 4ms. That's for historical reasons.

    All scheduling methods do not guarantee the exact delay.

    For example, the in-browser timer may slow down for a lot of reasons:
    * The CPU is overloaded
    * The browser tab is in the background mode
    * The laptop is on battery
     
    All that may increase the minimal time resolution (the minimum delay) to 300ms or even 1000ms depending on 
    the browser and OS-level performance settings
*/