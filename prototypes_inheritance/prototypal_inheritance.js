// Prototypal inheritance

// In programming we often want to take something and extend it.

// For instance, we have a user object with its properties and methods, and want to make admin and guest
// as slightly modified variants of it. We'd like to reuse what we have in user, not copy/ reimplement its
// methods, just build a new object on top of it.

// [[Prototype]]

// In Javascript, objects have a special hidden property [[Prorotype]] (as named in the specification), that is
// either null or references another object. That object is called "a prototype"

// When we read a property from object, and it's missing, JavaScript automatically takes it from the 
// prototype. In programming, this is called "prototypal inheritance". And soon we'll study many examples of 
// such inheritance, as well as cooler language features upon it.

// The property [[Prototype]] is internal and hidden, but there are many ways to set it.
// One of them is to use the special name __proto__, like this:

let animal = {
    eats: true,
    walk() {
        console.log("Animal walk");
    }
}; 
let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

// Now if we read a property from rabbit, and it's missing. JavaScript will automaticall take it from animal.

console.log(rabbit.eats);
console.log(rabbit.jumps);

// animal is the prototype of rabbit or rabitt prototypically inherits from animal.
// So if animal has a lot of useful properties and methods, then they become automatically available in rabbit.
// Such properties are called "inherited"
rabbit.walk();

// The prototype chain can be longer

let longEar = {
    earLength: 10,
    __proto__: rabbit
};

longEar.walk();
console.log(longEar.jumps);

//  Now if we read something from longEar, and it's missing, Javascript will look for it in rabbit, and then in animal

// There are only two limitations:
//  1. The references can't go in circles. JavaScript will throw an eror if we try to assign __proto__ in a circle.
//  2. The value of __proto__ can be either an object or null. Other types are ignored.

// Also it may be obvious, but still: there can be only one [[Prototype]]. An object may inherit from two others.

// (!) __proto__ is a historical getter/ setter for [[Prototype]]
// __proto__ is not the same as the internal [[Prototype]]. It's a getter/setter for [[Prototype]]. 
// The __proto__ property is a bit outdated. Modern JavaScript suggests that we should use 
// Object.getPrototypeOf/ Object.setPrototypeOf functions instead.

// Writing doesn't use prototype
// The prototype is only used for reading properties.
// Write/delete operations work directly with the object.

rabbit.walk = function() {
    console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk();  // Rabbit! Bounce-bounce!

// Accessor properties are an exception, as assignment is handled by a setter function. So writing such a 
// property is actually the same as calling a function

let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith

admin.fullName = "Alice Cooper"; 

console.log(admin.fullName);
console.log(user.fullName);

// The value of "this"
// "this" is not affected by prototypes at all.
// No matter where the method is found: in an object or its prototype. In a method call, this is always
// the object before the dot.
// So, the setter call admin.fullName= uses "admin" as "this", not "user"

// This is important because if we have big project when we make a big object with many methods, and have
// objects that inherit form it. They only can modify their own stats, not the state of the big object.

animal = {
    walk() {
        if (!this.isSleeping) {
            console.log(`I walk`);
        }
    }, 
    sleep() {
        this.isSleeping = true;
    }
};

rabbit = {
    name: "White Rabbit", 
    __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping);
console.log(animal.isSleeping);

// If we had other objects, like bird, snake, etc., inheriting from animal, they would also gain access to
// methods of animal. But this in each method call would be the corresponding object, evaluated at the call-time
// (before dot) not animal. So when we write data into this, it is soted into these objects. 

// As a result, methods are shared, but the object state is not.

// for..in loop
// The for..in loop 

console.log(Object.keys(rabbit)); 

for(let prop in rabbit) console.log(prop);

// If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method
// obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) property name key

// (!) almost all key/value-getting methods ignore inherited properties, such as Object.keys, Object.values
// They only operate on the object itself. Properties from the prototype are not taken into account. 

// Summary 
/**
 * In JS, all objects have a hidden [[Prototype]] property that's either another object or null.
 * We can use obj.__proto__ to access it (a historical getter/setter, there are other ways)
 * The object referenced by [[Prototype]] is called a "prototype"
 * If we want to read a property of obj or call a method, and it doesn't exist, then JS tries to find it in the prototype
 * Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter)
 * If we call obj.method(), and the method is taken from the prototype, this still references obj. 
   So methods always work with the current object even if they are inherited. 
 * The for..in loop iterates over both its own and its inherited properties. All other key/value-getting 
   methods only operate on the object itself.
 */

// Tasks
