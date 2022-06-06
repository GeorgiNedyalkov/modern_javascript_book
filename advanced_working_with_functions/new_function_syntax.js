// The "new Function" syntax
// There is one more way to create a function. 
// It's rarely used, but sometimes there's no alternative

// Syntax

// let func = new Function ([arg1, arg2, ...argN], functionBody);
// For example:

let sum = new Function(`a`, `b`, `return a + b`);
console.log(sum(1, 2));

let sayHi = new Function(`console.log("Hi I have no arguments")`);
sayHi();

// The main difference between other ways to create a function is that
// ... this method is created literally from a string, that is passed at runtime

// new Function allows to turn any string into a function.
// For example we can receive a new function from a server and then execute it

// let str = ... receive the code from a server dynamically ...
// let func = new Function(str);
// func();

// It is used in very specific cases, like when we receive code from a server,
// ... or to dynamically compile a function from a template, in complex web-applications

// Closure
// Usually, a function remembers where it was born in the special property [[Environment]]
// It references the Lexical Environment from where it's created
// When we use new Function, its [[Environment]] is set to reference not the current
// ... Lexical Environment, but the global one

// So, such function doesn't have access to outer variables, only to global ones

// function getFunction() {
//     let value = 'test';

//     let func = new Function('console.log(value)');

//     return func;
// }

// getFunction()(); // Error value is not defined

function getFunc() {
    let value = "test";

    let func = function () {
        console.log(value);
    }

    return func;
}

getFunc()(); // "test", from the Lexical Environment of getFunc

// In JavaScript before the code is published to production, it's compressed using a minifier -
// ... a special program that shrinks code by removing extra comments, spaces and - what's important,
// renames local varaibles into shorter ones.

// Summary

/*
The syntax:

let func = new Function ([arg1, arg2, ...argN], functionBody);
For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
Functions created with new Function, have [[Environment]] referencing the global Lexical Environment, not the outer one. 
Hence, they cannot use outer variables. But that’s actually good, because it insures us from errors. 
Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.

*/