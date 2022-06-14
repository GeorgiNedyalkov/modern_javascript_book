// F.prototype
// Remember, new objects can be created with a constructor function, like new F()
// If F.prototype is an object, then the new operator uses it to set [[Prototype]] for the new object

let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit");  // rabbit.__proto__== animal 

console.log(rabbit.eats);

// Rabbit.prototype = animal states the following:
// "When a new Rabbit is created, assign its [[Prototype]] to animal"

// (!) F.prototype only used at new F time
// F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object
// If, after the creation, F.prototype property changes (F.prototype = <another object>), then 
// new objects created by new F will have another object as [[Prototype]], but already existing 
// objects keep the old one.

// Default F.prototype, constructor property
// Every function has the "prototype" property even if we don't supply it
// The default "prototype" is an object with the only property constructor that points back to the function
// Like this:

/*
    function Rabbit() {
        default prototype
        Rabbit.prototype = {  constructor: Rabbit };
    }

*/

function Bunny() {}

console.log( Bunny.prototype.constructor == Bunny); 

// We can use constructor property to create a new object using the same constructor as the existing one

function Duck(name) {
    this.name = name;
    console.log(name);
}

let duckling = new Duck("Beautiful Duck");

let duckling2 = new Duck("Beautiful Duckling");

// This is handy when we have an object, don't know which constructor was used for it (e.g. comes from the 
// 3rd party library), and we need to create another one of the same kind.

// ...JS itself does not ensure the right "constructor" value.
// If we replace the default prototype as a whole, then there will be no "constructor"

function Mouse() {}
Mouse.prototype = {
    eats: true
};

let mouse = new Mouse();
console.log(mouse.constructor === Mouse);

// To keep the right "constructor" we can choose to add/ remove properties to the default "prototype"
// insted of overwriting it as a whole

/*
    function Rabbit() {}

    Not overwrite Rabbit.prototype totally
    just add to it
    
    Rabbit.prototype.jumps = true
    // the default Rabbit.prototype.constructor is preserved 
 */

// Alternatively, recrease the constructor property manually:
Mouse.prototype = {
    jumps: true,
    constructor: Mouse
};

// now constructor is also correct, because we added it

// Summary
/**
 * The F.prototype property sets [[Prototype]] of new objects when new F() is called.
 * The value of F.prototype should be either an object or null: other values won't work.
 * The "prototype" property only has such a special effect when set on a constructor function, and invoked with new
 */

// Tasks:
