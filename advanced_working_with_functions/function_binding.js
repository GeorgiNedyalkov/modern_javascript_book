// Function Binding

// When passing object methods as callbacks, for instance to setTimeout, there's a know problem:
// ... "losing this"

// Losing "this"

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}`);
    }
};

setTimeout(user.sayHi, 1000);  // Hello, undefined

// This is because setTimeout got the function user.sayHi, separately from the object.

// How to fix this

// Solution 1: a wrapper

let wrappedUser = {
    firstname: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}`);
    }
};

setTimeout(function () {
    user.sayHi();
}, 1500);

// Now it works, because it receives user from the outer lexical environment, and then calls the method normally
// same but shorter

setTimeout(() => user.sayHi(), 2000);

// There's a sligth vulnerability

let user1 = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(() => user.sayHi(), 1000);

user1 = {
    sayHi() {
        console.log(`Another user in setTimeout`);
    }
}

// Solution 2: Bind
// Functions provide a built-in method bind that allows to fix this

// Syntax:
// let boundFunc= func.bind(context)

// The result of func.bind(context) is a special function-like "exotic object", that is callable as function and
// ... transperantly passes the call to func setting this=context

let person = {
    firstName: "Goshi"
};

function func() {
    console.log(this.firstName);
}

let funcPerson = func.bind(person);
funcPerson();

// Here func.bind(person) as a "bound variant" of func, with fixed this=person
// All arguments are passed to the original func "as is"

function funct(phrase) {
    console.log(phrase + ', ' + this.firstName);
}

let funkctUser = funct.bind(person);

funkctUser("Hello");

// let's try an object method

// let sayHello = user.sayHi.bind.user;

// sayHi();

// setTimeout(sayHi, 1000);

// user = {
//     sayHi() { console.log("Another user in setTimeout") }
// }

// Convenience methods: bindAll
// If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop

for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}

// JavaScript libraries also provide functions for convenient mass binding, e.g. _bindAll(object, methodNames)

// Partial functions

// We can not only bind this, but also arguments. That's rarely done, but sometimes it can be handy

// let bound = func.find(context, [arg1], [arg2], ...);

// It allows to bind context as this and starting arguments of the function

function mul(a, b) {
    return a * b;
}

let double = mul.bind(null, 2);

console.log(double(3));
console.log(double(4));
console.log(double(5));

// The call to mul.bind(null, 2) creates a new function double that passes calls to mul, fixing null as the context
// ... and 2 as the first argument. Further arguments are passed "as is"

// That's called partial function application - we create a new function by fixing some parameters of the existing one.

// We do not use this here but we use null as bind requires it.

// The function triple 

let triple = mul.bind(null, 3);

console.log(triple(3));
console.log(triple(4));
console.log(triple(5));

// Why do we usually make a partial function?

// The benefit is that we can create an independent function with a readable name (double, triple)
// We can use it and not provide the first argument every time as it's fixed with bind

// In other cases, partial application is useful when we have a generic function and want a less universal
// ... variant of it for convenience

// For instance, we have a function send(from, to, text). Then inside a user object we may want to use a partial
// ... variant of it: sendTo(to, text) that send from the current user

// Going partial without context

// Function partial for binding only arguments can be implementet to fix some arguments, but not the context.

function partial(func, ...argsBound) {
    return function (...args) { // (*)
        return func.call(this, ...argsBound, ...args);
    }
}

// Usage:
let userA = {
    firstName: "John",
    say(time, phrase) {
        console.log(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

// add a partial method with fixed time
userA.sayNow = partial(userA.say, new Date().getHours() + ':' + new Date().getMinutes());

userA.sayNow("Hello");
  // Something like:
  // [10:00] John: Hello!

/*
    The result of partial(func[, arg1, arg2...]) call is a wrapper (*) that calls func with:

    Same this as it gets (for user.sayNow call it’s user)
    Then gives it ...argsBound – arguments from the partial call ("10:00")
    Then gives it ...args – arguments given to the wrapper ("Hello")
    So easy to do it with the spread syntax, right?

    Also there’s a ready _.partial implementation from lodash library.
*/

/*
    Summary
    Method func.bind(context, ...args) returns a “bound variant” of function func that fixes the context this 
    and first arguments if given.

    Usually we apply bind to fix this for an object method, so that we can pass it somewhere. For example, to setTimeout.

    When we fix some arguments of an existing function, the resulting (less universal) function is called partially applied or partial.

    Partials are convenient when we don’t want to repeat the same argument over and over again. 
    Like if we have a send(from, to) function, 
    and from should always be the same for our task, we can get a partial and go on with it.
*/