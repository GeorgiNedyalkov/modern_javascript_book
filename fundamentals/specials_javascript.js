// Summary from previous lessons and some subtle moments

// Code structure
// statements are deliminated with a semicolon - ;
// a line-break is also treated as a deliminator
// sometimes automatic delimination does not work
// we should put semicolons are each statement
// semicolons are not required after {}
// but it wont be an error as it is ignored

// Strict mode
// to fully enable all modern JavaScript features...
// we should start the script with 'use strict'
// the directive must be in top of the script in the beginning.

// Variables
// Can be declared with let, const (constant can't be changed), var(old-style)
// a variable name can include:
// letters and digits, but the first character cannot be a digit
// characters $ and _ are normal, on par with letters
// non-latin alphabets and hieroglyphs are allowed, but not commonly used.
// variables are dynamically typed. They can store any value:
let x = 5;
x = 'John';

// There are 8 data types:
// number - for both floating-point and integer numbers
// bigint - for integer numbers of arbitrary length
// string - for strings
// boolean - for values of true or false
// null - a type with a single value null, meaning empty or does not exist
// undefined - a type with a single value undefined, meaning "not assigned".
// object and symbol - for complex data structures and unique identifiers.

// the typeof operator returns the type for a value, with two exceptions

typeof null == "object";
typeof function () { } == "function"

// Interaction
// Using the browser
// prompt(question, [default])
// Ask a question, and return either what the visitor entered or null if they clicked "cancel".
// confirm(question)
// Ask a question and suggest to choose between Ok and Cancel. The choice is returned true/false
// alert(message)
// Output a message
// All these functions are model, they pause the code execution and limits the interactions until the user answers

// Operators
// Arithmetical *, +, -, / and %, **
// + concatenates strings

// Assignments - a = 2
// Bitwise
// bitwise operators work with 32-bit interegers at the lowest, bit-level.
// Conditional
// cond ? resultA : resultB
// Logical operators &&, ||, !
// Nullish coalescing operator ??
// Comparisons equality check == and ===
// there are other operators like the comma operator

// Loops
// while
// do... while
// for
// directables break and continue let us exit or skip the current iteration

// Switch construct
// uses strict equality

// Functions
// declaration
// expression
// arrow functions
// Functions may have local variables: those declared inside its body or its parameter list.
// Such variables are only visible inside the function.
// Parameters can have default values: function sum(a = 1, b = 2) {...}.
// Functions always return something. If there’s no return statement, then the result is undefined.