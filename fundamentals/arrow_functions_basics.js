// Arrow functions
// there is another very simple and concise syntax for creating funxtions
// arrow functions

// let func = (arg1, arg2, ..., argN) => expression;

function sumNums(a, b) {
    return a + b;
}

let sum = (a, b) => a + b;

let double = n => n * 2;

let power = (base, exponent) => base ** exponent;

console.log(sum(67, 2))
console.log(double(5));
console.log(power(5, 2));


// Arrow functions can be used in the same way as Function Expressions

/*
let age = prompt('What is your age?', 18);

let welcome = (age < 18) ?
    () => alert('Hello!') :
    () => alert('Greetings!');

welcome()
*/
// Multiline arrow functions
// Sometimes we need more complex function.
// We can use curly braces in that case
// but we always must return withing them with a return value

let sumMultiLine = (a, b) => {
    let result = a + b;
    return result;
}

console.log(sumMultiLine(9, 8));


/* Summary
  Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

  Without curly braces: (...args) => expression – the right side is an expression: 
  the function evaluates it and returns the result. Parentheses can be omitted, 
  if there’s only a single argument, e.g. n => n*2.
  With curly braces: (...args) => { body } – brackets allow us to write multiple statements inside the function,
  but we need an explicit return to return something.
*/

function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);

