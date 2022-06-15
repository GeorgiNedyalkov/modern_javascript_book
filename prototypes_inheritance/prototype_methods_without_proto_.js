// Prototype methods, objects without __proto__

// There are modern methods to set up a prototype

// * Object.create(proto, [descriptors]) - creates an empty object with given proto as [[Prototype]] and
// optional property descriptops
// * Object.getPrototypeOf(obj) - returns the [[Prototype]] of obj to proto.
// * Object.setPrototypeOf(objj, proto) - sets the [[Prototype]] of obj to proto

// These should be used instead of proto

let animal = {
    eats: true
};

// create a new object with animal as prototype
let rabbit = Object.create(animal);

console.log(rabbit.eats);

console.log(Object.getPrototypeOf(rabbit) === animal);

Object.setPrototypeOf(rabbit, {});

// Object.create has an optional second argument: property descriptors. 
// We can provide additional properties to the new object there, like this:

let giraffe = Object.create(animal, {
    jumps: {
        value: true
    }
});

console.log(giraffe.jumps)

// We can use Object.create to perform an object cloning more powerful than using for..of

let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

// This make a truly exact copy of obj, including all properties: enumarable and non-enumerable,
// data properties and setters/getters - everything, adn with the right [[Prototype]]

// Brief histyor of [[Prototype]]
// * The "prototype" property of a constructor function has worked since very ancient times.
// * Later, in the year 2012, Object.create appeared in the standard. It gave the ability to create objects
// with a given prototype, but did not provide the ability to get/set it. So browsers implemented the 
// non-standard __proto__ accessor that allowed the user to get/set a prototype at any time. 
// Later, in the year 2015, Object.setPrototypeOf and Object.getPrototypeOf were added to the standard,
// to perform the same functionality as __proto__. As __proto__ was de-facto implemented everywhere,
// it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional
// for non-browser environments

// (!) Don't change the [[Prototpye]] on existing objects if speed matters
// JavaScript engines are highly optimized when we set a prototype for an object once at its creation
// Changing a prototype "on-the-fly" with Object.setPrototypeOf or obj.__proto__= is a very slow operation
// as it breaks internal optimizations for object property access operations. So we must avoid it.

// "Very plain" objects
// 