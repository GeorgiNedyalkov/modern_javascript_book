// Constructor, operator "new"

// Constructor function
// Constructors are name with capital letter first
// They should be executed only with "new" operator

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

console.log(user.name);
console.log(user.isAdmin);

// When a function is executed with new, it does the following steps:
// 1. A new empty object is created and assigned to this.
// 2. The function body executes. Usually it modifies this, adds new properties to it.
// 3. The value of this is returned.

// The main purpose of constructors is to implement reusable object creation code.

// Any functions other than arrow functions can be used as constructors.

// We can skip the Constructor mode test: new.target for now.


// Return from constructors

// if return is called with an object, then the object is returned instead of *this
// if return is called with a primitive, it's ignored
// Return with an object returns that object, in all other cases *this is returned.

function BigUser() {
    this.name = "John";

    return { name: "Godzilla" }; // <--- returns this object
}

console.log(new BigUser().name);

// an examply with an empty return (same with a primitive):

function SmallUser() {
    this.name = "Johny";

    return; // <---- returns this
}

console.log(new SmallUser().name);

// usually constructors don't have a return statement

// we can omit () after new, it it has no arguments;

let bigUser = new BigUser;

// Methods in constructor

function Person(name) {
    this.name = name;

    this.sayHi = function () {
        console.log("My name is: " + this.name);
    }
}

let gunter = new Person("Gunter");
gunter.sayHi();

/*  Summary 
    Constructor functions or, briefly, constructors, are regular functions, 
    but there’s a common agreement to name them with capital letter first.
    Constructor functions should only be called using new. 
    Such a call implies a creation of empty this at the start and returning the populated one at the end.
    We can use constructor functions to make multiple similar objects.

    JavaScript provides constructor functions for many built-in language objects: 
    like Date for dates, Set for sets and others that we plan to study.
*/

function Calculator() {

    this.read = function () {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
    };

    this.sum = function () {
        return this.a + this.b;
    };

    this.mul = function () {
        return this.a * this.b;
    };
}

let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());



function Accumulator(startingValue) {
    this.value = startingValue;

    this.read = function () {
        this.number += +prompt("How much to add?", 0);
    };
}

let accumulator = new Accumulator(1);