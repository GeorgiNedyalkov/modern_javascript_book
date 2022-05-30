// Destructuring assignment
// destructuring assignment is a special syntax that allows us to "unpack" arrays
// ... or objects into a bunch of variables, as sometimes that's more convenient
// Destructuring also works great with complex functions that have a lot of 
// ... parameters, default values, and so on.

// Array destructuring

let arr = ["John", "Smith"];

// destructuring assignment
// sets firstname = arr[0];
// sets surname = arr[1];

let [firstname, surname] = arr;

console.log(firstname);
console.log(surname);

// It looks great when combined with split or other array-returning methods:

let [fname, sname] = "John Smith".split(' ');
console.log(fname);
console.log(sname);

// Destruturing does not mean destructive
// it copies the items into variables but does not modify the array
// it's just a shorter way to write
/*
let firstName = arr[0];
let surname = arr[1];
*/

// Ignore elements using commas
// Unwanted elements of the array can also be thrown away via an extra comma:

let [fstName, title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(title);

// Works with any iterable on the right-side
// we can use with with any iterable not only arrays

let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);

// That works, because internally a destructuring assignment works by iterating over the right value.
// It’s a kind of syntax sugar for calling for..of over the value to the right of = and assigning the values.

// Assign to anything to the left-side
// We can use anu "assignables" on the left side.
// For instance, on object property

let user = {};
[user.name, user.surname] = "John Smith".split(' ');

console.log(user.name);
console.log(user.surname);
console.log(user);

// Looping with .entries()
// Object.entries(obj)
// We can use it with destructuring to loop over keys-and-values of an object

let person = {
    name: "Anna",
    age: 30
};

for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// the similar code for a Map is simpler, as it's iterable

let human = new Map();
human.set("name", "John");
human.set("age", "30");

for (let [key, value] of human) {
    console.log(`${key}: ${value}`);
}

// Swap variable trick

let guest = "jane";
let admin = "pete";

// Let's swap the values: make guest=Pete, admin=Jana
[guest, admin] = [admin, guest];

console.log(`${guest}: ${admin}`);

// The rest `...`;
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1);
console.log(name2);
console.log(...rest);

// Default values
// if the array on the right is shorter than the variable on the left there are no errors
// Absent values are considerred undefined

let [firstName, surName] = [];

console.log(firstName); // undefined
console.log(surname); // undefined

// if we want a "default" value to replace the missing one, we can provide it using =

//default values
let [name = "Guest", surnameX = "Anonymous"] = ["Julius"]

console.log(name);
console.log(surnameX);

// Default values can be more complex expressions or even function calls.
// They are evaluated only if the value is not provided

/*
// runs only prompt for surname
    let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

    alert(name);    // Julius (from array)
    alert(surname); // whatever prompt gets
*/

// Object destructuring

// let {var1, var2} = {var1:.., var2:..}

// we should have an existing object on the right side, taht we want to split into variables
// the lefside contains an object-like pattern for corresponding properties
// in the simplest case that's a list of variable names in {...}

let options = {
    titles: "Menu",
    width: 100,
    height: 200
};

// let { titles, width, height } = options;

// console.log(titles);
// console.log(width);
// console.log(height);

// the order does not matter

let choices = {
    titles: "Menues",
    width: 1200,
    height: 2300
};

let { height, width, titles } = choices;
console.log(titles);
console.log(width);
console.log(height);

// The pattern on the left side may be more complex and specify the mapping
// ... between properties and variables
// if we want to assing a property to a variable with another name
// options.with go into the variable w, we can set the variable name using a colon:

let menu = {
    headline: "A la carte",
    width: 125,
    height: 250
};

let { width: w, height: h, headline } = menu;

console.log(headline);
console.log(w);
console.log(h);

// we can extract headline as a variable

