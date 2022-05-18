// Functions

// function declaration

function greetEveryone() {
    console.log("Hi, everyone!");
}

// calling the funciton name and brackets executes the code inside of the function
greetEveryone();

// the main functions of the functions is to avoid code duplication

// Local Variables
// variable declared inside a function is only visible inside that function
// Global variables - outer variables can be accessed by functions as well.

// Parameters: declaration time term (arguments: call time term)
// we can pass arbitrary data to functions using parameters

function showMessage(from, text) {
    console.log(from + ': ' + text);
}

showMessage("Georgi", "What's up baby girl? 😎")

// Default Values
// if a function is called but an arguments is no provided, the the value is undefined.

showMessage("Ann")

// we can also pass a default value

function sayGoodbye(from, text = "Bye brother!") {
    console.log(from + ": " + text);
}

sayGoodbye("Goshi")

// function showMessage(from, text = anotherFunction()) {
// anotherFunction() only executed if no text given
// its result becomes the value of text
// }

// Evaluation of default parameters
// A default parameter is evaluated every time a function is called without the respective parameter.

// Alternative Default Parameters
// we can check if a parameter is passed during execution, by camparing it with undefined

function printMessage(text) {
    if (text === undefined) {
        text = 'empty message';
    }
    console.log(text);
}

printMessage("Hello my Tigga 🙋‍♂️");

// we can also use the || operator

function announceMessage(text) {
    text = text || 'empty';
    console.log(text)
}

announceMessage('yo yo');
announceMessage();

// nullish coalescing - it is better when most falsy values, such as 0, should be considerred normal

function showCount(count) {
    console.log(count ?? "unknown");
}

showCount(0);
showCount(null);
showCount();

// Returning a value
// a function call return a value back into the calling code as a result

function sum(a, b) {
    return a + b;
}

let result = sum(14, 22);
console.log(result);

// The directive return can be in any place of the function.
// When the execution reaches it, the function stops,
// and the value is returned to the calling code (assigned to result above).
/*
function checkAge(age) {
    if (age >= 18) {
        return true;
    } else {
        return confirm("Do you have permission from your parents?")
    }
}

let age = prompt("How old are you?", 18);

if (checkAge(age)) {
    alert('Access granted');
} else {
    alert('Access denied');
}
*/
// it is possible to use return without a value. The function will exit immediately
// a function with an empty return or without it returns undefined
// Never add a newline between return and the value;
// if you want the return expression to be in multiple lines you can use ()

// Naming a function
// functions are actions, naturally verbs.
// should be brief, descriptive and as accurate as possible
// start with a verbal prefix that describes the action. For example:
// get...() - returns a value
// show...() - means show something
// calc...() - calculate something
// check...() - check something and return a boolean
// create...() - create something.
// Examples:
//showMessage(..)     // shows a message
// getAge(..)          // returns the age (gets it somehow)
// calcSum(..)         // calculates a sum and returns the result
// createForm(..)      // creates a form (and usually returns it)
// checkPermission(..) // checks a permission, returns true/false

// One function - one action
// a function should do exactly what is suggested by name and no more.

// Ultra short function names: Jquery - $, Lodash - _

// Functions == Comments

function showPrimes(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        console.log(i); // a prime
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % 1 == 0) return false;
    }
    return true;
}

showPrimes(13);

/* Summary
    Values passed to a function as parameters are copied to its local variables.
    A function may access outer variables. But it works only from inside out. 
    The code outside of the function doesn’t see its local variables.
    A function can return a value. If it doesn’t, then its result is undefined.
    To make the code clean and easy to understand, 
    it’s recommended to use mainly local variables and parameters in the function, not outer variables.

    It is always easier to understand a function which gets parameters, 
    works with them and returns a result than a function which gets no parameters, 
    but modifies outer variables as a side effect.

Function naming:

    A name should clearly describe what the function does. When we see a function call in the code, 
    a good name instantly gives us an understanding what it does and returns.
    A function is an action, so function names are usually verbal.
    There exist many well-known function prefixes like create…, show…, get…, check… and so on. 
    Use them to hint what a function does.
    Functions are the main building blocks of scripts. 
    Now we’ve covered the basics, so we actually can start creating and using them. 
    But that’s only the beginning of the path. 
    We are going to return to them many times, going more deeply into their advanced features.
*/

function ternaryCheckAge(age) {
    return (age > 18) ? true : confirm('Did your parents allow you?');
}

function ORCheckAge(age) {
    return (age > 18) || confirm('Did your parents allow you?');
}

function min(a, b) {
    return (a < b) ? a : b;
}

console.log(min(2, 5))
console.log(min(3, -1))
console.log(min(1, 1))

function pow(x, n) {
    return x ** n;
}

console.log(pow(3, 2))
console.log(pow(3, 3))
console.log(pow(1, 100))