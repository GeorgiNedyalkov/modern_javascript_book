/* 
Property getters and settings 

There are two kind of object properties

The first kind are data properties. 
The second kind are accessor properties. These are functions that execute
on getting and setting a value, but looks like regular properties to an external code
*/

// Getters and Setters
// Accessor properties are repsented by "getter", and "setter" methods. In an object literal
// they are denoted by get and set:

let obj = {
    get propName() {
        // getter, the code executed on getting obj.propName
    },

    set propName(value) {
        // setter, the code executed on setting obj.propName = value
    }
};

// The getter works when obj.propName is read, the setter - when it is assigned
// For instance, we have a user object with name and surname:

// let user = {
// name: "John",
// surname: "Smith" 
// };

// Now we want to add a fullName property, that should be "John Smith". Of course, we don't want to
// copy-paste existing information, so we can implement it as an accessor:

// let user = {
//     name: "John",
//     surname: "Smith",

//     get fullName() {
//         return `${this.name} ${this.surname}`;
//     }
// };

// console.log(user.fullName);

// From the outside, an accessor property looks like a regular one.
// That's the idea of accessor properties. We don't call user.fullName as a function,
// we read it normally: the getter runs behind the scenes
// As of now, fullName has only a getter, if we attempt to assign user.fullName=, there will be an error:

// We can also add a setter for user.fullName


let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

// set fullName is executed with the given value
user.fullName = "Alice Cooper";

console.log(user.name);
console.log(user.surname);

// As a result we have a virtual property fullName that is readable and writable

// Accessor descriptors
// Decriptors for accessor properties are different from those for data properties
// For accessor properties, there is no value or writable, but insted there are get and set functions

// That is, an accessor descriptor may have:
/*
    * get - a function without arguments, that works when a property is read,
    * set - a function with one argument, that is called when the property is set,
    * enumerable - same as for data properties,
    * configurable -same as for data properties
*/
// For instance, to create an accessor fullName with defineProperty, we can pass a description with get and set:

let xuser = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(xuser, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`
    },
    
    set(value) {
        [this.xname, this.surname] = value.split(" "); 
    }
});

console.log(xuser.fullName)

// Please not that a property can be either an accessor (has get/set methods) or a data property
// has (value), not both
// if we try to supply both get and value in tha same descriptor, there will be an error

/*
  // Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
*/
// Smarter getters/ setters 
// Getters/ setters can be used as wrappers over "real" property values to gain more control over operations
// with them

// For instance, if we want to forbid too short names for user, we can have a setter name and keep the value
// in a separate property _name:

let yuser = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};

yuser.name = "Pete";
console.log(yuser.name); // Pete
yuser.name = "";


// Using for compatibility 

// One of the great uses of accessors is that they allow to take control over a "regular" data property
// at any moment by replacing it with a getter and setter and tweat its behavior.

// Imagine we started implementing user objects using data properties name and age:



// Things may change sooner or later. Instead of age we may decide to store birthday
// because its more precise and convenient

function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    Object.defineProperty(this, "age", {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

let john = new User("John", new Date(1992, 6, 1));

console.log( john.birthday )
console.log( john.age )













