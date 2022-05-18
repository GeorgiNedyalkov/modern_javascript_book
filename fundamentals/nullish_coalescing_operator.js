// Nullish Coalescing Operator ??
// It treats null and undefined similarly.
// if a value is null or undefined is "defined"

// the result of: a ?? b
// if a is defined then a
// else a is b if a isn't defined

// in other words ?? returns the first arg if its null/ undefineds, else it returns the second arg.

// The common use for ?? is to provide a default value
let user;

console.log(user ?? "Anonymous"); // Anonymous (user not defined)

let userName = "John";
console.log(userName ?? "Anonymous"); // John (user defined)

// We can also use a sequence to select the first value from a list that isn't null/ undefined
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value: 
console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

// Comparison with ||
// || returns the first truthy value
// ?? returns the first defined value

// || does not destinguish between false, 0, or "" and null/ undefined

let height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0

// Precedence
// || and ?? have the same precedence value of 4
// important: use parentheses

let h = null;
let w = null;

let area = (h ?? 100) * (w ?? 50);
console.log(area)

// ?? cannot be used with other operators like || or &&
// You can use it only with specified parenthesis

// Summary 
/*
The nullish coalescing operator ?? provides a short way to choose the first “defined” value from a list.

It’s used to assign default values to variables:

// set height=100, if height is null or undefined
height = height ?? 100;
The operator ?? has a very low precedence, only a bit higher than ? and =, so consider adding parentheses when using it in an expression.

It’s forbidden to use it with || or && without explicit parentheses.
*/