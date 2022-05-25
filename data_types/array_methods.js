// Array Methods
// Arrays provide a lot of methods. To make things easier
// We are going to split them into groups

// Add/ remove items
// We already know some

/**
 * arr.push(...items) – adds items to the end,
 * arr.pop() – extracts an item from the end,
 * arr.shift() – extracts an item from the beginning,
 * arr.unshift(...items) – adds items to the beginning.
*/

// Here are others

// Splice

// delete obj.key removes a value by the key.
// If we use it in array the values don't shift

// Splice can insert, remove and replace elements (swiss army knife method for arrays)

// arr.splice(start[, deleteCount, elem1, ..., elemN]);
// it modifies the arr by starting from index start,
// removes deleteCount and then inserts elem1, ... elemN.
// Returns the array of removed items

let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1);

arr = ["I", "study", "JavaScript"];

let removedItems = arr.splice(0, 3, "Let's", "Dance");

// Here we can see that splice returns the arary of removed items

console.log(arr);
console.log(removedItems);

// The splice method is also able to insert elements without any removals.
// For that we need to set deleteCount to zero

removedItems.splice(3, 0, "and", "I also study", "solidity");

console.log(removedItems);

// Negative indexes allowed

let numbers = [1, 2, 3, 4, 5];
numbers.splice(-1, 0, 6, 7);

console.log(numbers);

// Slice

// The method slice arr.slice([start], [end])

// It returns a new array copying to it all items from index start to end (not including end)
// Both start and end can be negative, in that case position from array end is assumed.
// It's similar to string method str.slice, but instead of substrings it makes subarrays.

let weekdays = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Sathurday', 'Sunday'];

let workDays = weekdays.slice(0, 5);

console.log(workDays);

let test = ['t', 'e', 's', 't'];

let est = test.slice(1, 4);

console.log(est);

// we can also call this method without arguments it creates a copy of arr.
// Its often used to obtain a copy for further transformations

// Concat

// The method arr.concat creates a new array that includes values from other arrays and additional items
// arr.concat(arg1, arg2...)

// It accepts any number of arguments - either arrays or values
// The result is a new arrays containing items from arr, then arg1, arg2, etc.
// If an argument is argN is an array, then all its elements are copied. Otherwise the argument itself is copied

let oneTwo = [1, 2];

console.log(oneTwo.concat([3, 4]));
console.log(oneTwo.concat([5, 6], [7, 8]));
console.log(oneTwo.concat([7, 8], 9, 10));

// it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole

let countdown = [10, 9, 8];

let likeCountdown = {
    0: "something",
    length: 1
};

console.log(countdown.concat(likeCountdown));

// but if an array-like object has a special Symbol.isConcatSpreadable property,
// then it's treated as an array by concat: its elements are added instead: 

let goal = [1, 2];

let likeGoal = {
    0: 'something',
    1: 'else',
    [Symbol.isConcatSpreadable]: true,
    length: 2,
};

console.log(goal.concat(likeGoal));

// Iterate
// forEach

// arr.forEach method allows to run a function for every element of the array
// arr.forEach(function(item, index, array)) { //... do something with item };

let lotrHeroes = ['Bilbo', 'Gandalf', 'Legolas', 'Aragorn', 'Gimly'];

lotrHeroes.forEach(e => console.log(e));

lotrHeroes.forEach((item, index, array) => {
    console.log(`${item} is at ${index} in ${array}`);
});

// Searching in array

// arr.indexOf, arr.lastIndexOf and arr.includes have the same syntax
// and do essentially the same as their string counterparts, but operate on items
// instead of characters:

/**
 * arr.indexOf(item, from) - look for item starting from index from. and 
 * ... returns the index where it was found, otherwise -1
 * arr.lastIndexOf(item, from) - same, but looks for from right to left.
 * arr.includes(item, from) - looks for item starting from index from,
 * ... returns true if found
 */

let randomArr = [1, 0, false];

console.log(randomArr.indexOf(0));  // item 0 is at the 1st index
console.log(randomArr.indexOf(false)); // item false is at the 2nd index.
console.log(randomArr.indexOf(null)); // -1 (item null is not found) 
console.log(randomArr.includes(true)); // false an item true doesn't exist
console.log(randomArr.includes(false)); // true an item false exists 

// Note that the methods use === comparison. So if we look for false,
// it finds false and not zero

