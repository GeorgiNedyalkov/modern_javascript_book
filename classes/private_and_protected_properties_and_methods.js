// Private and protected properties and methods

// One of the most important principles of object oriented programming - deliminiting internal interface from the
// external one.

// That is "a must" practice in developing anything more complex than a "hello world" app.

// Internal and external interface

// In object-oriented programming, properties and methods are split into two groups:
// * Internal interface - methods and properties, accessible from other methods of the class, 
// but not from outside.
// * External interface - methods and properties, accessible also from outside the class

// In JS, there are two types of object fields (properties and methods)
// Public: accessible from anywhere. They comprise the external interface. 
// Private: accessible only from inside the class. There are for the internal interface

// In many other languages there also exist "protected" fields: accessible from inside the class and those
// extending it (like private, but plus access from inheriting classes). They are more widespread than private
// ones, because we usually want inheriting classes to gain access to them.

// Protected fields are not implemented in JavaScript on the language level, but in practice they are very 
// convenient, so they are emulated. 

// Protecting "waterAmount"

// class CoffeeMachine {
//     waterAmount = 0; 

//     constructor(power) {
//         this.power = power;
//         console.log(`Created a coffee-machine, power: ${power}`);
//     }
// }
// // create the coffee machine
// let coffeeMachine = new CoffeeMachine(100);

// coffeeMachine.waterAmount = 200;

// right now properties waterAmount and power are public. We can easily get/set them from the outside to any value

// Let's change the waterAmount property to protected to have more control over it. We don't want anyone to set it below 0.

// Protected properties are usually prefixed with underscore _

class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) {
            value = 0;
        }
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }
}

let coffeeMachine = new CoffeeMachine(100); 

coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

// wnow the access is under control, so setting the water amount below zero becomes impossible. 

// Read-only "power"

// For the power property, let's make it read-only. It sometimes happens that a property must be set at creation time
// only, and then never modified

// To do this we can only make a getter, not setter. 

// (!) protected data fields are inherited 

// Private "#waterLimit"
// Requires polyfilling

// Private methods and properties
// Privates should start with #. They are only accessible from inside the class. 

class OperaCoffeeMachine {
    #waterLimit = 200;

    #fixWaterAmount(value) {
        if (value < 0) return 0;
        if (value > this.#waterLimit) return this.#waterLimit;
    }

    setWaterAmount(value) {
        this.#waterLimit = this.#fixWaterAmount(value); 
    }
}

let opera = new OperaCoffeeMachine(); 

// can't access privates from outside of the class
// opera.#fixWaterAmount(123);  Error
// opera.#waterLimit = 1000;    Error

// On the language level, # is a special sign that the field is private. We can't access it from outside or
// from inheriting classes

// Private fields do not conflict with public ones. We can have both at the same time

// Summary

/*
In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.

It gives the following benefits:

Protection for users, so that they don???t shoot themselves in the foot
Imagine, there???s a team of developers using a coffee machine. It was made by the ???Best CoffeeMachine??? company, 
and works fine, but a protective cover was removed. So the internal interface is exposed.

All developers are civilized ??? they use the coffee machine as intended. But one of them, John, decided that he???s the 
smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

That???s surely not John???s fault, but rather the person who removed the protective cover and let John do his manipulations.

The same in programming. If a user of a class will change things not intended to be changed from the outside ??? 
the consequences are unpredictable.

Supportable
The situation in programming is more complex than with a real-life coffee machine, because we don???t just buy it once. 
The code constantly undergoes development and improvement.

If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties 
and methods, even without informing the users.

If you???re a developer of such class, it???s great to know that private methods can be safely renamed, their parameters can 
be changed, and even removed, because no external code depends on them.

For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external 
interface is the same.

Hiding complexity
People adore using things that are simple. At least from outside. What???s inside is a different thing.

Programmers are not an exception.

It???s always convenient when implementation details are hidden, and a simple, well-documented external interface is available.

To hide an internal interface we use either protected or private properties:

Protected fields start with _. That???s a well-known convention, not enforced at the language level. 
Programmers should only access a field starting with _ from its class and classes inheriting from it.
Private fields start with #. JavaScript makes sure we can only access those from inside the class.
Right now, private fields are not well-supported among browsers, but can be polyfilled.
*/