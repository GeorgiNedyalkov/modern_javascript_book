// Object.keys, values, entries

// For plain objects, the following methods are available:
/**
 * Object.keys(obj) - returns an array of keys.
 * Object.values(obj) - returns an array of values.
 * Object.entries(obj) - returns an array of [key, value] pairs 
*/

let user = {
    name: "John",
    age: 30
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

for (let value of Object.values(user)) {
    console.log(value);
}

// Objects.keys/values/entries ignore symbolic properties
// Just like a for..in loop, these methods ignore properties that use Symbol(...) as keys.

// Transform objects
// Objects lack many methods that exist for arrays, e.g. map, filter and others.
// If we like to apply them, then we can use Object.entries followed by Object.fromEntries: 
/**
 * 1. Object.entries(obj) to get an array of key/value pairs from obj
 * 2. Use array methods on that array, e.g. map, to transform these key/value pairs.
 * 3. Use Object.fromEntries(array) on the resulting array to turn it back into an object
*/

// We have object with prices and we would like to double them:

let prices = {
    banana: 1,
    orange: 2,
    meat: 4
};

let doublePrices = Object.fromEntries(
    // convert prices to array, map each key/value pair into another pair
    // and then fromEntries gives back the object
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

console.log(doublePrices.meat);

// Tasks

// Sum the properties
// Write a function that returns the sum of all salaries using Object.values and for..of loop

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSalaries(salaries) {
    let sumSalaries = 0;

    for (let salary of Object.values(salaries)) {
        sumSalaries += salary;
    }

    return sumSalaries;
}

console.log(sumSalaries(salaries));

function functionalSumSalaries(salaries) {
    return Object.values(salaries).reduce((a, b) => a + b, 0);
}

console.log(functionalSumSalaries(salaries));

// Count properties

let person = {
    name: 'John',
    age: 30
};

function count(obj) {
    let counter = 0;

    for (let prop of Object.keys(obj)) {
        counter++;
    }

    return counter;
}
console.log(count(person)); // 2

function simpleCount(obj) {
    return Object.keys(obj).length;
}

console.log(simpleCount(person)); // 2
