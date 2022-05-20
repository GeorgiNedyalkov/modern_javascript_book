// Object references and copying
// objects are stored and copied by reference

let message = "Hello!";
let phrase = message;

console.log(message)
console.log(phrase)

message = "Bye Felicia!"

console.log(message)
console.log(phrase)

// A variable assinged to an object stores not the object, but its "address in memory"
// in other words "a reference" to it.

let user = {
    name: "John"
};

// The object is stored somewhere in memory while the user variable has a
// reference to it.

// When an object variable is copied, the reference is copied, but the object itself is...
// not duplicated

let secondUser = { name: "Son" };
let admin = user; // copy the reference

// Both variables above reference the same object
// We can modify the contents from both variables

let person = { name: "Georgi" };
let administrator = person;

administrator.name = "Peter";

console.log(administrator.name);

// Comparison by reference
// two objects are equal only if they are the same object
let a = {};
let b = a;

console.log(a == b);
console.log(a === b);

let x = {};
let y = {};

console.log(x === y);

// // for comparisons like obj1 > obj2 objects are converted to primitives

// Cloning and merging, Object.assign
// We can create a new object and replicate the structure of the existing one,
// by iterating over its properties and copying them on the primitive level.

let human = {
    name: "Sonya",
    age: 45
}

let clone = {};

for (let key in human) {
    clone[key] = human[key];
}

// now the clone is a fully independent object with the same content
clone.name = "Steven";

console.log(clone.name);

// We can also use Object.assing method.
// syntax: Object.assing(dest, [src1, src2, src3...])
/**
 * The first argument dest is a target object
 * Further arguments src1, ..., srcN (can be many as needed) are source objects.
 * In copies the properties of all source objects src1, ..., srcN into the taget dest
 * Properties of all arguments strating form the second are copied into the first object.
 */

// For instance we can merge several objects into one:

let viking = { name: "Torvi" };

let skills1 = { canFight: true };
let skills2 = { canSing: true };

// copies all properties from skill1 and skill2 into viking
Object.assign(viking, skills1, skills2);

console.log(viking.name);
console.log(viking);

// if a copied property already exists, it gets overwritten;

Object.assign(viking, { name: "Ragnar" });

console.log(viking);

// we also can use Object.assign to replace for ..in loop for simple cloning
let chief = {
    name: "Bjorn",
    nickname: "Ironside"
};

let chiefClone = Object.assign({}, chief);

console.log(chiefClone);

// There are also other method for cloning objects such as the spread syntax clone  = {...user}

// Nested Cloning
// properties can also be references to other objects

let warrior = {
    name: "Achillies",
    size: {
        height: 1.80,
        weight: 89
    }
};

console.log(warrior.size.height);

// Deep cloning
// can use either a recursion or _.cloneDeep(obj) for lodash library

/**
 * Summary
Objects are assigned and copied by reference. In other words, 
a variable stores not the “object value”, but a “reference” (address in memory) for the value. 
So copying such a variable or passing it as a function argument copies that reference, not the object itself.
All operations via copied references (like adding/removing properties) are performed on the same single object.
To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” 
(nested objects are copied by reference) or a “deep cloning” function, such as _.cloneDeep(obj).
 */