// Data Types in JS
// There are 8 data types

// 1. Number
// JavaScript is a Dynamically typed language. You can put a number in a variable and then change it to a string.
let message = "Hi";
message = 42;

let n = 1;
let pi = 3.14;

// There are special numeric values: Infinity, -Infinity, NaN
let infinity = 1 / 0;
alert(infinity);
alert(Infinity);

// NaN represents computational error. It is the result of incorrect or undefined mathematical operation.
alert("not a number" / 3);

// 2. BigInt
// JavaScript cannot represent integer value larger than (2^23 - 1) or its negative equivalent.
// BigInt are used for number of arbitrary length.
// Typically for microsecond-precision timestamps or cryptography.
// You indicate a bigint by writing "n" at the end of a number;

let bigNumber = 1235014905345340534850304503485n;

// 3. String
// String have three type of quotes "", '', ``;
// Backticks are functionality quotes

let myName = "Georgi Nedyalkov";

alert(`Allow me to re-introduce myself my name is ${myName}`)
alert(`I am twenty years younger than my mother. She is 48 and I am ${48 - 20}`);

// ** In JavaScript there is no character type like char in Java or C.

// 4. Boolean
let haveToPee = true;

let artimethicIsCorrect = 2 - 1 == 0;
alert(artimethicIsCorrect);

// 5. The "null" value
// a separate type of its own. It is a value that represents "nothing", "empty" or "value unknown"

let mySoulMate = null;

// 6. The "undefined" value
// Value is not assigned

let bestFriend;
alert(bestFriend);

// These are all the primitive data types in JavaScript: Number, BigInt, String, Bool, Null, Undefined

// 7. Objects and Symbols
// The object type is special.
// Objects can store collections of data and more complex entities.
// The symbol type is used to create unique identifiers for objects.

// The typeof operator returns the type of the argument

typeof bestFriend;
typeof 0;
typeof haveToPee;
typeof artimethicIsCorrect;
typeof bigNumber;
typeof Math;
typeof null;
typeof alert;

/*  Summary
  There are 8 basic data types in JavaScript.
 - number for numbers of any kind: integer or floating-point, integers are limited by ±(253-1).
 - bigint is for integer numbers of arbitrary length.
 - string for strings. A string may have zero or more characters, there’s no separate single-character type.
 - boolean for true/false.
 - null for unknown values – a standalone type that has a single value null.
 - undefined for unassigned values – a standalone type that has a single value undefined.
 - object for more complex data structures.
 - symbol for unique identifiers.
 - The typeof operator allows us to see which type is stored in a variable.

 - Usually used as typeof x, but typeof(x) is also possible.
 - Returns a string with the name of the type, like "string".
 - For null returns "object" – this is an error in the language, it’s not actually an object.
 - In the next chapters, we’ll concentrate on primitive values and once we’re familiar with them, we’ll move on to objects.
*/