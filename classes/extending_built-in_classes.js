// Extending built-in classes

// Built-in classes like Array, Map and others are extendable also

// class PowerArray extends Array {
//     isEmpty() {
//         return this.length == 0;
//     }
// }

// let arr = new PowerArray(1, 2, 5, 10, 50);
// console.log(arr.isEmpty());

// let filteredArr = arr.filter(item => item >= 10); 
// console.log(filteredArr);
// console.log(filteredArr.isEmpty()); 

// Built-in methods filter, map and others - return new objects of exactly the inherited type PowerArray
// Their internal implementation uses the object's constructor property for that. In the example above
// arr.constructor === PowerArray

// We can customise this behavior even more.

// We can add a special static getter Symbol.species to the class. 

class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
    
    static get [Symbol.species]() {
        return Array;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50); 
console.log(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10); 

// filteredArr is not PowerArray, but Array
console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

// .filter returns Array. So the extended functionality is not passed any further

// (!) other collections, such as Map and Set, work alike. They also use Symbol.species.

// No static inheritance in built-ins

// Built-in objects have their own static methdods, Object.keys, Array.isArray etc.
// Native classes extend each other, Array extends Object.

// Normally, when one class extends another, both static and non-static methods are inherited.
// For example, both Array and Date inherit from Object, so their instances have methods from 
// Object.prototype. But Array.[[Prototype]] does not reference Object, so there's no, for instance,
// Array.keys() (or Data.keys()) static method
