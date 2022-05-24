// Methods of Primitives

// Javascript allows us to work with primitives as if they were objects.
// They also have methods to call.

// These are the key distinctions between objects and primitives:
// A primitive
/**
 * Is a value of a primitive type
 * There are 7 primitive types: number, bigInt, string, bool,  symbol, null, and undefined
*/

// An object
/**
 * Is capable of storing multiple variables as properties
 * Can be created with {}. Functions are also objects
*/

let john = {
    name: "John",
    sayHi: function() {
        console.log("Hi Buddy!");
    }
};

john.sayHi()

// A primitive as an object
// In order for strings, numbers, symbols and bool to use methods...
// a special "object wrapper" provides the extra functionality and then its destroyed.

// The object wrappers are different for each primitive type: String, Number, Boolean, Symbol and BigInt.
// Here is an example with a string

let str = "Ola";
console.log(str.toUpperCase());

// The JS engine optimizes this process. 
// here is a method for numbers

let n = 1.23456;
console.log(n.toFixed(2));

// Constructors String/ Number/ Boolean are for internal use only

console.log(typeof 0);
console.log(typeof new Number(0));

// Objects are always truthy in if statements
let zero = new Number(0);

if(zero) {
    console.log("zero is truthy!");
}

// null/ undefined have no methods

// Summary
/**
 * Primitives except null and undefined provide many helpful methods. 
 * Formally, these methods work via temporary objects.
*/

let stringg = "Hello";
stringg.test = 5;
console.log(stringg.test); // unidentified when (no use strict)

// The above example shows why primitives are not objects. They cannot store additional data.