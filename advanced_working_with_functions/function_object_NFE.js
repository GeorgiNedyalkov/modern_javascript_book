// Function object, NFE

// In javascript function are also objects and they have properties as well
// we can add/remove properties from them, pass them by reference etc. 

// The "name" property
// Function have some useable properties like the "name" property

function sayHi() {
    console.log("Hi");
}

console.log(sayHi.name);

// The name-assigning logic is smart. It assigns the correct name to a function
// ... even if it's create without one, and then immediately assing

let sayHello = function () {
    console.log("Hi");
};

console.log(sayHello.name);

// It also works if the assignment is done via a default value:

function f(sayHi = function () { }) {
    console.log(sayHi.name);
}

f();

// This feature is called a "contextual name".
// If the function does not provide one, then in an assignment it is figured out

// Object methods have names too:

let user = {
    sayHi() {
        // ....
    },

    sayBye: function () {
        // ...
    }
}

console.log(user.sayHi.name);
console.log(user.sayBye.name);

// There are cases when there's no way to figure out the right name.
// In that case, the name property is empty

// function created inside array
let arr = [function () { }];

console.log(arr[0].name); // <empty string>
// the engine has no way to set up the right name, so there is none

// In practicem, however, most functions have a name

// The "length" property

// There is another built-in property "length" that returns the number of
// function parameters.

function f1(a) { }
function f2(a, b) { }
function many(a, b, ...more) { }

console.log(f1.length)
console.log(f2.length)
console.log(many.length)

// rest parameters are not counterd

// The length property is sometimes used for introspection in functions
// ... that operate on other functions.

// For instance, in the code below the ask function accepts a question to ask
// and an arbitrary number of handles functions to call.

// Once a user provides their answer, the function calls the handlers
// We can pass two kinds of handles:
// * A zero-argument function, which is only called when the user gives a positive answer
// * A function with arguments, which is called in either case and returns an answer

// To call handler the right way, we examine the handler.length property

// The idea is to have a simple, no-argument handler syntax for positive cases (most frequent variant)
// but are able to support universal handlers as well

// function ask(question, ...handlers) {
//     let isYes = confirm(question);

//     for (let handler of handlers) {
//         if (handler.length == 0) {
//             if (isYes) handler();
//         } else {
//             handler(isYes);
//         }
//     }
// }

// for positive answer, both handlers are called
// for negative answer, only the second one
// ask("Question?", () => console.log('You said yes'), result => console.log(result));

// This is a particular case of so-called polymorphism - treating arguments differently
// depending on their type or, in our case depending on the length.

// Custom properties
// We can also add properties of our own
// Here we add the counter property to track total calls count:

function sayWhatUp() {
    console.log("What up?");

    // let's count how many times we run
    sayWhatUp.counter++;
}

sayWhatUp.counter = 0; // initial value

sayWhatUp();
sayWhatUp();

console.log(`Called ${sayWhatUp.counter} times`); // Called 2 times

// A property is not a variable
// A property assigned to a function like sayWhatUp.counter = 0 does not define a local variable
// ... counter inside it. In other words a property counter and a variable let counter are 2 unrelated things

// We can treat a function as an object, store properties in it, but that has no effect on its execution
// Variables are not function properties and vice versa. These are just parallel worlds

// Function properties can replace closure sometimes.

// function makeCounter() {
//     // instead of:
//     // let count = 0

//     function counter() {
//         return counter.count++;
//     };

//     counter.count = 0;

//     return counter;
// }

// let counter = makeCounter();
// console.log(counter());
// console.log(counter());

// The count is now stored in the function directly, not in its outer Lexical Environment

// Is it better or worse than using a closure?

// The main difference is that if the value of count lives in an outer variable,
// ... then external code is unable to access it. Only nested functions may modify it.
// And if it's boud to a function, then such a thing is possible:

function makeCounter() {
    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    return counter;
}

let counter = makeCounter();

counter.count = 10;
console.log(counter());

// The choice of implementation depends on our aims.

// Named Function Expression
// A term for functions that have a name

// Let's get an ordinary Function expression:
let greetPerson = function (who) {
    console.log(`Hello, ${who}`);
};

// and add a name to it

let greet = function func(who) {
    console.log(`Hello, ${Johnathan}`);
}

// The function is still available as greetPerson()

greetPerson("Dima");

// There are two special things about the name func, that are the reasons for it:
// 1. It allows the function to reference itself internally
// 2. It is not visible outside of the function 

let sayWhatItDoCuz = function func(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func("Who dis?");
    }
};

sayWhatItDoCuz();

func();  // error func is not defined

let sayHiii = function func(who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        func("Guest"); // Now all fine
    }
};

let welcome = sayHiii;
sayHiii = null;

welcome(); // Hello, Guest (nested call works)

// 