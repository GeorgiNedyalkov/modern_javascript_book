// Objects

let user = new Object() // object constructor syntax
let userTwo = {} // object literal syntax

let person = {
    name: "Georgi",
    age: 30
}

person.isAdmin = true;

delete person.isAdmin;

person["Likes birds"] = "Not really";  // multiword properties work with []

console.log(person["Likes birds"]);

// The dot requires the key to be a valid variable identifier.
// That implies: contains no spaces, doesn’t start with a digit
// and doesn’t include special characters ($ and _ are allowed).

/* We can have great flexibility with [] as the client can input what they want to know about user
let newPerson = {
    name: "John",
    age: 30
};

let key = prompt("What do you want to know about the user?", "name");

alert( user[key] );
*/

// Computated properties
// we can use square brackets in an object literal, when creating an object.
// that's called computed properties.

/*
let fruit = prompt('Which fruit to buy?', 'apple');

let bag = {
    [fruit]: 5, // the name of the property is taken from the variable input
};

alert(bag.apple);
*/
// Square brackets are much more powerful than dot notation.
// They allow any property names and variables. But they are also more cumbersome to write.

// Property value shorthand

function makeUser(name, age) {
    return {
        name: name,
        age: age,
    }
}

let userFour = makeUser('Johny', 31);
console.log(userFour.name)
console.log(userFour.age)

function makeUserShorthand(name, age) {
    return {
        name,
        age,
    }
}

let userFive = makeUserShorthand('Sonya', 45);
console.log(userFive.name);
console.log(userFive.age);

// There are no property name restrictions like for, let, return in objects

// Property existence test, "in" operator
// in javascript is possible to access any property.

let animal = {};

console.log(animal.noSuchProperty === undefined);

animal.name = "Scorpion";
animal.type = "Arachnida";

console.log("name" in animal);

// The "for...in loop"

let bird = {
    type: "Owl",
    name: "Hedwig",
    isHarryPotterPet: true,
    color: "white"
}

for (let key in bird) {
    console.log(key + ': ' + bird[key]);
    console.log();
}

// Ordered like an object
// integer properties are sorted, where as others appear in creation order. 

let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    "1": "Bulgaria"
};

for (let code in codes) {
    console.log(code);
}

let cheatCodes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    "+1": "Bulgaria"
};

for (let code in cheatCodes) {
    console.log(code);
}

// Summary
/*
Objects are associative arrays with several special features.

They store properties (key-value pairs), where:

Property keys must be strings or symbols (usually strings).
Values can be of any type.
To access a property, we can use:

The dot notation: obj.property.
Square brackets notation obj["property"]. Square brackets allow taking the key from a variable, like obj[varWithKey].
Additional operators:

To delete a property: delete obj.prop.
To check if a property with the given key exists: "key" in obj.
To iterate over an object: for (let key in obj) loop.
What we’ve studied in this chapter is called a “plain object”, or just Object.

There are many other kinds of objects in JavaScript:

Array to store ordered data collections,
Date to store the information about the date and time,
Error to store the information about an error.
…And so on.
They have their special features that we’ll study later. Sometimes people say something like “Array type” or “Date type”, 
but formally they are not types of their own, but belong to a single “object” data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we’ve just scratched the surface of a topic that is really huge. 
We’ll be closely working with objects and learning more about them in further parts of the tutorial.
*/

let userLast = {};
userLast.name = "John";
userLast.surname = "Smith";
userLast.name = "Pete";
delete userLast.name;

function isEmpty(obj) {
    for (let prop in obj) {
        let result = (prop in obj) ? true : false;
        return result;
    }
}

console.log(isEmpty(userLast));


let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = 0;

for (let key in salaries) {
    sum += salaries[key];
}

console.log(sum);

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

function multiplyNumberic(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}

multiplyNumberic(menu);

for (let key in menu) {
    console.log(menu[key]);
}