// If we want to see if an item is included without the need for the exact index arr.includes is preferred

// the .includes method correctly handles NaN, unline indexOf/ lastIndexOf:

let notANumber = [NaN];
console.log(notANumber.indexOf(NaN));  // should be zero but equality doesn't work with NaN
console.log(notANumber.includes(NaN));// true (correct)

// find and findIndex

// If we have an array of objects. How can we find an object with a specific condition?
// arr.find(n) comes in handy

/* let result = arr.find(function(item, index, array)) {
    if true is returned, item is returned and iteration is stopped
    for falsy scenario returns undefined  
}
*/

// The function is called for elements of the array, one after another:
/**
 * item is the element
 * index is its index
 * array is the array itself 
 */

let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Pete' },
    { id: 3, name: 'Mary' },
];

let user = users.find(item => item.id == 3);

console.log(user);

// In real life arrays of objects is a common thing, so the find method is very useful
// Typically other arguments of the function like index, array are rarely used

// The arr.findIndex is essentially the same, but it returns the index where the element was found
// instead of the element itself and -1 is returned when nothing is found

// filter

// filter is like find but it returns an array of matching elements

/*
let results = arr.filter(function(item, index, array) {
    if true item is pushed to results and the iteration continues
    returns empty array if nothing found
} )
*/

let players = [
    { id: 4, name: 'G' },
    { id: 5, name: 'S' },
    { id: 6, name: 'A' },
]

let somePlayers = players.filter(item => item.id < 6);

console.log(somePlayers.length);

somePlayers.forEach(player => console.log(player));


// Transform an array

// methods that transform and reorder an array

// map
// arr.map method is one of the most useful and often used.
// it calls the function for each element of the array and returns the arrays of results

// The syntax:
/*
    let result = arr.map(function(item, index, array)) {
        // returns the new value instead of item
    }
*/

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);

console.log(lengths); // we transform each element into its length


// sort(fn)
// the call to arr.sort() sorts the array in place, changing its element order
// it also returns the sorted array, but the returned value is usually ignored,
// as arr itself is modified.

let numArr = [1, 2, 15];

numArr.sort();  // The items are sorted as strings by default

console.log(numArr);

// To use our own sorting order we need to supply a function as the argument

function compare(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
};

numArr.sort(compare);

console.log(numArr);

[1, -2, 15, 2, 0, 8].sort(function (a, b) {
    console.log(a + " <> " + b);
    return a - b;
});

// a comparison function may return any number

let arrN = [123, 5, 2, 6, 534, -2, 0];

arrN.sort((a, b) => b - a);

console.log(arrN);

// Use localeCompare for strings
// for many alphabets, it's better to use str.localeCompare method to correctly sort letter such as Ö

// Reverse
// the method arr.reverse reverses the order of elements in arr

let nums = [1, 2, 3, 4, 5, 6, 7];

nums.reverse();

console.log(nums);

// it also returns the array after the reversal

// Split and join
// arr.split splits a string into an array by the given delimiter delim

let names = 'Bilbo, Gandalf, Nazgul';

let arrNames = names.split(', ');

console.log(arrNames);

for (let name of arrNames) {
    console.log(`A message to ${name}`);
}

// the split method has an optional second numeric argument - a limit on the array length
// If it is provided, then the extra elements are ignored

console.log(names.split(', ', 2));

// Split into letters
// The call to split s with an empty s would split the string into an array of elements
let testStr = 'test';

console.log(testStr.split(''));

// arr.join does the reverse to split. It creates a string of arr items joined by 'glue'

let characters = ['Edd', 'Ed', 'and', 'Eddy'];

let favoriteShow = characters.join(', ');

console.log(`My favorite show is: ${favoriteShow}`);

// reduce/ reduceRight

// When we iterate over an array - we can use forEach, for or for..of
// When we need to iterate and return the data for each element - we can use map.
// The methods arr.reduce and arr.reduceRight also belog to that group, but
// ... they are a little more intricate.
// They are used to calculate a single valuse based on the array.

// The syntax:
/*
    let value = arr.reduce(function(accumulator, item, index, array) {
        // ...
    }, [initial]);
*/

// The function is applied to all elements one after another and "carries on" its result to the next call
// Arguments:
/**
 * accumulator - is the result of the previous function call,
 * ...equals initial the first time (if initial is provided)
 * item - is the current array item.
 * index - is its position
 * array - is the array
*/

