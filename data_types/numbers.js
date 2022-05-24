// Numbers
// in modern Java Script there are two data types:
// 1. Regular numbers. Stored in 64-format IEEE-754, a.k.a 
// 'double precision floating point numbers'.
// 2. BigInt numbers - represent integers of arbitrary length.
// they are sometimes needed as number can't safely exceed 2**53 and -2**53

// More ways to write a number

let billion = 1000000000;

// we can also use an underscore as a separator:
let twoBillion = 2_000_000_000;

// We can also shorten a numbe by appending the letter 'e' and specifying the zero count after a number

let million = 1e6;

console.log(1e3 === 1 * 1000);

// We can also write something very small like a microsecond
let mcs = 0.0000001;

// We can again use the letter 'e' with a negative sign to express zeroes infront of a number
let twoMcs = 1e-6;  // six zeroes from the left of 1

console.log(twoMcs);

// a negative number after "e" means a division by 1 with the given number of zeroes:

console.log(1e-3 === 1 / 1000);
console.log(1.23e-6 === 1.23 / 1000000);

// Hex, binary and octal numbers

// Hexadecimal numbers are used in JS to represent colors, encode characters,
// and many other things. There is a shorter way to write them with 0x and then the number
console.log(0xff);
console.log(0xFF === 0xff); // same as above case doesn't matter

// binary and octal numeral systems are rarely used, but also supported using the 0b and 0o prefixes:

let a = 0b11111111;
let b = 0o377;

console.log(a == b);

// There are only 3 numeral systems with such support.
// For other numeral systems we should use the function parseInt

//toString(base)

// The method num.toString(base) returns a string representation of num in the numeral system
// with the given base. For example:

let num = 255;

console.log(num.toString(16));
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString() === 255);

// the base can vary from 2 to 36. By default is 10

// Common use cases are:
/**
 * base=16 is used for hex colors, character encodings, digits can be 0...9 or A...F
 * base=2 is mostly used for debugging bitwise operations, digits can be 0 or 1
 * base=36 is the maximum, digits can be 0...9 or A...Z. 
 * it is used when we need to turn a long numric identifier into something into a shorter form
 */

console.log(1735348520345234758932475832757832459..toString(36));

// The syntax above uses .. because when we use a method on a number ne need ..

// Rounding 
// Math.floor() 
// * Rounds down: 3.1 becomes 3, and -1.1 becomes -2
// Math.ceil()
// * Rounds up: 3.1 becomes 4, -1.1 becomes -1
// Math.round()
// * Rounds to the nearest integer: 3.1 becomes 3, 3.6 becomes 4, the middle case: 3.5 rounds up to 4 too
// Math.trunc()
// * Removes anything after the decimal point without rounding: 3.1 becomes 3, -1.1 becomes -1

// These functions cover all of the possible ways to deal with the decimal part of a number.

// If we want to round to an x number of digits in a decimal we can use two methods.

// 1. Multiply-and-divide
let number = 1.23456;

console.log(Math.round(number * 100) / 100);

// 2. The method toFixed(n)
let n = 1.23456
console.log(n.toFixed(2));

// it rounds up to the closest integer similar to math.round
console.log(n.toFixed(1));

// The result toFixed is a string. If the decimal part is shorter then 0's are added to the end
console.log(n.toFixed(10));

// Imprecise calculations
// A number is represented in a 64-bit format IEEE-754, so there are exactly 64 bits to represent a number.
// 52 of them are used to store the digits, 11 of them store the position of the decimal point.
// they are 0 for integer numbers and 1 bit is for the sign.
// If a number is too huge it may overflow the 64-bit storage and become a special numeric value Infinity
console.log(1e500);

// Consider this falsy equality test
console.log(0.1 + 0.2 == 0.3);
console.log(0.1 + 0.2);

// decimal point numbers are unending fractions in their binary form
// The most reliable solution is the sum.toFixed 

let sum = 0.1 + 0.2;
console.log(sum.toFixed(2) == 0.3);

