// Iterables

// Iterable objects are a generalization of arrays.
// That's a concept that allows us to make any object useable in a for..of loop
// Arrays are iterable but so are strings.

// Symbol.iterator
// Here is a range object that represents an interval of numbers:

let range = {
    from: 1,
    to: 5
};

// We want the for..of to work:
// for (let num of range) ... num=1,2,3,4,5

// to make the range object iterable (and thus let for..of work) wee need to add a method
// to the object named Symbol.iterator (a special built-in symbol just for that)

// for (let number of range) {
//     console.log(number); // range is not iterable
// };

// 1. When for..of starts, it calls that method once (or errors if not found)
// ... The method must return an iterator - an object with the method (next)
// 2. For..of works only with that returned object
// 3. When for..of wants the next value, it calls next() on the object
// 4. The result of next() must have the form: {done: Boolean, value:any}, where done=true
// means that the loop is finished, otherwise value is the next value

let iterableRange = {
    from: 1,
    to: 5
};

// 1. call to for..of initially calls this
iterableRange[Symbol.iterator] = function () {
    // ...it returns the iterator object:
    // 2. For..of works only with the iterator object below,
    // asking it for next values
    return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

// now it works

for (let number of iterableRange) {
    console.log(number);
}

// The core feature of iterables: separation of concerns
// * The range itself does not have the next() method
// * Instead, another object, a so-called "iterator" is created
// by the call to range[Symbol.iterator](), and its next() generates values for the iteration

// The iterator object is separate from the object it iterates over.

// Infinite iterations
// The range becomes infinite for range.to = Infinity
// There are no limitations on "next", it can return more and more values, that's normal

// String is iterable

for (let char of "test") {
    console.log(char);
}

// and it works correctly with surrogate pairs

let str = '𝒳😂';
for (let char of str) {
    console.log(char); // 𝒳, and then 😂
}

// Calling an iterator explicitly

let strng = "Hello";

let iterator = strng[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value);
};

// That is rarely needed, but gives us more control over the process than for..of.
// for instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

// Iterables and array-likes
// Two official terms look similar, but are very different.
// * Iterables are objects that implement Symbol.iterator method.
// * Array-like are objects that have indexes and length, so they look like arrays

// For instance, strings are both iterables (for..of works on them)
// and array-like (they have numeric indexes and length)

// But an iterable may not be array-like. And vice versa an array-like may not be iterable.

// Here is an object that is array like but not iterable

let arrayLike = { // has indexes and length => array-like
    0: 'Hello',
    1: 'World',
    length: 2
};

// Error (no Symbol.iterator)
// for (let item of arrayLike) { };

// Both iterables and array-likes are usually not arrays, they don't have array methods
// That is inconvenient

// Array.from
// The universal method Array.from takes an iterable and array-lik value
// and makes a "real" Array from it.

let arr = Array.from(arrayLike); // (*)
console.log(arr.pop());

// Array.from takes an object, examines it for being an iterable or array-like,
// then makes a new array and copies all items to it

// The same happens for an iterable:

// assuming that range is taken from the example above
let arrT = Array.from(range);
console.log(range);

// The full syntax for Array.from also allows us to provide an optional "mapping" function:

// Array.from(obj[, mapFn, this arg]);

// The optional second argument mapFn can be a function that will be applied to each element
// before adding it to the array, and thisArg allows us to set this for it.

let arrOne = Array.from(range, num => num * num);
console.log(arrOne);

let stringArr = '𝒳😂';

let chars = Array.from(stringArr);

console.log(chars[0]);
console.log(chars[1]);
console.log(chars.length);

// Unlike str.split it relies on the iterable nature of the string
// and so, just like for..of, correctly works with surrogate pairs.

let smileString = '𝒳😂';

let smileChars = []; // Array.from internally does the same loop

for (let char of smileString) {
    smileChars.push(char);
}

console.log(chars);

// We can even build surrogate-aware slice on it:

function slice(str, start, end) {
    return Array.from(str).slice(start, end).join('');
};

let strCh = '𝒳😂𩷶';

console.log(slice(strCh, 1, 3));

console.log(strCh.slice(1, 3));

/* Summary
Objects that can be used in for..of are called iterable.

Technically, iterables must implement the method named Symbol.iterator.
The result of obj[Symbol.iterator]() is called an iterator. It handles further iteration process.
An iterator must have the method named next() that returns an object {done: Boolean, value: any}, here done:
true denotes the end of the iteration process, otherwise the value is the next value.
The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
Built-in iterables like strings or arrays, also implement Symbol.iterator.
String iterator knows about surrogate pairs.
Objects that have indexed properties and length are called array-like. 
Such objects may also have other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification – we’ll see that most built-in methods assume that they work with iterables 
or array-likes instead of “real” arrays, because that’s more abstract.

Array.from(obj[, mapFn, thisArg]) makes a real Array from an iterable or array-like obj, 
and we can then use array methods on it. The optional arguments mapFn and thisArg allow us to apply a function to each item.
*/