// JSON methods, toJSON

// Let's say we have a complex object, and we'd like to convert it into a string,
// ... to send it over a network, or just to output it for logging purposes.

// Such a string should include all important properties

let user = {
    name: "John",
    age: 30,

    toString() {
        return `{name: "${this.name}", age: ${this.age}}`;
    }
};

console.log(user);

// Updating such a function can be quite complex as we change the different properties
// ... values and functions of an object. There is a specific method for this purpose;

// JSON.stringify

// The JSON (JavaScript Object Notation) is a general format to represent values and objects
// It is described as in RFC 4627 standard.It's easy to use JSON for data exchange
// ... when the client uses JavaScript and the server it's written on Ruby/PHP/Java
// JavaScript provides methods:
// * JSON.stringify to convert objects into JSON
// * JSON.parse to convert JSON back into an object

let student = {
    name: "John",
    age: 30,
    isAdmin: false,
    courses: [`html`, `css`, `js`],
    wife: null
};

let json = JSON.stringify(student);

console.log(typeof json);

console.log(json);

// The method JSON.stringify(student) takes the object and converts it into a string.
// The resulting json string is called a JSON-encoded or serialized or marshalled object
// JSON-encoded object has several important differences from the object literal:
// * Strings use double quotes. No single quotes or backticks in JSON. So 'John' becomes "John"
// * Object property names are double-quoted also. That's obligator. So age:30 becomes "age": 30
// JSON.stringify can be applied to primitives as well. JSON supports the following data types:
/**
 * Objects {...}
 * Arrays [...]
 * Primitives
 ** Strings
 ** Numbers
 ** Boolean values true/false
 ** null
*/

// For example:

// a number in JSON is just a number
console.log(JSON.stringify(1)) // 1

// a string in JSON is still a string, but double-quoted
console.log(JSON.stringify('test')) // "test"

console.log(JSON.stringify(true)); // true

console.log(JSON.stringify([1, 2, 3])); // [1,2,3]

// JSON is data-only language-independent specification, so some JavaScript-specific object
// ... properties are skipped by JSON.stringify. Namely:

/**
 * Function properties (methods)
 * Symbolic keys and values
 * Properties that store undefined
*/

console.log(' ');

let userX = {
    sayHi() { // ignored
        alert("Hello");
    },
    [Symbol("id")]: 123, // ignored
    something: undefined // ignored
};

console.log(JSON.stringify(userX)); // {} (empty object)

// That's fine. But we can customize the process also. Shown later.

// The great thing is that nested objects are supported and converted automatically

let meetup = {
    title: "Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
};

console.log(JSON.stringify(meetup));

// The important limitation: There must be no circular references

// For instance:

// let room = {
//     number: 23
// };

// let meetupTwo = {
//     title: "Conference",
//     participants: ["json", "ann"]
// };

// meetupTwo.place = room;
// room.occupiedBy = meetupTwo;

// JSON.stringify(meetupTwo);  // throws an error

// Excluding and transforming: replacer
// The full sytanx of JSON.stringify is:

// let json2 = JSON.stringify(value[, replacer, space]);

// value - a value to encode
// replacer - Array of properties to encore or a mapping function - function (key, value)
// space - Amount of space to use for formatting
// Most of the time we use, JSON.stringify with the first argument only.
// But if we need to fine-tune the replacement process, like to filter out circular references
// We can use the second argument of JSON.stringify

let table = {
    number: 42
};

let gathering = {
    title: "Backroom",
    participants: [{ name: "Geremiah" }, { name: "Alice" }],
    place: table
}

table.occupeidBy = gathering;

console.log(JSON.stringify(gathering, ['title', 'participants', 'place', 'name', 'number']));

console.log(JSON.stringify(gathering, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));

// Formatting: space
// The third argument of JSON.stringify (space) is the number of spaces to use for pretty formatting
// The space argument is used exclusively for a nice output.

// Custom "toJSON"

let livingroom = {
    size: 50,
    toJSON() {
        return this.size;
    }
}

// JSON.parse

// To decode a JSON-string, we need another method JSON.parse

let value = JSON.parse(str, [reviver]);

// str is string to parse
// reviver...
// optional function(key, value) that will be called for each (key, value) pair and can transform the value

let numArr = "[0, 1, 2, 3]";

numArr = JSON.parse(numArr);

console.log(numArr[1]);

// The JSON may be as complex as necessary. Objects and arrays can include other objects and arrays.
// But they must obey the same JSON format.
// property names should be with quotes
// single quotes in value are not accpeted (must be double)
// single quotes in key are not accepted (must be double)
// no "new" keyword is allowed, only bare values

// JSON does not support comments. Adding comments to it makes it invalid.

// Using reviver
// When we stringify a Date or a nested object when we use JSON.parse
// We get an error as it cannot by itself turn them back to objects from a string
// Here is how we use reviver to do it

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let venue = JSON.parse(str, function (key, value) {
    if (key == 'date') return new Date(value);
    return key;
})

// This works for nested objects as well
// Summary
/**
 * JSON is a data format that has its own independent standard and libraries for most programming languages.
 * JSON supports plain objects, arrays, strings, numbets, booleans and null
 * JavaScript provides methods JSON.stringify to serialize into JSON and JSON.parse to read from JSON
 * Both methods support transformer functions for smart reading/ writing
 * If an object has toJson, then it is called by JSON.stringify
*/

// Tasks 
// Turn the object into JSON and back

let human = {
    name: "John Smith",
    age: 35
};

JSON.stringify(human);