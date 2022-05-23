// Symbol type
// only two primitive types serve as object property keys:
// string type, or
// symbol type
// if any other type is used then its converted to a string.

// Symbols
// A symbol represents a unique identifier.
// The value can be created using Symbol()

let id1 = Symbol();

// upon creation we give symbols a description

// id is a symbol with description "id"
let id2 = Symbol("id");

// Symbols are guarenteed to be unique
// The description is just optional it doesn't affect anything

let id3 = Symbol("id");
let id4 = Symbol("id");

console.log(id3 == id4)

// Javascripts symbols are different than those in other languages

// Symbol is a "primitive unique value"

// Symbols don't auto-convert to a string
let id5 = Symbol("id");

console.log(id5);
console.log(id5.toString());
console.log(id5.description);

// "Hidden" properties
// Symbols allow us to create "hidden" properties of an object,
// that no other code can accidentally access or overwrite
// If we're working with user objects, that belong to a third party code.
// We'd like to add identifiers to them.

let user = {
    name: "John"
};

let id = Symbol("id");

user[id] = 1;

console.log(user[id]);

//As user objects belong to another codebase, it’s unsafe to add fields to them,
// since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally.
// The third-party code won’t be aware of newly defined symbols, so it’s safe to add symbols to the user objects.

// Symbols are an object literal {...} and we need for square brackets around it.

let key = Symbol("id");

let userX = {
    name: "Stag",
    [id]: 123
}

// Symbols are skipped by for..in loop
// symbolic properties do not participate in a for..in loop

let id6 = Symbol("id");
let user6 = {
    name: "G",
    age: 30,
    [id]: 132
};

for (let key in user6) {
    console.log(key);
}

// Object.key(user) also ignores them.
// That's part of the general "hiding symbolic properties"

// In contrast, Object.assign copies both string and symbol properties:

let id7 = Symbol("id");
let user7 = {
    [id]: 145
};

let clone = Object.assign({}, user7);

console.log("Direct: " + user7[id]);
// when we want to clone or merge objects, we want all the properties including symbols

// Global symbols
// If we want symbols to be the same. There exists a global symbol registry
// We can create symbols in it and access them later,
// and it guarantees that repeated accesses by the same name return exactly the same symbol.
// In order to read (create if absent) a symbol from the registry, use Symbol.for(key)
// The call checks the global registry, and if there's a symbol described as key, then returns it,
// otherwise creates a new symbol (Symbol.key) and stores it in the registry by the given key.

let id8 = Symbol.for("id");
let idAgain = Symbol.for("id");

console.log(id8 === idAgain);

// Symbols inside the registry are called global symbols. 

// Symbol.keyFor
// We have seen that Symbol.for(key) returns a symbol by name.
// To do the opposite - return a name by global symbol - we can use: (Symbol.keyFor(sym));

// Get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// Get name by symbol
console.log(Symbol.keyFor(sym));
console.log(Symbol.keyFor(sym2));

// Symbol.keyFor uses the global symbol registry to look up the key for the symbol.
// So it dosn't work for non-global symbols. It won't be able to find them and it returns undefined

// All symbols have description property

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)); // name, global symbol
console.log(Symbol.keyFor(localSymbol)); // undefined, not global
console.log(localSymbol.description); // name

// System Symbols
// There exist many “system” symbols that JavaScript uses internally,
// and we can use them to fine-tune various aspects of our objects.
/*
 * Symbol.hasInstance
 * Symbol.isConcatSpreadable
 * Symbol.iterator
 * Symbol.toPrimitive
*/

// Symbol.toPrimitive - allow us to describe object to primitive conversion

/*
Symbol is a primitive type for unique identifiers.

Symbols are created with Symbol() call with an optional description (name).

Symbols are always different values, even if they have the same name. 
If we want same-named symbols to be equal, then we should use the global registry: 
Symbol.for(key) returns (creates if needed) a global symbol with key as the name. 
Multiple calls of Symbol.for with the same key return exactly the same symbol.

Symbols have two main use cases:

“Hidden” object properties.

If we want to add a property into an object that “belongs” to another script or a library, 
we can create a symbol and use it as a property key. 
A symbolic property does not appear in for..in, so it won’t be accidentally processed together with other properties. 
Also it won’t be accessed directly, because another script does not have our symbol. 
So the property will be protected from accidental use or overwrite.

So we can “covertly” hide something into objects that we need, but others should not see, using symbolic properties.

There are many system symbols used by JavaScript which are accessible as Symbol.*. 
We can use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use Symbol.iterator for iterables, 
Symbol.toPrimitive to setup object-to-primitive conversion and so on.

Technically, symbols are not 100% hidden. 
There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. 
Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. 
But most libraries, built-in functions and syntax constructs don’t use these methods.*/