// we can also temporary multiply the numbers by 100 (or a bigger number) 
// to turn them into integers, do the math and divide back.
// This works but we still get imprecision on division.

// Tests: isFinite and isNaN
// NaN and Infinity are both a number type. 
// They are not normal numbers and have special functions to check for them
console.log(isNaN(NaN));
console.log(isNaN("sttr"));

// The value NaN is unique and does not equal to anything even itself

// IsFinite is sometimes used to validate whether a string value is a regular number:
let numz = 123;
console.log(isFinite(numz));
console.log(isFinite(NaN));

// Compare with Object.is
// The built-in method Object.is compares values like ===
// but is more reliable for two edge cases:
// 1. It works well with NaN: Object.is(NaN, NaN) === true
// Values 0 and -0 are different: Object.is(0, -0) === false, 
// technically that’s true, because internally the number has a sign bit that may be different 
// even if all other bits are zeroes.

// parseInt and parseFloat
// numeric conversion using a plus + or a Number() is strict. If a value is not exactly a number, it fails:
console.log(+"100px"); // NaN

// The sole exception is spaces at the beginning or the end of the string, as they are ignored.
// We need a way to represent number like 100$ and 100px that have a specific symbol
// that denominates some metric or currency

// This is why ParseInt and ParseFloat are for
// They "read" a number from a string until they can't.

console.log(parseInt('100px'));
console.log(parseFloat('12.5em'));

console.log(parseInt('12.3'));
console.log(parseInt('12.3.4'));

// there are situations when parseInt/ parseFloat will return NaN
console.log(parseInt('a123'));

// The second argument of parseInt(str, radix)
// radix specifies the base of the numerical system, so ParseInt can also parse strings of hex, binary, etc.

console.log( parseInt('0xff', 16) ); // 255
console.log( parseInt('ff', 16) ); // 255, without 0x also works

console.log( parseInt('2n9c', 36) ); // 123456

// Other Math Functions
// Math.random() returns a random number from 0 to 1(not including 1)
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

// Mat.max(a, b, c...) / Math.min(a, b, c...)
// returns the greatest/ smallest from the arbitrary number of arguments

console.log( Math.max(3, 5, -10, 0, 1) ); // 5
console.log( Math.min(1, 2) ); // 1

// Math.pow(n, power)
// Returns n raised to the given power
console.log(Math.pow(2, 10)); // 2 in power 10 = 1024

// There are more functions and constant in Math object, including trigonometry
// Which you can find in the docs for the Math object

// Summary
/**
* To write numbers with many zeroes:
Append "e" with the zeroes count to the number. 
Like: 123e6 is the same as 123 with 6 zeroes 123000000.
A negative number after "e" causes the number to be divided by 1 with given zeroes. 
E.g. 123e-6 means 0.000123 (123 millionths).
For different numeral systems:

Can write numbers directly in hex (0x), octal (0o) and binary (0b) systems.
parseInt(str, base) parses the string str into an integer in numeral system with given base, 2 ≤ base ≤ 36.
num.toString(base) converts a number to a string in the numeral system with the given base.
For converting values like 12pt and 100px to a number:

Use parseInt/parseFloat for the “soft” conversion, 
which reads a number from a string and then returns the value they could read before the error.
For fractions:

Round using Math.floor, Math.ceil, Math.trunc, Math.round or num.toFixed(precision).
Make sure to remember there’s a loss of precision when working with fractions.
More mathematical functions:

See the Math object when you need them. The library is very small, but can cover basic needs.
*/

// Tasks

// Create a script that prompts the visitor to enter two numbers and then shows their sum.
let x = +prompt("What is the first number?", "");
let y = +prompt("What is the second number?", "");

alert(x + y);

// Create a function that repeats until input is a number

function readNumber() {
    let num;

    do {
        num = prompt("Enter a number please?", 0);
    } while (!isFinite(num));

    if(num === null || num === '') return null;

    return +num;
}

alert(`Read: ${readNumber()}`);