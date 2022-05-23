// Optional chaining '?.'

// The optional chaining ? is a safe way to access nested object properties,
// even if an intermediate property doesn't exist.

// The "non-existing property" problem

// Optional chaining stops the evaluation if the value before ? is undefined or null and returns unidentified

// value?.prop
// works as value.prop, if value exists,
// otherwise (when value is undefined/ null) it returnes undefined.

// here is a safe way to access user.address.street using ?.

let user = {};

console.log(user?.address?.street); // <-- undefined, not an error
// reading the address works even if user object doesn't exist

// example with querySelector
//let html = document.querySelector('.elem')?.innerHTML;

// The ? syntax makes optional the value before it, but not any further

// Don't overuse the optional chaining
// We should use optional chaining only where it's ok that something doesn't exist
// otherwise it will be harder to debug

// The variable before ? must be declared
// If there is no variable that is declared there is a ReferenceError: user is not defined
// The variable must be declared with a let/ const/ var user or as a function parameter

// Short-circuiting
// ? immediately stops short circuits and the code on its right won't be executed.

// Other variants: ?.(), ?.[]
// The optional chaining is not an operator, but a special syntax construct
// It also works with functions and square brackets

// ?.() is used 

let userAdmin = {
    admin() {
        console.log("I am admin");
    }
};

let userGuest = {};

userAdmin.admin?.();
userGuest.admin?.();

// ?.[] if we'd like to use brackets to access properties instead of .

let key = "firstName";

let user1 = {
    firstName: "Sonya"
};

let user2 = null;

console.log(user1?.[key]);
console.log(user2?.[key]);

// we can also use ? with delete:

delete user?.name;

// We can use ? for safe reading and deleting, but not writing

// Summary
/**
 * The optional chaining ?. syntax has three forms:
 * obj?.prop – returns obj.prop if obj exists, otherwise undefined.
 * obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
 * obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.
 * As we can see, all of them are straightforward and simple to use. 
 * The ?. checks the left part for null/undefined and allows the evaluation to proceed if it’s not so.

A chain of ?. allows to safely access nested properties.

Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic, that the left part doesn’t exist. 
So that it won’t hide programming errors from us, if they occur.
*/