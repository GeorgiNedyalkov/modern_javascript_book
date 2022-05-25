// Arrays

// A special data structure to store ordered collections

// Declaration

let arr = new Array();
let arrTwo = [];

// The second is used most often

let fruits = ["apple", "orange", "strawberies"];

// Arays elements are numbered starting from zero

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

// We can replace and element

fruits[2] = "plums";

console.log(fruits[2]);

// or add a new element to the array

fruits[3] = "strawberies";

// The total count of the elements is using with the property length

console.log(fruits.length);

// we can also show the whole array
console.log(fruits);

// an array can store elements of any type

let arrThree = ['Apple', { name: "John" }, true, function () { console.log(`hello`); }];

console.log(arrThree[1].name);

// an aray just like an object may end with a comma

let vegetables = [
    "Cucumber",
    "Carrot",
    "Shallot",
    "Onion",
];

// Get last elements with "at"
// This is a new addition to the language. Old browsers may need polyfills
// The method for accessing elements counting from the end of an array

// We can explicitly calculate the last element and then access it: 

console.log(vegetables[vegetables.length - 1]);

// It is a bit long because we have to write the name of var twice.
// There is a shorter syntax

console.log(vegetables.at(-1));

// arr.at(i):
// * is exactly the same as arr[i], if i >= 0
// * for negative values of i, it steps back from the end of the array

console.log(vegetables.at(-3));

// Methods pop/ push, shift/ unshift

// A queue is one of the most common uses of an array.
// This means an ordered collections of element which supports two operations
// * push - append an element to the end.
// * shift - get an element from the begining, advancing the cue
// so that the second element becomes the first

// Arays support both operations

// There's another use case for arrays - the data structure named stack
// It supports two operations:
// * push - adds an element to the end.
// * pop - takes an element from the end.
// So new elements are added or taken always from the end.

// For stacks the latest pushed item is received first LIFO (last in, first out)
// For quest the first element is the first to be receiver FIFO (first in, first out)

// Arrays in JavaScript can work both as a queue and as a stack.
// They allow you to add/ remove elements both to/ from the beginning or the end.
// In computer science the data structure that allows this, is called deque.

console.log("Array Methods")

console.log(fruits.pop());

console.log(fruits);

// pop() is the same as fruit.at(-1) but it removes the last elements and returns it

fruits.push("grape");

console.log(fruits);

// shift 
// extracts the first element and returns it

console.log(fruits.shift());

console.log(fruits);

// unshift
// add elements at the beginning of the array

console.log(fruits.unshift("peaches"));

console.log(fruits);

// Methods push and unshift can add multiple elements at once. 

let shoppingBag = ["Lettuce", "Corn", "Red Onions", "Cabbage"];

fruits.push(...shoppingBag);

console.log(fruits);

// Internals

// Arrays in an object data type and thus behaves like it.
// For instance it is copied by reference:

let banana = ["Banana"];

let tree = banana; // copy by reference (two variables reference the same array)

console.log(banana == tree);

tree.push("Cherry");

console.log(banana);
console.log(tree);

// What makes arrays really special is their internal representation. 
// The engine tries to store its elements in the contiguous memory area one after another
// and there are other optimizations that make arrays work really fast
// But they break if we quit working with an array as with an "ordered collection" and 
// start working with it as if it were a regular object

let spices = [];

spices[99999] = 5; // assing a property with the index far greater than its length

spices.count = 25; // create a property with an arbitrary name

console.log(spices.count);
console.log(spices[99999]);

// That's possible because arrays are objects at their base.
// We can add any properties to them.
// But the engine will see that we're working with the array as a regular object.
// Array-specific optimizations are not suited for such cases and will be turend off,
// their benefits disappear.

// The ways to misuse an array:
/**
 * Add a non-numeric property like arr.test = 5
 * Make holes, like: add[0] and then arr[100] (and nothing in between)
 * Fill the array in the reverse order, like arr[1000], arr[999] and so on
*/

// Think of arrays as a special structures to work with ordered data.

// Performance
// Methods push/ pop run fast, while shift / unshift are slow

fruits.shift(); // take 1 element from the start

// It doesn't only remove the element of the array but
// it also starts to change the index and moving all other elements as well
// The shift operator must do three things:
/**
 * Remove the element with the index 0
 * Move all elements to the left, renumber them from the index 1 to 0, from 2 to 1...
 * Update the length property
*/

// The more elements in the array, the more time to move them, more in-memory operations

// Similar things happen to unshift()
// To add an element at the beginning of the array
// The similar thing happens with unshift:
// to add an element to the beginning of the array, we need first to move
// existing elements to the right, increasing their indexes.

// Loops
// The oldest way to cycle array items is the for loop

let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

for (let i = 0; i < weekdays.length; i++) {
    console.log(weekdays[i]);
}

// But for arrays there is another form of loop, for..of:
console.log("Fo...of")


for (let day of weekdays) {
    console.log(day);
}

// The for..of doesn't give access to the number of the current element,
// just its value, but in most cases that's enough

// Technically, because arrays are objects, it is also possible to use for..in
console.log("Fo...in")

for (let day in weekdays) {
    console.log(day);
}

// This gives us all indexes
// But this is a bad idea and there are potential problems with it:
/**
 * The loop for.. in iterates over all properties, not only the numeric ones
 * The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 slower.
*/
// Generally we shouldn't use for..in for arrays

// A word about "length"
// The length property automatically updates when we modify the array.
// It doesn't actually count all the elements in the array,
// but the greatest numeric index plus one.

// For instance a single element with a large index gives a big length:

let monsters = [];

monsters[100] = "Frankenstein";