// as function is applied, the result of the previous function call
// ...is passed to the next one as the first argument

// The first argument is essentially the acumulator that stores the combined result
// ... of all previous executions.

let anotherNumArray = [1, 2, 3, 4, 5];

let result = anotherNumArray.reduce((sum, current) => sum + current, 0);

console.log(result);

// The function passed to reduce uses only 2 arguments

/**
    1. On the first run, sum is the initial value (the last argument of reduce), equals 0
    and the current is the first array element, equals 1. So the function result is 1.
    2. On the second run, sum = 1, we add the second array element (2) to it and return
    3. On the third run, sum = 3, and we add one more element to it, and so on.
 */

// If there is no first initial value reduce takes the first element of the array
// and starts iteration from the second element
// if an array is empty then a reduce call without initial value gives an error.

// The method reduceRight does exactly the same but from right to left.

// Array.isArray
// Arays do not form a separate language type. They are based on objects.
// so typeof does not help to distinguish a plain object from an array: 

console.log(typeof {});
console.log(typeof []);

// There is a special method for arrays that: ArrayisArray(value) returns true if value
// ...is an array, and false otherwise

console.log(Array.isArray({}));
console.log(Array.isArray([]));

// Most methods support 'thisArg'
// Almost all array methods that call functions - like find, filter, map,
// with a notable excepton of sort, accept an optional addition parameter thisArg

/*
    arr.find(func, thisArg)
    arr.filter(func, thisArg)
    arr.map(func, thisArg)
*/

// This arg is the optional last argument

// The value of thisArg parameter becomes this for func
// For example here we use a method of army object as filter, and thisArg passes the context:

let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
        return user.age >= this.minAge && usersX.age < this.maxAge;
    }
};

let usersX = [
    { age: 16 },
    { age: 20 },
    { age: 23 },
    { age: 30 }
];

// find users, for who army.canJoin returns true

let soldiers = usersX.filter(army.canJoin, army);

console.log(soldiers.length);
console.log(soldiers[0].age);
console.log(soldiers[1].age);

// Summary 

/*
A cheat sheet of array methods:

To add/remove elements:

 * push(...items) – adds items to the end,
 * pop() – extracts an item from the end,
 * shift() – extracts an item from the beginning,
 * unshift(...items) – adds items to the beginning.
 * splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items.
 * slice(start, end) – creates a new array, copies elements from index start till end (not inclusive) into it.
 * concat(...items) – returns a new array: copies all members of the current one and 
    ...adds items to it. If any of items is an array, then its elements are taken.
    
To search among elements:    
 * indexOf/lastIndexOf(item, pos) – look for item starting from position pos, return the index or -1 if not found.
 * includes(value) – returns true if the array has value, otherwise false.
 * find/filter(func) – filter elements through the function, return first/all values that make it return true.
 * findIndex is like find, but returns the index instead of a value.

To iterate over elements:
 * forEach(func) – calls func for every element, does not return anything.

To transform the array:
 * map(func) – creates a new array from results of calling func for every element.
 * sort(func) – sorts the array in-place, then returns it.
 * reverse() – reverses the array in-place, then returns it.
 * split/join – convert a string to array and back.
 * reduce/reduceRight(func, initial) – calculate a single value over the array 
    ...by calling func for each element and passing an intermediate result between the calls.

Additionally:
 * Array.isArray(arr) check arr for being an array

Please note that methods sort, reverse and splice modify the array itself.

These methods are the most used ones, they cover 99% of use cases. But there are few others:

arr.some(fn)/arr.every(fn) check the array.

The function fn is called on each element of the array similar to map. If any/all results are true, returns true, otherwise false.

These methods behave sort of like || and && operators: if fn returns a truthy value, 
arr.some() immediately returns true and stops iterating over the rest of items; if fn returns a falsy value, 
arr.every() immediately returns false and stops iterating over the rest of items as well.

We can use every to compare arrays:

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
arr.fill(value, start, end) – fills the array with repeating value from index start to end.

arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself, 
at position target (overwrites existing).

arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array.

For the full list, see the manual.

From the first sight it may seem that there are so many methods, quite difficult to remember. 
But actually that’s much easier.

Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, 
so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don’t know how – come here,
look at the cheat sheet and find the right method. Examples will help you to write it correctly. 
Soon you’ll automatically remember the methods, without specific efforts from your side.
*/

