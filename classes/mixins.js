// Mixins

// In JavaScript we can only inherit from a single object. There can be only one [[Prototype]] for an object.
// And a class may extend only one other class. 

// A mixin is a class containing methods that can be used by other classes without the need to inherit from it

// A mixin provides methods that impement a certain behavior, but we do not use it alone, 
// we use it to add the behavior to other classes

// Example:
// here sayHiMixin is used to add some "speech" for User:

// mixin
// let sayHiMixin = {
//     sayHi() {
//         console.log(`Hello ${this.name}`);
//     },
//     sayBye() {
//         console.log(`Bye ${this.name}`);
//     }
// };

// // usage:
// class User {
//     constructor(name) {
//         this.name = name;
//     }
// }

// // copy the method
// Object.assign(User.prototype, sayHiMixin);

// // now User can say hi
// new User("Dude").sayHi(); // Hello dude

// There is no inheritance, but a simple method copying. So User may inherit from another class and also include
// the mixin to "mix-in" the additional methods like this:

// class User extends Person {
//     // ...
// }

// Object.assign(User.prototype, sayHiMixin);

// Mixins can make use of inheritance inside themselves

// For instance, here sayHiMixin inherits from sayMixin:

let sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin,

    sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi();

// EventMixin

// An important feature of many browser objects is that they can generate events. 
// Events are a great way to "broadcast information" to anyone who wants it. 
// Let's make a mixin that allows us to easily add event-related functions to any class/object

// * the mixin will provide a method .trigger(name, [...data]) to "generate an event" when something
// important happens to it. The name argument is a name of the event, optionally folowwed by additional 
// arguments with event data.

// Also the method .on(name, handler) that removes the handler listener 

// After adding the mixin, an object user will be able to generate an event "login" when the visitor logs in.
// And another object, say, calendar may want to listen for such events to load the calendar for the logged-in person

// A menu can generate the event "select" when a menu item is selected, and toher objects may assign 
// handlers to react on that event. And so on.

let eventMixin = {
    /**
     * Subscribe to event, usage:
     * menu.on('select', function(item) { ... })
     */
    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },

    /**
     * Cancel the subscription, usage:
     * menu.off('select', handler)
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    }, 

    /**
     * Generate an event with the given name and data
     * this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
        if (!this._eventHandlers?.[eventName]) {
            return; // no handlers for that event name
        }

        // call the handlers
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};

/**
 * .on(eventName, handler) - assings function handler to run when the event with that name occurs.
    Technically, there's an _eventHandlers property that stores an array of handlers for each event name,
    and it just adds it to the list.
 * .off(eventName, handler) - removes the function from the handlers list
 * .trigger(eventName, ...args) - generates the event: all handlers from _eventHandlers[eventName]
   are called, with a list of arguments ...args
 */

// Usage:

class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on("select", value => console.log(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123"); 

// Summary

/*
    Mixin - is a generic object-oriented programming term: a class that contains methods for other classes
    
    Some other languages allows multiple inheritance. JS does not support multiple inheritance, but mixins
    can be implemented by copying methods into prototype.

    We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling.

    Mixins may become a point of conflict if they accidentally overwrite existing class methods. 
    Generally one should think well about the naming methods of a mixin, to minimize the probability of that happening
*/ 