// Map and Set

// Map is a collection of keyed data items, just like Object.
// But the main difference is map allows for keys of any type

// Methods and properties are:
/**
 * new Map() - creates the map
 * map.set(key, value) - stores the value by the key
 * map.get(key) - returns the value by the key, undefined if key doesn't exist in map
 * map.has(key) - return true if key exists, false otherwise
 * map.delete(key) - removes the value by the key.
 * map.clear() - removes anything from the map
 * map.size - returns the current element count
*/

let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// Map keeps the type. These are different
console.log(map.get(1));
console.log(map.get('1'));
console.log(map.size);

// Unlike objects, keys are not converted to string. Any type of key is possible

// map[key] doesn't work. This is treating map as an object and it has limitations.
// we should use map methods: set, get and so on.

// Map can alsu use objects as keys

let john = { name: "John" };

// for every user let's store their visits count

let visitsCountMap = new Map();

visitsCountMap.set(john, 123);

console.log(visitsCountMap.get(john));

// Using objects as keys is onve of the most notable and important Map features.
// The same does not count for Object. String as a key in object is fine,
// But we can't use Object as a key in Object

// How Map compares keys
// The test for equivalence, Map uses the algorith SameValueZero
// It is roughly the same as string equality ===, but the difference is that NaN
// is considered equal to NaN. So NaN can be used as the key as well.
// This algorithm can't be changed or cusomized

// Chaining
// Every map.set call returns the map itself, so we can chain the calls:
// map.set('1', str1)
//     .set(1, 'num1')
//     .set(true, 'bool1');


// Iteration over Map
// For looping over a map, there are 3 methods:
/**
 * map.keys() - returns an iterable for keys,
 * map.values() - returns an iterable for values
 * map.entries() - returns an iterable for entries [key, value], it's used by default in for..off
*/

let recipeMap = new Map([
    [`cucumber`, 500],
    [`tomatoes`, 350],
    [`onion`, 50]
]);

// iterate over keys (vegetables) 
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable);
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
    console.log(amount);
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as recipeMap.entries()
    console.log(entry);
}

// The insertion order is used
// The iteration goes in the same order as the values were inserted.
// Map preserves this order, unlike regular Object

// Map has a built-in forEach method, similar to Array:
recipeMap.forEach((value, key, map) => {
    console.log(`${key}:${value}`);
})

// Object.entries: Map from Object
// When a map is created, we can pass an array (or another iterable)
// with key/ value pairs for initialization

// array of [key, map] pairs

let mapTwo = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

console.log(mapTwo.get('1'));

// if we have a plain object, and we'd like to create a Map from it, then we can use built-in method
// Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.

// So we can create a map from an object like this:

// array of [key, value] pairs
let obj = {
    name: "John",
    age: 30
};

let mapThree = new Map(Object.entries(obj));

console.log(mapThree.get("name"));

// Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs.

// Object.fromEntries: Object from Map
// The Object.fromEntries method does the reverse: given an array of [key, value] pairs, it creates an object from them

let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);

console.log(prices);
console.log(prices.orange);

// We can use Object.fromEntries to get a plain object from a map

// E.g. we store the data in a Map, but we need to pass it to a 3rd-party code
// that expects a plain object.

let mapFour = new Map();
mapFour.set('banana', 1);
mapFour.set('orange', 2);
mapFour.set('meat', 4);

let objTwo = Object.fromEntries(mapFour.entries()); // make a plain object

console.log(objTwo);

// A call to map.entries() returns an iterable of key/value pairs,
// exactly in the right format for Object.fromEntries

let objFive = Object.fromEntries(mapFour); // we can make the syntax shorter

// That’s the same, because Object.fromEntries expects an iterable object as the argument.
// Not necessarily an array. And the standard iteration for map returns same key/value pairs as map.entries().
// So we get a plain object with same key/values as the map.

// Set

