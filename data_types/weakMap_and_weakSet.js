// WeakMap and WeakSet
// Usually, properties of an object or elements of an array or another data structure are
// considered reachable and kept in memory while that data structure is in memory.

// If we use an object as the key in a regular Map, then while the Map exists, that
// objects exists as well. It occupies memory and may not be garbage collected.

let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// John is stored inside the map
// we can get it by using map.keys()

console.log(map.keys());

// WeakMap is fundamentally different in this aspect.
// It doesn't prevent garbage-collection of key objects.

// WeakMap
// The first difference between Map and WeakMap is that keys must be objects, not primitive values

let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object

// If we use an object as the key in it, and there are no other references to that object -
// ... it will be removed from memory (and from the map) automatically

// WeakMap does not support iteration and methods keys(), values(), entries(), so there's no way to get
// all keys or values from it

// WeakMap has only the following methods:
/**
 * weakMap.get(key)
 * weakMap.set(key, value)
 * weakMap.delete(key)
 * weakMap.has(key)
*/

// Use case: additional data
// The main area of application for WeakMap is additional data storage.
/*
If we’re working with an object that “belongs” to another code, maybe even a third-party library,
and would like to store some data associated with it,
that should only exist while the object is alive – then WeakMap is exactly what’s needed.
*/

// We put the data to a WeakMap, using the object as the key, and when the object is garbage collected,
// that data will automatically disappear as well.

weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically

// For example:
// We have a code that keeps a visit count for users. The information is stored in a map:
// a user object is the key and the visit count is the value.
// When a user leaves (its object gets garbage collected), we don't want to store their visit count anymore.

// visitCount.js
let visitCountsMap = new Map(); // map: user => visits count

// Increate the visits count
function countUsers(user) {
    let count = visitCountsMap.get(user) || 0;
    visitCountsMap.set(user, count + 1);
}

// main.js
let johny = { name: "Johny" };

countUsers(john); // count his visits

// later john leaves us
johny = null;

// Now johny object is gone but remains in memory, as it's a key in visitCountMap
// We need to clean visitsCountMap when we remove users, otherwise it will grow in memory indefinitely.
// Such cleaning can become a tedious task in complex architectures.
// We can avoid this by switching to WeakMap instead:

let visitsCountMapWeak = new WeakMap();

function weakCountUser(user) {
    let count = visitsCountMapWeak.get(user) || 0;
    visitCountsMapWeak.set(user, count + 1);
}

// Now we don't have to clean visitsCountMapWeak.

// Use case: caching

// We can store ("cache") results from a function, so that future calls on the same object can reuse it.

// cache.js
let cashe = new WeakMap();

function process(obj) {
    if (!cache.has(obj)) {
        let result = /* Calculate result for */ obj;
        cashe.set(obj, result);
    }

    return cashe.get(obj);
}

// main.js
let objM = {/* some object */ };

let result1 = process(objM);
let result2 = process(objM);

// ... later, when the object is not needed any more:
objM = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon to be 0
// When obj gets garbage collected, cached data will be removed as well

// WeakSet
// WeakSet behaves similarly:
/**
 * It is analogous to Set, but we may only add objects to WeakSet (not primitives)
 * An object exists in the set while it is reachable from somewhere else.
 * Like Set, it supports add, has, and delete, but not size, keys() and no iterations.
*/

// Being "weak", it also serves as additional storage. But not for arbitrary data, rather
// for "yes/no" facts. A membership in WeakSet may mean something about the object

// For instance, we can add users to WeakSet to keep track of those who visited our site:

let visitedSite = new WeakSet();

let stefcho = { name: "Stefcho" };
let martin = { name: "Martin" };
let jivko = { name: "Jivko" };

visitedSite.add(stefcho);
visitedSite.add(martin);
visitedSite.add(stefcho);

console.log(visitedSite.has(stefcho));
console.log(visitedSite.has(mary));

stefcho = null;

/*  Summary
    The most notable limitation of WeakMap and WeakSet is the absence of iterations, 
    and the inability to get all current content. That may appear inconvenient, 
    but does not prevent WeakMap/WeakSet from doing their main job – 
    be an “additional” storage of data for objects which are stored/managed at another place.
*/

// Tasks (to redo later)

let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

let readMessages = new WeakSet();

readMessages.add(messages[0]);
readMessages.add(messages[1]);

readMessages.add(messages[0]);

console.log("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();

// Store Read Data

let newMessages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date object we'll study later