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

// The optional second parameter allows us to start searching from a given position

let saying = "Widget with id";

console.log(saying.indexOf('id', 2));

// if we are interested in all occurrences, we can run indexOf in a loop 

let strr = `As sly as a fox, as strong as an ox`;

let target = `as`;

let pos = 0;

while(true) {
    let foundPos = strr.indexOf(target, pos);
    if(foundPos == -1) break;

    console.log(`Found at ${foundPos}`);
    pos = foundPos + 1;
}

/* Shorter version
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}*/

// str.lastIndexOf(substr, position)
// this method searches from the end to the beginning

// There is a slight inconvenience with indexof in the if test

let splew = "Widget with id";

if(splew.indexOf("Widget")) {
    console.log("We found it");
}

// because indexOf returns 0 in this case it returns false and does not get executed
// so we should check for -1 like this:

let splew2 = "Widget with id";
if(splew2.indexOf("Widget") != -1) {
    console.log("We found it");
}

// The bitwise NOT trick

console.log(~splew2.indexOf("Widget")); // it reads if found

// includes, startsWith, endsWith
// str.includes(substr, pos) returns true or false depending if str contains substrc in it
// it is the right choice if we test for a match, but don't need its position

console.log("Widget with id".includes("Widget"));
console.log("Hello".includes("Bye"));

// the optional second argument str.includes is the position to start searching from

console.log("Widget".includes("id"));
console.log("Widget".includes("id", 3));

// the methods str.startsWith and str.endsWith do what they say

console.log("Widget".startsWith('Wid'));
console.log("Widget".endsWith('get'));

// Getting a substring
// There are three methods in JS to get a substring: substring, substr, and slice

// str.slice(start [, end])
// returns the part of the string from strat to but not including end

let gString = "stringify";
console.log(gString.slice(0, 5));
console.log(gString.slice(0, 1));

// negative values for start/end are also possible. 
// they mean the position is counted from the string end:

let hString = "stringify";

console.log(hString.slice(-4, -1));

// str.substring(start [, end])
//returns the part of the string between start and end

let strX = "stringify";

// these are same for substring
console.log( strX.substring(2, 6) ); // "ring"
console.log( strX.substring(6, 2) ); // "ring"

// ...but not for slice:
console.log( strX.slice(2, 6) ); // "ring" (the same)
console.log( strX.slice(6, 2) ); // "" (an empty string)

// Negative arguments in substring are not supported, they are treated as 0

// str.substr(start [, length])
// returns the part of the string from start, with the given length
// it specifies the length instead of position

let gangstaString = "Hoodgfam";

console.log(gangstaString.substr(0, 4));

// the first argument may be negative if we count from the end

console.log(gangstaString.substr(-3, 3));

// From these methods its enough to remember slice()

// Comparing strings
// Strings are compared character by character in alphabetic order
// Although there are some oddities

// 1. A lowercase is always greater than the uppercase:

console.log( 'a' > 'Z' );

// 2. Letters with diacrtical marks are "out of order"

console.log( 'Österreich' > 'Zealand' );

// Each character corresponds to numeric code. 
// There are special methods that allow us to get the character for the code and back

// str.codePointAt(pos)
// returns the code for the character at position pos:

console.log("z".codePointAt(0));
console.log("Z".codePointAt(0));

// String.fromCodePoint(code)
// Creates a character by its numeric code

console.log(String.fromCodePoint(90));

// We can also add Unicode characters by their codes using \u follow by the hex code
console.log('\u005a');

let alphabet = '';

for (let i = 65; i <= 220; i++) {
    alphabet += String.fromCodePoint(i);
}
console.log( alphabet );

// The characters are compared by their numeric code.
// All lowercase letters go after uppercase letters because their codes are greater


// Correct comparison
// All modern browsers require the additional library Intl.js
// which supports the internationalization standard ECMA-402
// It provides a special method to compare strings in different languages, following their rules

// The call str.localeCompare(str2) returns an integer indicating...
// whether str is less, equal or greater than str2
// according to the language ruls:
// * Returns a negative if str is less than str2
// * Returns a positive if str is greater than str2
// * Returns 0 if they are equivalent

console.log( 'Österreich'.localeCompare('Zealand') ); // -1


// Internals, Unicode
// This is for emoji, rare mathematical symbols, hieroglypic characters or other rare symbols.



/**
 * There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions ${…}.
Strings in JavaScript are encoded using UTF-16.
We can use special characters like \n and insert letters by their Unicode using \u....
To get a character, use: [].
To get a substring, use: slice or substring.
To lowercase/uppercase a string, use: toLowerCase/toUpperCase.
To look for a substring, use: indexOf, or includes/startsWith/endsWith for simple checks.
To compare strings according to the language, use: localeCompare, otherwise they are compared by character codes.
There are several other helpful methods in strings:

str.trim() – removes (“trims”) spaces from the beginning and end of the string.
str.repeat(n) – repeats the string n times.
…and more to be found in the manual.
Strings also have methods for doing search/replace with regular expressions. 
But that’s big topic, so it’s explained in a separate tutorial section Regular expressions.
*/