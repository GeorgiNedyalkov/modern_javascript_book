// Logical operators
// There are 4 logical operators ||, &&, !, ?? (Nullish Coalescing)

// || (OR)
// let result = a || b;

console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);

if (1 || 0) {
    console.log('truthy');
}

let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
    console.log('The office is closed.'); // it is the weekend
}

// The OR operator
// - evaluates from left to right.
// - converts each operand to boolean. If true stops and retuns original value of operand
// - if all operands were evaluated and are false, returns the last operand.

console.log(1 || 0);
console.log(null || 1);
console.log(null || 0 || 0);
console.log(undefined || null || 0);

// 1. Geting the first value from a list of expressions
let firstName = '';
let lastName = '';
let nickName = "SuperCoder";

console.log(firstName || lastName || nickName || "Anonymous");

// 2. Short-circuit evaluation
// the || processes its arguments until the first truthy value is reached,
// and then the value is returned immediately, without touching the other argument

// && (AND)

// result = value1 && value2 && value3
// - evaluates operands from left to right
// - converts each operand into a boolean.
// if false stops and returns the original value of the operand
// if all operands were evaluated and are truthy, return the last operand.
// AND returns the first falsy value or the last value if none were found.


console.log(1 && 0);
console.log(1 && 5);
console.log(null && 5);
console.log(1 && 2 && 3);

// ! (NOT)
// Accept a single argument and does the following
// converts the operand to boolean: true or false
// returns the inverse value

console.log(!true)
console.log(!0)

// a double NOT !! sometimes converts a value to a boolean type

if (age >= 14 && age <= 90) console.log('You are not a child.');


// Check the login
/* Write the code which asks for a login with prompt.

If the visitor enters "Admin", then prompt for a password, if the input is an empty line or Esc – show “Canceled”, if it’s another string – then show “I don’t know you”.

The password is checked as follows:

If it equals “TheMaster”, then show “Welcome!”,
Another string – show “Wrong password”,
For an empty string or cancelled input, show “Canceled”
*/

let userName = prompt("Who is there?", "");

if (userName == "Admin") {

    let password = prompt("What's your password?", "");

    if (password == "TheMaster") {
        console.log("Welcome");
    } else if (password == "") {
        console.log("Canceled");
    } else {
        console.log("Wrong password")
    }

} else if (userName === "" || userName === null) {
    console.log("Canceled")
} else {
    console.log("I don't know you")
}