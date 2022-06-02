// Rest parameters and spread syntax

// Rest parameters...

// A function can be called with any number of arguments, no matter how its defineds

function sum(a, b) {
    return a + b;
}

console.log(sum(1, 2, 3, 4, 5));

// There is no error of exessive arguments. But the result is only the first two.

// The rest parameters can be included in the function definition by using three dots ...
// followed by the name of the array that will contain them. The dots literally mean
// ... gather the remaining parameters into an array

function sumAll(...args) {
    let sum = 0;

    for (let arg of args) sum += arg;
    return sum;
}

console.log(sumAll(1, 54, 323, 5));
console.log(sumAll(1, 54, 3, 5));
console.log(sumAll(1, 4, 23, 5));

// We can choose to get the first parameters as variables, and gather only the rest.

function showName(firstName, lastName, ...titles) {
    console.log(firstName + ' ' + lastName);

    console.log(titles[0]);
    console.log(titles[1]);
    console.log(titles.length);
}

showName("Julius", "Ceasar", "Consul", "Imperator");

// The rest parameter must be at the end.
// The rest parameter gathers all remaining arguments.

// The "Arguments" variable

// There is a special array-like object named arguments that contains all arguments by their index

function pritnName() {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
}

showName("Julius", "Ceasar");
showName("Ilya");

// Arrow functions do not have "arguments"
// If we access the arguments object from an arrow function,
// ... it takes them from the outer "normal" function.
// Arrow functions don't have their own this.

// Spread Syntax

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log(Math.max(...arr1, ...arr2));

console.log(13, ...arr1, 3454, arr2, 25);

let str = "hello";

console.log(...str);

// Array.from() converts an iterable (like a string) into an array
// The result is the same as [...str] but there is a subtle difference
// * Array.from operates on both array-likes and iterables
// * The spread syntax works only with iterables.
// So, for the task of turning something into an array, Array.from is more universal

// Copy an array/object

let numArr = [1, 2, 3];

let arrCopy = [...numArr];

// do the arrays have the same contents?
console.log(JSON.stringify(numArr) === JSON.stringify(arrCopy));

// are the arrays equal?
console.log(numArr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy
numArr.push(4);
console.log(numArr);
console.log(arrCopy);

// It is possible to do the same but with an object

let obj = {
    a: 1,
    b: 2,
    c: 3
};

// spred the object into a list of parameters. Then return the result in a new object
let objCopy = { ...obj };

console.log(JSON.stringify(obj) === JSON.stringify(objCopy));

console.log(obj === objCopy);

obj.d = 4;
console.log(JSON.stringify(obj));
console.log(JSON.stringify(objCopy));

// This way of copying objects is much shorter than let objCopy = Object.assign({}. obj)
// or for an arrays let arrCopy = Object.assign([], arr);

// Summary
/*
    When we see "..." in the code, it is either the rest parameters or the spread syntax.
    There's an easy way to distinguish between them:
    * When ... is at the end of function parameters, it's the "rest paraments" and gathers
    the list of arguments into an array.
    * When ... occurs in a function call or alike, it's called a "spread syntax" and expands
    an array into a list.

    Use patterns:
    * Rest parameters are used to create functions that accept any number of arguments.
    * The spread syntax is used to pass an array to functions that normally require a list of many arguments.
     
    Together they halp to travel between a list and an array of parameters with ease.
    All arguments of a function call ar also available in "old-style" arguments: array-like iterable object.

*/