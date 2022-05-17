// Type Conversions
// string conversion

let value = true;
console.log(typeof value);

value = String(value);
console.log(typeof value);
console.log(value + " that");

// Numeric Conversion
// numeric conversion happens automatically in mathematical functions and expressions. 
console.log('8' / '4');

// explicit conversion
// usually required when we read a value from a string-based source like a text form.
let stringPi = "3.14";
console.log(typeof stringPi);
stringPi = Number(stringPi);
console.log(typeof stringPi);

// numeric conversion rules:
// undefined becomes NaN
// null becomes 0
// true and false become: 1 or 0
// string removes all whitespace and returns 0 if the string is empty. Eror gives NaN
// null becomes 0 
// undefined becomes NaN
console.log(Number("     235     "));
console.log(Number(true));
console.log(Number(false));
console.log(Number("g682"))
console.log(Number(null))
console.log(Number(undefined))

// Boolean Conversion
// values that are empty: 0, "", null, undefined, NaN become false
// all other vallues are true

console.log(Boolean(1))
console.log(Boolean(2))
console.log(Boolean(""))
console.log(Boolean("Ain't that the truth"))
console.log(Boolean(null))

// Sumary
/**The three most widely used type conversions are to string, to number, and to boolean.

String Conversion – Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.

Numeric Conversion – Occurs in math operations. Can be performed with Number(value).

The conversion follows the rules:

Value	Becomes…
undefined	NaN
null	0
true / false	1 / 0
string	The string is read “as is”, whitespaces from both sides are ignored. An empty string becomes 0. An error gives NaN.
Boolean Conversion – Occurs in logical operations. Can be performed with Boolean(value).

Follows the rules:

Value	Becomes…
0, null, undefined, NaN, ""	false
any other value	true
Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

undefined is NaN as a number, not 0.
"0" and space-only strings like " " are true as a boolean.
 * 
 */

