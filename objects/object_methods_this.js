// Object methods, "this"

let user = {
    name: "John",
    age: 30
};

user.sayHi = function () {
    console.log("Hello!");
}

user.sayHi();

// a function that is a property of an object is called a method

let viking = {
    tount: function () {
        console.log("Come here basters!!!");
    }
}

// The is a shorthand syntax for functions
// We can omit "function" and just write the method name
viking = {
    screamTount() {
        console.log("Come here basters")
    }
}

// "this" in methods
// a method in an object often need to access information store in the object to do its job.
// To access the object, a method can use "this" keyword.

let sexyLady = {
    name: "Jenny",
    age: 25,

    flirt() {
        console.log(`Hey handsome, I am ${this.name}. Nice to meet you! 😘`) // this is current object
    }
};

sexyLady.flirt();

// "This" is not bound
// The value of this is evaluated during the run-time, depending on the context

// Arrow functions have no "this"
// If we take this in an arrow function then this takes the outer "normal" function

let human = {
    firstName: "Ilya",
    sayHi() {
        let arrow = () => console.log(this.firstName);
        arrow();
    }
};

human.sayHi();

/* Summary
Functions that are stored in object properties are called “methods”.
Methods allow objects to “act” like object.doSomething().
Methods can reference the object as this.
The value of this is defined at run-time.

When a function is declared, it may use this, 
but that this has no value until the function is called.
A function can be copied between objects.
When a function is called in the “method” syntax: object.method(), 
the value of this during the call is object.
Please note that arrow functions are special: they have no this. 
When this is accessed inside an arrow function, it is taken from outside.
*/

// Tasks

// Calculator
let calculator = {
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
    read() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
    }
};
calculator.read();
alert(calculator.sum());
alert(calculator.mul());

// Chaining

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;

    },
    showStep() { // shows the current step
        console.log(this.step);
        return this;
    }
};

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

ladder
    .up()
    .up()
    .down()
    .showStep() // 1
    .down()
    .showStep(); // 0

