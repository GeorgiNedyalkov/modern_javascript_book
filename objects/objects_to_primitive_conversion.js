// Object to primitive conversion

// If we try to use operators on objects...
// JS auto-converts objects to primitives, and then the operation is carried out over
// those primitives and results in s primitive value

// E.g. we can't make objects representing vectors or matrices (or achievements),
// add them and expect a "summed"

// There is no maths with objects in real projects.

// In this lesson we will cover how an object converts to primitive and how to customise it.

// 1. It will allow us to understand what's going on in case of coding mistakes,
// when such opertaion happens accidentally
// 2. There are exceptions, where such operations are possible and look good.
// E.g. subtracting or comparing dates (Date objects).

// Conversion Rules
// 1. There is no conversion to boolean. All objects are true in a boolean context. There exist
// only numeric and string conversions.
// 2. The numeric conversion happens when we subtract objects or apply mathmatical functions.
// Date objects can be subtracted, and the result of datq1 - date2 is the time difference between two Dates.
// 3. For String conversions - it usually happens when we output an object alert(obj) and in similar context.

// We can implement string and numeric conversion by ourselves, using special object methods.

// Hints
// For an object-to-string conversion, when we're doing an operation on an object that expects a string like
// alert:

// output
//console.log(obj);

// using object as a property key
anotherObj[obj] = 123;

// number
// for an object-to-number conversion, like when we're doing maths:

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;

// "default"
// occurs in cases where the operator is not sure what type to expect.
// if a binary plus gets an object as argument, it uses the "default" hint to convert it.
// Also if an object is compared using == with a string, number or a symbol, it's
// also unclear which conversion, should be done, so the "defaul" hint is used.

// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
// if (user == 1) { ... };

// the < and > can work with strings and numbers too. They use the "number" hint,
// not the "default" hint

// To do the conversion, JavaScript tries to find and call three object methods:
// 1. Call obj[Symbol.toPrimitive](hint) - the method with the symbolic key
// Symbol.toPrimitive (system symbol), if such method exists
// 2. Otherwise if hint is "string"
// * try calling obj.toString() or obj.valueOf(), whatever exists.
// 3. Otherwise if hint is "number" or "default"
// * try calling obj.valueOf() or obj.toString(), whatever exists.

// Symbot.toPrimitive

obj[Symbol.toPrimitive] = function (hint) {
    // here goes the code to convert this object to a primitive
    // it must return a primitive value
    // hint = one of "string", "number", "default"    
};

let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// conversions demo:
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// toString/valueOf
// The toString method returns a string "[object Object]"
// The valueOf method returns the object itself.

let person = { name: "Jorje" };
console.log(person);
console.log(person.valueOf() === user);

// A conversion can return any primitive type
// These methods must return a primitive, not an object

// Further conversions

// If we pass an object as an argument, then there are two stages of calculatiosn:
// The object is converted to a primitive
// If the necessary for further calculations, the resulting primitive is also converted

// Summary

/*
The object-to-primitive conversion is called automatically by many built-in functions
and operators that expect a primitive as a value.

There are 3 types (hints) of it:

"string" (for alert and other operations that need a string)
"number" (for maths)
"default" (few operators, usually objects implement it the same way as "number")
The specification describes explicitly which operator uses which hint.

The conversion algorithm is:

Call obj[Symbol.toPrimitive](hint) if the method exists,
Otherwise if hint is "string"
try calling obj.toString() or obj.valueOf(), whatever exists.
Otherwise if hint is "number" or "default"
try calling obj.valueOf() or obj.toString(), whatever exists.
All these methods must return a primitive to work (if defined).

In practice, it’s often enough to implement only obj.toString() as a “catch-all” method 
for string conversions that should return a “human-readable” representation of an object, 
for logging or debugging purposes.
*/