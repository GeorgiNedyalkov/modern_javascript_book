// Class inheritance

// Class inheritance is a way for one class to extend another class

// The "extends" keyword

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} stands still.`);
    }
}

let animal = new Animal("My animal");


// class Rabbit extends Animal {
//     hide() {
//         console.log(`${this.name} hides!`);
//     }
// }

// let rabbit = new Rabbit("White Rabbit");

// rabbit.run(5);
// rabbit.hide();

// The "extends" keyword works using the prototype mechanics.
// It sets Rabbit.prototype.[[Prototype]] to Animal prototype

//  To find the method rabbit.run, the engine checks:
// 1. The rabbit object (has no run) 
// 2. Its prototype, that is Rabbit.prototype (has hide, but not run)
// 3. Its prototype, that is (due to extends) Animal.prototype, that finally has the run method

// (!) Any expression is allowed after extends

// Overriding a method

// A child class inherits all methods of its parent.
// If we have the same method in our child class it will override the method.

// class Rabbit extends Animal {
//     stop() {
//         // ...now this will be used for rabbit.stop()
//         // insted of stop() from class Animal
//     }
// } 

// Usually we don't want to replace a parent method, but rather to build on top of it to tweak or
// extend its functionality. We do something in our method, but call the parent method before/after 
// it or in the proccess.

// Classes provide "super" keyword for that.
// * super.method(...) to call a parent method.
// super(...) to call a parent constructor (inside our constructor only)

// class Rabbit extends Animal {
//     hide() {
//         console.log(`${this.name} hides!`);
//     }
//     stop() {
//         super.stop(); // call parent shop
//         this.hide(); // and then hide
//     }
// }

// let rabbit = new Rabbit("White Rabbit");

// rabbit.run(5);
// rabbit.stop();

// Now Rabbit has the stop method that calls the parent super.stop() in the process

// (!) Arrow functions have no super
// If accessed, it's take from the outer function.

// Overriding constructor

// According to the specification, if a class extends another class and has no costructor,
// then the following "empty" constructor is generated:

// class Rabbit extends Animal {
//     constructor(...args) {
//         super(...args);
//     }
// }

// It calls the parent constructor passing it all the arguments. 


// class Rabbit extends Animal {
//     constructor(name, earLength) {
//         this.speed = 0;
//         this.name = name;
//         this.earLength = earLength;
//     }

//     hide() {
//         console.log(`${this.name} hides!`);
//     }
//     stop() {
//         super.stop(); // call parent shop
//         this.hide(); // and then hide
//     }
// }

// let rabbit = new Rabbit("White Rabbit");

// rabbit.run(5);
// rabbit.stop();
// // Error: RereferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

//  Constructors in inheriting classes must call super(...), and (!) do it before using this.

// A derived constructor (constructor of inheriting class) has a special internal property
// [[ConstructorKind]]: "derived". That's a special internal label

// The label affects its behavior with new
// * When a regular function is executed with new, it creates an empty object and assigns it to this.
// * But when a derived constructor runs it, it doesn't do this. It expects the parent constructor do this job.

// So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object
// for this won't be created. And we'll get an error

// For the Rabbit constructor to work, it needs to calls super() before using this, like here:


class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name); 
        this.earLength = earLength;
    }

    hide() {
        console.log(`${this.name} hides!`);
    }
    stop() {
        super.stop(); // call parent shop
        this.hide(); // and then hide
    }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5);
rabbit.stop();

// Overriding class fields: a tricky note

// (!) Advanced not

// We can override not only methods, but also class fields

// ... to finish at a later data

/*
Summary
To extend a class: class Child extends Parent:
That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.
When overriding a constructor:
We must call parent constructor as super() in Child constructor before using this.
When overriding another method:
We can use super.method() in a Child method to call Parent method.
Internals:
Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods.
So it’s not safe to copy a method with super from one object to another.
Also:

Arrow functions don’t have their own this or super, so they transparently fit into the surrounding context.
*/