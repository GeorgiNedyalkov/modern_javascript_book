// Loops: While and For
// Loops are a way to repeat the same code multiple times

// While loop
let i = 0;

while (i < 3) {
    console.log(i);
    i++;
}

// a single execution of the loops is called an iteraiton.

let n = 3;

while (n) {
    console.log(n);
    n--;
}

// curly braces are not required for a single bodt

let x = 3;
while (x) console.log(x--);

// Do... While loop
console.log("Do While Loops")

//do {
// loop body
//} while (condition);

let a = 0;

do {
    console.log(a);
    a++;
} while (a < 3)

// we use it when we want to execute to body at least once.

// the For Loop

console.log("For Loops")

for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    console.log(i);
}

// skipping parts
// any part of a for loop can be skipped

// breaking the loop
// we can use special break keyword to break the cycle.

/*
let sum = 0;
while (true) {
    let value = +prompt("Enter a number", "");

    if (!value) break;
    sum += value;
}
console.log(('Sum: ') + sum)
*/

// Continuing to the next iteration
// continue keyword does not stop the whole loop.
// it stops the current iteration and forces the loop to start a new one


console.log("even numbers")
let evenNumbers = [];

for (let i = 0; i < 100; i++) {
    if (i % 2 != 0) continue;
    evenNumbers.push(i);
}

console.log(evenNumbers)

// important: break / contrinue do not work to the right side of a ternary ?

// Labels for break/ continue
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        console.log(i, j);

    }
}

// a label is an identifier with a color before a loop:
// the break <labelName> statement in a loop breaks out a label"

outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

        let input = prompt(`Value at coords (${i},${j})`, '');

        // if an empty string or canceled, then break out of both loops
        if (!input) break outer; // (*)

        // do something with the value...
    }
}
alert('done')

// continue can also be used with a label
/*
We covered 3 types of loops:
   - while – The condition is checked before each iteration.

   - do..while – The condition is checked after each iteration.

   - for (;;) – The condition is checked before each iteration, additional settings available.

   To make an “infinite” loop, usually the while(true) construct is used. 
   Such a loop, just like any other, can be stopped with the break directive.

   If we don’t want to do anything in the current iteration and would like to forward to the next one, 
   we can use the continue directive.

   break/continue support labels before the loop. 
   A label is the only way for break/continue to escape a nested loop to go to an outer one.
*/