// Strings

// In JS the textual data is stored as strings. There is no separate type for a single character
// The international format for strings is always UTF-16

// Quotes
// "", '', ``

let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;

// single and double quotes are the same
// backticks allow us to embed any expression into the string with ${...}

function sum(a, b) {
    return a + b;
}

console.log(`1 + 2 = ${sum(1,2)}`);

// another advantage of backticks is that they allow us to strore strings in multiple lines

let guests = `Guests:
  * Gosho
  * Paco
  * Sasho
`;

console.log(guests);

// Special characters
// "newline character", written as \n, denotes a line break:

let guestList = "Guests: \n * John\n * Pete\n * Mary";

console.log(guestList);

// There are other special characters
/**
 * \n - newline
 * \r - in windows text files \r\n represents a new break
 * \', \" - Quotes
 * \\ - Backslash
 * \t - Tab
 * \b, \f, \v - Backspace, form feed, vertical tab - kept for compatibility, not used nowdays
 * \xXX unicode character with the given hexadecimal Unicode XX e.g. \x7A is the same as 'z'
 * \uXXX A unicode symbol with the hex code XXXX in UTF-16 encoding, 
 * for example: \u00A9 - copright symbol © - it must be exactly 4 hex digits
 * \u{X…XXXXXX} (1 to 6 hex characters) A Unicode symbol with the given UTF-32 encoding.
 * Some rare characters are encoded with two Unicode symbols, taking 4 bytes. This way we can insert long codes.
*/

console.log("\u00a89");
console.log("\u{20331}");
console.log("\u{1F60D}");

// All special characters start with a backslash character \ also called "escape character"
// We aslo might want to use it to insert a quote on a string

console.log('Life\'s beautiful! - said Goshi');

// only quotes with the same enclosings must be escaped 
// a better more elegant solution
console.log(`Life's beautiful - said Goshkata`);

// if we want to show the backslash we use \\

// String length
console.log("seven".length);

// Length is a property not a function

// Accessing characters
// to get a character at position pos, use square brackets [pos] or...
// call the method str.charAt(pos). The first character starts from the zero position:

let str = `Hello`;

// the first character
console.log(str[0]);
console.log(str.charAt(0));

// the last character
console.log(str.charAt(str.length - 1));

// the differense between these methods is that [] returns undefined as chartAt returns an empty string

let str1 = `Hello`;

console.log( str1[1000] ); // undefined
console.log( str1.charAt(1000) ); // '' (an empty string)

// Strings are immutable
// Strings can't be changed in JavaScript

let greetings = 'Hi';
greetings[0] = 'h';
console.log(greetings[0]);

// the usual workaround is to create a whole new string and assign it to str instead

let greets = 'Hi';
greets = 'h' + greets[1];
console.log(greets);

// Changing the case

// Methods toLowerCase() and toUpperCase() change the case:

console.log(`Interface`.toLowerCase())
console.log(`Interface`.toUpperCase())

// if we want a single character lowered
console.log(`Interface`[6].toUpperCase());

// Searching for a substring
// str.IndexOf
// str.indexOf(substr, pos)

let sentence = "Here is a simple sentence";

console.log(sentence.indexOf("Here"));
console.log(sentence.indexOf("sentence"));
console.log(sentence.indexOf("here"));