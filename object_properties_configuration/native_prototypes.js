// Native prototypes

// The "prototype" property is widely used by the core of JavaScript itself. 
// All built-in functions use it.

// Object.prototype

let obj = {};
console.log(obj);

console.log(obj.__proto__=== Object.prototype);

// Other built-in objects such as Arrays, Date, Function and other also keep methods in prototypes.

let arr = [1, 2, 3];

console.log(arr.__proto__=== Array.prototype);
console.log(arr.__proto__.__proto__=== Object.prototype);
console.log(arr.__proto__.__proto__.__proto__);

// Some methods in prototypes may overlap, for instance, Array.prototype has its own toString
// that lists comma-delimited elements;

console.log(arr);

// Primitives

//  The most intricate thing happens with strings, numbers and booleans

// They are no objects. But if we try to access their properties, temporary wrapper objects are
// created using built-in constructors String, Number and Boolean. They provide methods and disappear.
// Methods of these objects also reside in prototypes, available as String.prototype, Number.prototype 
// and Boolean.prototype

// (!) special values null and undefined stand apart. They have no object wrappers, so methods and
// properties are not available for them. And tehre are no corresponding prototypes either. 

// Changing native prototypes

// Native prototypes can be modified. If we add a method to String.prototype, it becomes available to all
// strings

String.prototype.show = function() {
    console.log(this);
};

"BOOM".show();

// Generally adding built-in methods to native prototypes is a bad idea. 

// (!) Prototypes are global, so it's easy to get a conflict. If two libraries add a methods
//  String.prototype.show, the one of them will be overwriting the method of the other.

// In modern programming, there is only one case where modifying native prototypes is approved.
// That's polyfilling.

// Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification,
// but is not yet supported by a particular JavaScript engine. 

// Borrowing from prototypes

// Some methods of native prototypes are often borrowed.

let object = {
    0: "Hello",
    1: "World!",
    length: 2,
};

object.join = Array.prototype.join;

console.log(object.join(', '));

// We can only inherit from one object at a time.

// Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.

// Summary
// All built-in objects follow the same pattern
// * The methods are stored in the prototype (Array.prototype, Object.prototype, Data.prototype, etc.)
// * The object itself stores only the data (array items, object properties, the date)
// Primitives also store methods in prototypes of wrapper objects: Number.prototype
// Only undefined and null do not have wrapper objects
// Built-in prototypes can be modified or populated with new methods. But it's not recommended to change
// them. The only allowable case is probably when we add-in a new standard, but it's not yet supported by the
// JavaScript engine