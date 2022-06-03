// Variable scope, closure

// JavaScript is a very functional-oriented language.
// A function can be created at any moment, passed as an argument to another function,
// ... and then called by a totally different place of code.

// A function can access variables outside of it ("outer" variables)
// But what happens if outer variables change since a function is created?

// What if a function is passed along as a parameter and called in another place of code.

// Code blocks
// If a variable is declared inside a code block {...}, it's only visible inside that block.
// We can use this to isolate a piece of code that does its own tasks, the variable only belong to it.

// For if, for, while and so on, variables declared in {...} are only visible inside

// Nested functions
// A function is called "nested" when it is created inside another function

function sayHiBye(firstName, lastName) {
    function getFullName() {
        return firstName + " " + lastName;
    }

    console.log("Hello, " + getFullName());
    console.log("Bye, " + getFullName());
}

sayHiBye("Jordan", "Peterson");

// Here the nested function is made for convenience. It can access the outer variables
// and so can return the full name.

// Nested functions can be returned: either as a property of an object or as a result by itself.
// It can be used somewhere else and still has access to the same outer variables.

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter());

// Slightly modified variants of that code have practical uses, for instance, as random number generator

// Lexical Environment

// For clarity, the explanation is split into multiple steps.

// Step 1. Variables
// In JavaScript, every running function, code block {...}, and the script as a whole
// ... have an internal (hidden) associated object know as the Lexical Environment

// The Lexical Environment object consists of two parts:
// 1. Environment Record - an object that stores all local variables as its properties
// ... (and some other information like the value this)
// 2. A reference to the outer lexical environment, the one associated with the outer code.

// A "variable" is just a property of the special internal object, "Environment Recod"
// ... "To get or change a variable means "toget or change a property in that object

// 1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
// * Initially, they are the "Uninitialized" state. That's a special internal state,
// ... it means that the engine knows about the variable, but it cannot be referenced
// ... until it has been declared with let.
// 2. If there is no assignmet to a variable, its value is undefined.
// 3. We can assign a value
// 4. We can change a value

// A variable is a property of a special internal object, associated with the currently
// ... executing block/ function/ script
// Working with variables is actually working with the properties of that object

// Lexical Environment is a special object
// It only exists "theoretically" in the language specification to describe how things work.
// We can't get this object in our code and manipulate it directly.

// Step 2. Function Declarations

// A function is also a value, like a variable
// The difference is that a Function declaration is instantly fully initialized
// When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function
// (unlike let , that is unusable till the declaration)
// That's way we can use a function, declared as Function Declaration, even before the declaration itself
// This only applies to Function Declarations, not Function Expressions where we assign a function into a variable

// Step 3. inner and outer Lexical Envirnment

// When a function runs, at the beginning of a call, a new Lexical Environment is created automatically
// ... to store local variables and parameters of the call.

let phrase = "Hello";

function say(name) {
    console.log(`${phrase}, ${name}`);
}
say("John"); // Hello, Jon

// During the function call we have two Lexical Environments: the inner one (for the function call)
// and the outer one (global):
// * The Innter Lexical Environment corresponds to the current execution of "say". It has a single property:
// "name", the function argument. We called say("John"), so the value of the "name" is "John".
// * The outer Lexical Environment is the global Lexical Environment. It has the phrase variable and the function itself

// The inner Lexical Environment has a reference to the outer one.

// When the code wants to access a variable - the inner Lexical Environment is searched first,
// ... then the outer one, then the more outer one and so on util the global one.

// If a variable is not found anywhere, that's an error in strict mode
// ... (without use strict, an assignment to a non-existing variable creates a new global variable, for compitiblity with old code)

// In this example the search proceeds as follows:
// * For the name variable, the alert inside this finds it immediately in the inner Lexical Environment
// * When it wants to access phrase, then there is no phrase locally, so it follows the reference to the outer
// ... Lexical Environment and finds it there

// Step 4. Returning a function

// Let's take the make Counter example
/*
    function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
    }

    let counter = makeCounter();
*/

// At the beginning of each makeCounter() call, a new Lexical Environment object is created,
// ... to store variables for this makeCounter run.
// So we have two nested Lexcial Environments
// The difference is that during the execution of makeCounter(), a tiny nested function is created
// ... of only one like: return count++. We don't run it yet, only create it.

// All functions remember the Lexical Environment in which they were made. Technically, there's no magic here:
// All functions have the hidden property name [[Environment]], that keeps the reference to the Lexical Environement
// Where the function was created

// So, counter.[[Environment]] has the reference to {count: 0} Lexical Environment. That's how the function
// Remembers where it was created, no matter where it's called.
// The [[Enironment]] reference is set once and forever at function creation time.

// Later, when counter() is called, a new Lexical Environment is created for the call, and its outer Lexical
// ... Environment reference is taken from counter.[[Environment]]

// Now when the code inside counter() looks for count variable, it first searches its own Lexical Environment
// (emtpy, as there are no local variables there), then the Lexical Environment of the outer
// ... makeCounter() call, where it finds and changes it.

// A variable is updated in the Lexical Environment where it lives

// If we call counter() multiple times, the count variable will be increase to 2, 3 and so on, at the same place.

// Closure

// There is a general programming term "closure", that developers generally should now.

// A closure function that remembers its outer variables and can access them.
// In some languages that's not possible, or a function should be written in a special way to make it happen.
// But as explained above, in JavaScript, all functions are naturally closures
// (There is only one exception, which we will see later)

// That is: they automatically remember where they were created using a hidden [[Environment]] property
// ... and their code can access outer variables.

// When on an interview, a front end developer gets a question about "what's a closure"
// A valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures.
// Maybe a few more words about technical details: the [[Environment]] property and how Lexical Environments work.

// Garbage collection

// Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes.
// That's because there are no references to it. As any JavaScript object, it's only kept in memory while its reachable

// However, if there's a nested function that is still reachable after the end of a funciton,
// then it has [[Environment]] property that references the lexical environment.

function f() {
    let value = 123;

    return function () {
        console.log(value);
    }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment of the corresponding f() call

// If f() is called many times, and resulting functions are saved, then all corresponding
//... Lexical Environment objects will also be retained in memory.

function x() {
    let value = Math.random();

    return function () { console.log(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [x(), x(), x()];

// A Lexical Environment object dies when it becomes unreachable (just like any other object).
// In other words, it exists only while there's at least one nested function referencing it.

// Real-life optimizations

// While a function is alive, all outer variables are also retained.

// But in practise, JavaScript engines try to optimize that. They analyze variable usage and if it's obvious
// from the code that an outer variable is not used - it is removed.

// An important side effect in V8 (Chrome, Edge, Opera) is that such a variable will become unavailable in debugging.

function sum(a) {
    return function (b) {
        return a + b;
    }
}

function inBetween(a, b) {
    return function (x) {
        return x >= a && x <= b;
    }
}

console.log(inBetween(3, 6));

function inArray(arr) {
    return function (x) {
        return arr.includes(x);
    };
}

let arr1 = [1, 2, 3, 4, 5, 6, 7];
let arr2 = [1, 2, 3, 4, 5, 6, 7];

console.log(arr1.filter(inArray([1, 2, 10])));
console.log(arr1.filter(inBetween(3, 6)));

// Sort by field

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName) {
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

// Army of functions
