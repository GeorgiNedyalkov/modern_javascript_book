// Arrow  Functions Revisited

// JavaScript if full of situations where we need to write a small function that's executed somewhere else

// arr.forEach(func) - func is executed by forEach for every array item
// setTimeout(func) - func is executed by the built-in scheduler
// ...there are more

// It is in the very spirit of JavaScript to create a function and pass it somewhere
// In such functions we usually don't want to leave the current context.
// That's where arrow functions come in handy

// Arrow functions have no "this"
// If this is accessed, it is taken from the outside

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            student => console.log(this.title + ": " + student)
        );
    }
}

group.showList();

// Here in forEach, the arrow function is used, so this.title in it is exactly the same
// ... as in the outer method showList. That is: group.title
// The same will not work with a regular function like this:
/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();
*/

// The error occurs because forEach runs functions with this=undefined by default
// so the attempt to access undefined.title is made.

// Arrow functions can't run with new
// Now having "this" naturrally means another limitation: arrow functions can't be used as constructors

// TODO: Arrow functions VS Bind

// Arrows have no "arguments"

// Arrow functions have no arguments variable
// That's great for decorators, when we need to forward a call with the current "this" and "arguments"

// For instance defer(f, ms) gets a function and returns a wrapper around it that delays the call by ms
// milliseconds:

function defer(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms);
    };
}

function sayHi(who) {
    console.log(`Hello, ` + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John");

// Here we had to create additional variables args and ctx so that the functions inside setTimeout coult take them

// Summary
/*
    Arrow functions:
    * Do not have this
    * Do not have arguments
    * Can't be called with new
    * They also don't have super, we'll learn about it later in Class inheritance
     
    That's because they are meant for short pieces of code that do not have their own "context",
    but rather work in the current one. 
*/