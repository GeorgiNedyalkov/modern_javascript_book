// Class checking: "instanceof"

// The instanceof operator allows to check whether an object belongs to a certain class. 
// It also takes inheritance into account.

// Such a check may be necessary in many cases. For example, it can be used for building polymorphic function,
// the one that treats arguments differently depending on their type.

// The instanceof operator

// obj instanceof Class;

class Rabbit {}
let rabbit = new Rabbit();

//  it is an object of Rabbit class
console.log(rabbit instanceof Rabbit); 

// It also works with constructor functions
function Wabbit() {}
console.log(new Wabbit() instanceof Wabbit); 

// and with built-in classes like array

let arr = [1, 2, 3]; 
console.log( arr instanceof Array ); // true
console.log( arr instanceof Object ); // true

// Normally, instanceof examines the prototype chain for the check. 
// We can also set a custom logic in the static method Symbol.hasInstance

// The algorithm of obj instanceof Class works roughly as follows:

// 1. If there is a static method Symbol.hasInstance, then just call it: Class[Symbol.hasInstance](obj)
// It should return either true or false. 

// setup instanceOf check that assumes that
// anything with canEat property is an animal 

class Animal {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}

let obj = { canEat: true };

console.log(obj instanceof Animal); // true Animal[Symbol.hasInstance](obj) is called

// 2. Most classes do not have Symbol.hasInstance. In that case, the standard logic is used: obj instanceof
// Class checks whether Class.prototype is equal to one of the properties in the obj prototype chain.

// In other words, compare one after another:
/*
    obj.__proto__=== Class.prototype?
    obj.__proto__.__proto__=== Class.prototype?
    obj.__proto__.__proto__.__proto__=== Class.prototype?
    
    if any answer is true, return true
    otherwise, if we reached the end of the chain, return false
*/ 

class Human {}
class Man extends Human {}

let person = new Man();
console.log(person instanceof Human); 

// person.__proto__=== Human.prototype (no match)
// person.__proto__.__proto__=== Human.prototype (match!)

// There is also a method objA.isPrototypeOf(objB), that returns true if objA is somewhere in the 
// chain of prototypes of objB. So the test of obj instanceof Class can be rephrase as
// Class.prototype.isPrototypeOf(obj)

// Bonus: Object.prototype.toString for that type
// We already know that plain objects are converted to string as [object Object];:

// That's their implementation of toString. But there's a hidden feature that makes toString actually  
// much more powerful than that. 

// Summary

/*
    Type-checking methods:
    * typeof - works for primitives - returns string
    * {}.toString - works for primitives, buil-in objects, objects with Symbol.toStringTag - returns string
    * instanceof - works for objects - returns true/false
*/ 

// {}.toString is technically a "more advanced" typeof
// instanceof operator works great when we are working with a class hierarchy and want to check for
// the class taking into account inheritance