console.log(monsters.length);

// Another unusual thing is that array is writable
// If we increase it manually, nothing interesting happens
// If we decrease it, the array is truncated.
// The process is irreversable.

let tags = [1, 2, 3, 4, 5];

tags.length = 3;

console.log(tags);

tags.length = 5;

console.log(tags);

// So the simplest way to clear the array is: arr.length = 0;

// new Array()
// There is one more syntax to create an array:

let mushrooms = new Array("Shitake", "Pechurka", "Truffle");

// It's rarely use because its longer. And there is another tricky feature
// If new Array is called with a single argument which is a number,
// then it creates an array without items, but with the given length

let numbs = new Array(2);

console.log(numbs[0]);
console.log(numbs.length);

// to avoid this we generally use [];

// Multidimentional arrays
// arrays that have array items are called multidimentional arrays.
// For example to store matrices:

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[1][1]);
console.log(matrix[2][2]);
console.log(matrix[0][0]);
console.log(matrix[1][1]);
console.log();

for (let i = 0; i < matrix.length; i++) {

    for (let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}

// toString
// Arrays have their own implementation of toString method
// It returns a comma-separated list of elemets

let ids = [1, 2, 3];

console.log(ids);
console.log(String(ids) === '1,2,3');

console.log([] + 1);
console.log([1] + 1);
console.log([1, 2] + 1);

// Arrays do not have Symbol.toPrimitive, neither a variable valueOf,
// They implement only toString

// When the binary plus + operator adds something to a string,
// it converts it to a string as well

// Don't compare arrays with ==
// The operator has no special treatment for arrays, it works with them as with any objects.

// These are the rules for comparing objects.
/**
 * Two objects are equal == only if they're references to the same object
 * If one of the arguments of == is an object, and the other is primitive,
 * then the object gets converted to primitive
 * ... with an exception of null and undefined that equal == each other and nothing else
*/

// The strict comparison is even simpler, as it doesn't convert types.

// So if we compare arrays with == they are never the same,
// unless we compare two variables that reference exactly the same array

console.log([] == []);
console.log([1] == [1]);

// Comparison with primitives may give seemingly strange results

console.log(0 == []);
console.log("0" == []);

// To compare different arrays we have to do it item-by-item

// Summary
// Array is a special kind of object, suited to storing and managing ordered data items.

/*
The call to new Array(number) creates an array with the given length, but without elements.

The length property is the array length or, to be precise, its last numeric index plus one. 
It is auto-adjusted by array methods.
If we shorten length manually, the array is truncated.
Getting the elements:

we can get element by its index, like arr[0]
also we can use at(i) method to get negative-index elements, for negative values of i, 
it steps back from the end of the array. In the rest it works same as arr[i], if i >= 0.
We can use an array as a deque with the following operations:

 * push(...items) adds items to the end.
 * pop() removes the element from the end and returns it.
 * shift() removes the element from the beginning and returns it.
 * unshift(...items) adds items to the beginning.
To loop over the elements of the array:

 * for (let i=0; i<arr.length; i++) – works fastest, old-browser-compatible.
 * for (let item of arr) – the modern syntax for items only,
 * for (let i in arr) – never use.
To compare arrays, don’t use the == operator (as well as >, < and others), 
as they have no special treatment for arrays. They handle them as any objects, and it’s not what we usually want.

Instead you can use for..of loop to compare arrays item-by-item.*/

// Tasks:
// Task 1: 5 array operations
let styles = ["Jazz", "Blues"];

styles.push("Rock-n-Roll");

let middleIndex = Math.floor((styles.length - 1) / 2);

styles[middleIndex] = "Classics";

console.log(styles.shift());

styles.unshift("Rap", "Reggae");

console.log(styles);

// Task 3: Sum input numbers

// function sumInput() {
//     let numbers = [];

//     while (true) {

//         let value = prompt("A number please?", 0);  // we do not convert to num here are we will get infinite loop

//         // check if we should cancel
//         if (value === "" || value === null || !isFinite(value)) break;

//         numbers.push(+value); // we convert the type to number and then push to array
//     }

//     let sum = 0;
//     for (let number of numbers) {
//         sum += number;
//     }

//     return sum;
// }

// alert(sumInput());

// A maximal subarray

function getMaxSubSumSlow(numbers) {

    let maxSum = 0;

    for (let i = 0; i < numbers.length; i++) {
        let sumFixedStart = 0;

        for (let j = i; j < numbers.length; j++) {
            sumFixedStart += numbers[j];
            maxSum = Math.max(maxSum, sumFixedStart);
        }
    }
    return maxSum;
}

console.log(getMaxSubSumSlow([-1, 2, 3, -9]));
console.log(getMaxSubSumSlow([2, -1, 2, 3, -9]));
console.log(getMaxSubSumSlow([-2, -1, 1, 2]));
console.log(getMaxSubSumSlow([100, -9, 2, -3, 5]));
console.log(getMaxSubSumSlow([1, 2, 3]));


function getMaxSubSumFast(numbers) {
    let maxSum = 0;
    let partialSum = 0;

    for (let number of numbers) {
        partialSum += number;
        maxSum = Math.max(maxSum, partialSum);

        if (partialSum < 0) partialSum = 0;
    }

    return maxSum;
}


console.log(getMaxSubSumFast([-1, 2, 3, -9]));
console.log(getMaxSubSumFast([2, -1, 2, 3, -9]));
console.log(getMaxSubSumFast([-2, -1, 1, 2]));
console.log(getMaxSubSumFast([100, -9, 2, -3, 5]));
console.log(getMaxSubSumFast([1, 2, 3]));