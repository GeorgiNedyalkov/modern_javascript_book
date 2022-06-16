// Class basic syntax

// class MyClass {
//     // class methods
//     constructor() {...}
//     method1() {...}
//     method2() {...}
//     method3() {...}
// }

//  The constructor method is called automatically by "new" 

class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }
}

let user = new User("Stepano");

user.sayHi();

// (!) No comma between class methods
// A common pitfall for novice developers is to put a comma between class methods,
// which will result in a syntax error.
// The notation here is not to be confused with object literals. Within the class, no comma are required

// What is a class?

// In JS a class is a type of function

console.log(typeof User);

// Function created by a class is labelled by a special interal property [[IsClassConstructor]]: true
// The language checks for that property in a variety of places

console.log(User);

// Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype"
// That is good because if we iterate an object with a for..in loop, we don't want its class methods

// Classes always use strict. All code inside the class construct is automatically in strict mode. 

// Class expression

// Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

let Person = class {
    sayHi() {
        console.log('Hello');
    }
};

// Similar to Named Function Expressions, class expressions may have a name
// If a class expression has a name, it's visible inside the class only

let Human = class MyClass {
    sayHi() {
        console.log(MyClass);
    }
};

new Human().sayHi();

// console.log(MyClass); // Error, MyClass name isn't visible outside of the class

// We can even make classes dynamically "on-demand", like this:

function makeClass(phrase) {
    // declare a class and return it
    return class {
        sayHi() {
            console.log(phrase);
        }
    };
}

let Guy = makeClass("Hi there");

new Guy().sayHi();

// Getters/ Setters

// Just like object literals, classes may include getters/setters, computed properties, etc.

class Sapiens {

    constructor(name) {
        // invokes the setter
        this.name = name;
    }
    
    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short");
            return;
        }
        this._name = value;
    }
}

let person = new Sapiens("Timmy");
console.log(person.name); 

person = new User("");

// Technically, such class declaration works by creating getters and setters in User.prototype

// Computed names [...]

class Mouse {
    ['say' + 'Meow']() { 
        console.log("Meow");
    }
}

new Mouse().sayMeow();

// Class fields
// (!) class fields are a recent addition to the language

// "Class fields" is a syntax that allows to add any properties

class Hero {
    name = "Hercules";

    sayHi() {
        console.log(`Hello, Ursula, I am ${this.name}!`);
    }
}

new Hero().sayHi();

// The important difference of class fields is that they are set on individual objects, not User.prototype:

let hero = new Hero();
console.log(hero.name);
console.log(Hero.prototype.name);

// We can also assign values using more complex expressions and function calls

// class Animal {
//     name = prompt("Name, please?", "Betty");
// }

// let animal = new Animal();
// alert(animal.name);

// Making bound methods with class fields
// Functions in JS have a dynamic this. It depends on the context of the call.

class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        console.log(this.value);
    }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefiend

// The problem is called "losing this" 
// There are two approaches to fixing it
// 1. Pass a wrapper-function, such as setTimeout(() => button.click(), 1000)
// 2. Bind the method object, e.g. in the constructor

// Class fields provide another, quite elegant syntax

class Butn {
    constructor(value) {
        this.value = value;
    }

    click = () => {
        console.log(this.value);
    }
}

let btn = new Butn("'ello");

setTimeout(btn.click, 1000);

// The class field click = () => {...} is create on per-object basis, there is a separate
// function for each Button object, with this inside it referencing that object. We can pass button.click
// around anywhere, and the value of this will always be correct. 

// Summary

function Clock({ template }) {
  
    let timer;
  
    function render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    this.stop = function() {
      clearInterval(timer);
    };
  
    this.start = function() {
      render();
      timer = setInterval(render, 1000);
    };
  
  }
  
//   let clock = new Clock({template: 'h:m:s'});
//   clock.start();


class Clocky {
    constructor( {template} ) {
        this.template = template;
   }
    
    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        let seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        } 

        let output = this.template
            .replace('h', hours)
            .replace('m', minutes)
            .replace('s', seconds)
        
        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock = new Clocky({template: 'h:m:s'});
clock.start();