// A Set is a special type collection - "set of values" (without keys), where each value may occur only once.
// Main methods:
/**
 * new Set(iterable) - creates the set, and if an iterable object is provided (usually an array),
 * ... copies values from it into the set
 * set.add(value) - adds a value, returns the set itself
 * set.delete(value) - removes the value, returns true if value existed at the moment of the call,
 * ... otherwise false
 * set.has(value) - returns true if the value exists in the set, otherwise false.
 * set.clear() - removes everything from the set.
 * set.size - is the elements count
*/

// The main feature is that repeated calls of set.add(value) with the same value don't do anything.
// That the rease why each value appears in a Set only once.
// We have visitors caming in, we'd like to remember everyone.
// but repeated visitors should not lead to duplicates. A visitor must be "counted" only once.

let set = new Set();

let gosho = { name: "Gosho" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(gosho);
set.add(pete);
set.add(mary);
set.add(gosho);
set.add(mary);

// set keeps only unique values
console.log(set.size); // 3

for (let user of set) {
    console.log(user);
}

// Set is better than making an array and filtering with arr.find
// It is optimized internally for uniqueness checks.

// Iteration over Set

// We can loop over a set either with for..of or using forEach:

let fruits = new Set(["oranges", "apples", "bananas"]);

console.log('');

for (let value of set) console.log(value);

console.log('');

// the same with forEach:
set.forEach((value, valueAgain, set) => {
    console.log(value);
});

// The callback function passed in forEach has 3 arguments:
// a value, then the same value valueAgain, and then the target object
// indeed, the same value appears in the arguments twice.

// That is for compatability with Map where the callback is passed forEach has three arguments
// It looks strange but it may help to replace Map with Set in certain use cases.

// The same methods Map has for iterators are also supported:
/**
 * set.keys() - returns an iterable object for values,
 * set.values() - same as set.keys(), for compatibility with Map,
 * set.entries() - returns an iterable object for entries [value, value], exists for compatibility with Map
*/

// Summary
/*
    Map - is a collection of keyed values.
    Methods and properties:
        * new Map([iterable]) - creates the map, with optional iterable (e.g. array) of [key, value] pairs for initialization
        * map.set(key, value) - stores the value by the key, undefined if key doesn't exist in map.
        * map.has(key) - returns true if the key exists, false otherwise.
        * map. delete(key) - removes the value by the key, returns true if key existed at the moment of the call, otherwise false
        * map.clear() - removes everything from the map
        * map.size - returns the current element count.

    The difference from a regular object:
        * Any keys, objects can be keys
        * Additional convenient methods, the size property

    Set - a collection of unique values
    Methods and properties:
        * new Set([iterable]) - creates the set, with optional iterable (e.g. array) of values for initialization
        * set.add(value) - adds a value (does nothing if value exists), returns the set itself
        * set.delete(value) - removes the value, returns true if value existed at the moment of the call,
        * ... otherwise false.
        * set.has(value) - returns true if the value exists in the set, otherwise false
        * set.clear() - removes everything from the set
        * set.size - is the elements count

    Iteration over Map and Set is always the insertion order, so we can't say that these collections are unordered,
    but we can't reorder elements or directly get an element by its number.
*/

// Tasks:
// Filter uniques array members
// Create a function unique(arr) that should return an array with unique items of arr.

function unique(arr) {
    let set = new Set(arr);
    return set;
}

function uniqueArr(arr) {
    return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log(unique(values));
console.log(uniqueArr(values));


// Filter anagrams
// Write a function aclean(arr) that returns an array cleaned from anagrams.

function aclean(arr) {

    let map = new Map();

    for (let word of arr) {
        // split the word by letters, sort them and join back

        let sorted = word
            .toLowerCase()
            .split('')
            .sort()
            .join(''); // (*)
        map.set(sorted, word);
    }

    return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(arr));

// Iterable keys
// Get an array of map.keys() in a variable and then apply array-specific methods to it, e.g. push

let mapArr = new Map();

mapArr.set("name", "John");

let keys = map.keys();

let mapArray = Array.from(keys);

console.log(mapArray.push('apples'));

for (let item of mapArray) {
    console.log(item);
}