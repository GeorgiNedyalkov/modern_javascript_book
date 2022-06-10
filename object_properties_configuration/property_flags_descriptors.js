'use strict'
// Property flags and descriptors

// Object properties have different configuration options
// Then we will learn how to turn them into getter/setter functions

// Property flags
// Object properties besides value, have three special attributes also called "flags":
/*
    * Writable - if true, the value can be changes, otherwise it's read-only
    * Enumerable - if true, then listed in loops, otherwise not listed
    * Configurable - if true, the property can be deleted and these attributes can be modified
    otherwise not
*/

// When we create a property the usual way all of them are true. But we can also change them anytime

// The method Object.getOwnPropertyDescriptor allows to query the full information about a property.

// let descriptor = Object.getOwnPropertyDescriptor(objk, propertyName)

// Obj - the object to get information from
// propertyName - The name of the property

// The return value is a so-called "property descriptor" object: it contains the value and all the flags

let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));

// To change the flags, we can use Object.defineProperty
// The syntax: 
// Object.defineProperty(obj, propertyName, descriptor)
// obj, propertyName - The object and its property to apply the descriptor
// descriptor object to apply

// If the property exists, defineProperty updates its flags. Otherwise, it creates the property with the given
// value and flags; in that case, if a flag is not supplied, it is assumed false

// For instance, here a property name is created with all falsy flags;

let person = {};

Object.defineProperty(person, "name", {
    value: "John"
});

let descriptor2 = Object.getOwnPropertyDescriptor(person, 'name');

console.log(JSON.stringify(descriptor2, null, 2));

// effects of the flags

// Non-writable
// Let's change user.name to non-writable (can't be assigned) by changing writable flag;

let user2 = {
    name: "Steve",
};

Object.defineProperty(user2, "name", {
    writable: false
});

// user2.name = "Pete"; // TypeError: Cannot assign to read only property 'name' of object '#<Object>'

let user3 = {};

Object.defineProperty(user3, "name", {
    value: "Sonari",
    enumerable: true,
    configurable: true
});

console.log(user3.name);
// console.log(user3.name = "Petey"); // TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// Non-enumerable
// Now let's add a custom toString to user

// Normally, a built-in toString for object is non-enumerable, it does not show up in for..in.
// But if we add a toString of our own, then by default it shows up in for..in 

let human = {
    name: "Goshi",
    toString() {
        return this.name;
    }
};

for(let key in human) {
    console.log(key);
}

// If we don't lie it, then we can set enumerable: false. Then it won't appear ina  for..in loop

let person1 = {
    name: "Jenny",
    toString() {
        return this.name;
    }
};

Object.defineProperty(person1, "toString", {
    enumerable: false
});

// Now our toString disappears
for (let key in person1) console.log(key); 

// Non-enumerable properties are also excluded from Object.keys:

console.log(Object.keys(person1));

// Non-configurable
// This flag is sometimes preset for built-in objects and properties.
// A non-configurable property can't be deleted, its attributes can't be modified
// For example Math.PI

let descriptor4 = Object.getOwnPropertyDescriptor(Math, "PI");

console.log(JSON.stringify(descriptor4, null, 2));

// We can neither change the value of Math.PI
// Math.PI = 3;  // Error, because it was writable: false
// Delete Math.PI won't work either
// We also can't change Math.PI to be writeable again:

// Object.defineProperty(Math, "PI", { writable: true }); // TypeError: Cannot redefine property: PI

// Please note: configurable: false prevents changes of property flags and its deletion, 
// while allowing to change its value
// Here user.name is non-configurable, but we can still change it (as it's writable)

let xuser = {
    name: "Xavier",
};

Object.defineProperty(xuser, "name", {
    configurable: false
});

xuser.name = "Pete";
// delete xuser.name; // TypeError: Cannot delete property "name" of #<Object>

// Here we make uzer.name a "forever sealed" constant, just like the built-in Math.PI:

let uzer = {
    name: "Zoro"
};

Object.defineProperty(uzer, "name", {
    writable: false,
    configurable: false
});

// won't be able to change user.name or its flags
// all of these won't work
/*
    user.name = "Pete"
    delete user.name
    Object.defineProperty(user, "name", { value: "Pete "})
*/

// The only attribute change possible: writeable true -> false
// There's a minor exception about changing flags.
// We can change writeable: true to false for non- configurable property, 
// thus preventing its value modification (to add another layer of protection)

// Object.defineProperties
// There's a method Object.defineProperties(obj, desciptors) that allows to define many properties at once

// The syntax is:
/*
    Object.defineProperties(obj, {
        prop1: descriptor1,
        prop2: descriptor2
        // ....
    })
*/

// For instance:

Object.defineProperties(user, {
    name: { value: "John", writable: false },
    surname: { value: "Smith", writable: false },
    // ...
});

// So we can set many properties at once

// Object.getOwnPropertyDescriptors

// To get all property descriptors at once, we can use the method Object.getOwnPropertyDescriptors(obj)
// Together with Object.defineProperties

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptor(obj));

// This is the preferred method to clone an Object

// Sealing an object globally
/*
    Property descriptors work at the level of individual properties
    There are also method that limit access to the whole object:
    * Object.preventExtensions(obj)
    Forbids the addition of new properties to the object
    * Object.seal(obj)
    Forbids adding/ removing/ changing of properties. Sets configurable: false, writable: false
    for all existing properties

    And also there are tests for them:
    * Object.isExtensible(obj)
    Returns false if adding properties is forbidden, otherwise true
    * Object.isSealed(obj)
    Returns true if adding/ removing properties is forbidden, and all existing properties have configurable: false
    * Object.isFrozen(obj)
    Returns true if adding/ removing/ changing properties is forbidden, and all current properties are
    configurable: false, writable: false
*/

















































































































































































































