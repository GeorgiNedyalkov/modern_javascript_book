// Global object 

// The global object provides variables and functions that are available anywhere. 
// By default, those that are built into the language or the environment

// In a browser it is named windowd, for Node.js it is global, for other environments 
// ... it may have a different name.

// Recently, (globalThis) was added to the language, as a standardized name for a global object
// ... that should be supported across all environments. It's supported in all major browsers.

// In this lesson we will use (window). But for other environments you can use globalThis. 

// All properties of the global object can be accessed directly.

console.log("Hello");

globalThis.console.log("World");

// In a browser, global functions and variables declared with var (not let/ const)
// become the property of the global object:

// The same effect have function declarations (statements with function keyword in the main
// ... code flow, not function exrpessions).

// This is not reliable. The behavior exists for compatibility reasons.
// Modern scripts use JavaScript modules where such a thing doens't happen.

// If we use let such things would't happen.

// if a value is so important that we would like to make it availablle globally
// ... we can write it directly as a property:

globalThis.currentUser = {
    name: "John"
};

console.log(currentUser.name);
console.log(globalThis.currentUser.name);

// Using global variables is generally discourages. There should be as few as possible.
// The code design where a function get "input" variables and produces certain "outcome"
// ... is clearer, less prone to errors and easier to test that if it uses outer or global variables

// Using for polyfills

// We use the global object to test for support of modern language features.
// For instance, test if a built-in (Promise) object exists (it doesn't in really old browsers)

if (globalThis.Promise) {
    console.log("You IDE is up-to-date");
}

// If there's none, we can create "polyfills": add functions that are not supported by the environment
// ..., but exist in the modern standard.

/*
    if(!window.Promise) {
        window.Promise = ... // custome implementation of the mdoern language feature
    }
*/

// Summary
/**
  * The global object holds variables that shoudl be available everywhere.
   ... this includes JavaScript built-ins, such as Arras and environment-specific values,
   ... such as window.innerHeight - the window height in the browser.
  * The global object has a universal name globalThis.
   ... but more often is referred by "old-school" environment-specific names, such as window (browser)
   ... and global (Node.js)
  * We should store values in the global object only if they're truly global for our project.
   ... and keep their number at minimum
  * In-browser, unless we're using modules, global functions and variables declared with var 
   ... become a property of the global object
  * To make our code future-proof and easier to understand, we should access properties
   ... of the global object directly, as window.x 
*/