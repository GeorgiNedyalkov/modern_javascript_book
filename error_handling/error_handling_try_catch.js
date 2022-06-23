// Error handling, "try...catch"

// Sometimes our scripts have errors.

// They may occur because of our mistakes, an unexpected user input, an erroneous server response, etc.

// But there's a syntax construct try... catch that allows us to "catch" errors so the script can
// instead of dying, do something more reasonable

// The "try... catch" syntax

// try {
//     // code...
// } catch (err) {
//     // error handling
// }

// It works like this:
// 1. First the code in try {...} is executed
// 2. If there were no errors, then catch (err) is ignored: the execution reaches the end of try and goes on,
// skipping catch
// 3. If an error occurs, then the try execution is stopped, and control flows to the beginning of catch(err)
// The err variable (we can use any name for it) will contain an error object with details about what happened

// So the error inside a try {...} block does not kill the script - we have a change to handle it in catch

// Example

// Errorless example

try {
    console.log('Start of try runs');
    // ... no errors here
    console.log('End of try runs');
} catch (err) {
    console.log('Catch is ignored, because there are no errors');
}

// An example with errors

try {
    console.log('Start of try runs');

    lalalal; // error, variable is not defined!

    console.log('End of try (never reached');
} catch (err) {
    console.log('Error has occured!');
}

// (!) Try...catch only works for runtime errors
// For try...catch to work, the code must be runnable. In other words, it should be a valid JavaScript
// it won't work if the code is syntactically wrong, for instance it has unmatched curly braces
/*
    try {
        {{{{{{{
    } catch (err) {
        conole.log("The engine can't understand this code, it's invalid");
    }
*/
// The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase 
// are called "parse-time" errors and are unrecoverable (from inside the code). That's because the engine
// can't understand the code

// (!) try...catch works synchronously
// If an exception happens in "scheduled" code, like in setTimeout, then try...catch won't catch it:

try {
    setTimeout(function() {
        noSuchVariable; // script will die here
    }, 1000);
} catch (err) {
    console.log("won't work");
}

// That's because the function itself is executed later, when the engine has already left the try...catch construct
// To catch an exception inside a scheduled function, try...catch must be inside that function:

setTimeout(function() {
    try {
        noSuchVariable; // try...catch handles the error!
    } catch {
        console.log("error is caught here!");
    }
}, 1000);


// Error Object
// When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as
// an argument to catch:

// For all built-in errors, the error object has two main properties:
// name - Error name. For instance, for an undefined variable that's "ReferenceError"  
// message - Textual message about error details
// There are other non-standard properties available in most environments. One of the most widely used and supported is:
// stack - Current call stack: a string with information about the sequence of nested calls that led to the error.
// Used for debugging purposes.

try {
    lalala; // error, variable is not defined!
} catch (err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // lalala is not defined
    console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
    
    // can also show an error as a whole. The error is converted to string as "name: message"
    console.log(err);
}

// Optional "catch" binding
// (!) a recent addition to the language.

// If we don't need error details, catch may omit it:

// Using "try...catch"

let json = '{"name":"John", "age": 30}'; // data from the server

let user = JSON.parse(json);

// now user is an object with properties from the string
console.log( user.name );
console.log( user.age ); 

// If json is malformed, JSON.parse generates an error, so the script "dies"
// This way if something is wrong with the data, the visitor will never know that (unless they open the dev console)
// And people won't like something dying without any error message

let badJson = "{ bad json }";

try {
    let user = JSON.parse(badJson);
    console.log(user.name);
} catch (err) {
    // ... the execution jumps here
    console.log("Our appologies, the data has errors, we'll try to request it one more time");
    console.log( err.name );
    console.log( err.message );
}

// Here we use the catch block only to show the message, but we can do much more: send a new network request,
// suggest an alternative to the visitor, send information about the error to a logging facility, ... All much better
// than just dying

// Throwing our own errors
// What if json is syntactically correct, but doesn't have a required name property?

let json2 = '{ "age": 30 }'; // incomplete data

try {
    let user = JSON.parse(jsong);
    console.log(user.name);
} catch (err) {
    console.log("doesn't execute");
}

// Here JSON.parse runs normally, but the absence of name is actually an error for us
// To unify error handling, we'll use the throw operator

// "Throw operator"

// The throw operator generates an error

// The syntax is:
// throw <error object>

// Technically, we can use anything as an error object. That may even be a primitive, like a number
// or a string, but it's better if we use objects, preferably with name and message properties 
// (to stay somewhat compatible with built-in errors)

// JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError 
// and others. We can use them to create error objects as well.
// The Syntax:

// let error = new Error(message);
// // or
// let error = new SyntaxError(message);
// let error = new ReferenceError(message);

// For built-in errors (not for any object, just for errors) the name property is exactly the name of the constructor
// And message is taken from the argument

let error = new Error("Things happen o_O");

console.log(error.name); // Error
console.log(error.message); // Things happen o_O

// Let's see what kind of error JSON.parse generates:
// try {
//     JSON.parse("{ bad json o_O }");
// } catch (err) {
//     console.log(err.name);    // SyntaxError
//     console.log(err.message); // Unexpected token b in JSON at position 2
// } 

// In our case the absence of name is an error, as users must have a name

let json3 = '{ "age": 30 }'; // incomplete data

try {
    let user = JSON.parse(json3);

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name")
    }

    console.log( user.name );
} catch (err) {
    console.log("JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}

// The throw operator generates a SyntaxError with the given message, the same way JS generates it itself.
// The execution of try immediately stops and the control flow jumps into catch

// Rethrowing

// In the example above we use try...catch to handle incorrect data. But is it possible that another unexpected
// error occurs withing the try {...} block? Like a programming error (variable is not defined) or something else
// not just this "incorrect data" thing

// Catch gets all errors from try. 
// To avoud such problems, we can employ the "rethrowing" technique. The rule is simple:

// Catch should only process errors that it knows and "rethrow" all others

// The "rethrowing" technique can be explained in more detail as:
// 1. Catch gets all errors
// 2. In the catch (err) {...} block we analyze the error object err
// 3. If we don't know how to handle it, we do throw err

// Usually, we can check the error type using instanceof operaot

try {
    user = { /*...*/};
} catch (err) {
    if (err instanceof ReferenceError) {
        console.log('ReferenceError'); // "ReferenceError" for accessing an undefined variable
    }
}

// We can also get the error class name from err.name property. All native errors have it.
// Another option is to read err.constructor.name

// In the code below, we use rethrowing so that catch only handles SyntaxError:

let json4 = '{ "age": 30 }'; // incomplete data

try {
    let user = JSON.parse(json4);

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name");
    }

    blabla(); // unexpected error

    console.log( user.name );
} catch (err) {

    if (err instanceof SyntaxError) {
        console.log( "JSON Error: " + err.message );
    } else {
        throw err; // rethrow (*)
    }
}

// The error throwing on line (*) from inside catch block "falls out" of try...catch and can be either caught
// by an outer try...catch construct (if it exists), or it kills the script

// So the catch block actually handles only errors that it knows how to deal with and "skips" all others

// The example below demonstrates how such errors can be caught by one more level of try...catch
/*
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow (don't know how to deal with it)
    }
  }
}

try {
  readData();
} catch (err) {
  alert( "External catch got: " + err ); // caught it!
}
*/ 

// Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything

// try...catch...finally

// The try...catch construct may have one more code clause: finally

// If it exists, it runs in all cases:
// * after try, if there were no errors
// * after catch, if there were no errors

// The extended syntax looks like this:

// try {
//     ... try to execude code ...
// } catch (err) {
//     ... handle errors ...
// } finally {
//     ... execute always ...
// }

try {
    console.log('try'); 
    if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
    console.log('catch');
} finally {
    console.log('finally');
}

// The finally clause is often used when we start doing something and want to finalize it in any 
// case of outcome

/*
    For instance, we want to measure the time that a Fibonacci numbers function fib(n) takes. 
    Naturally, we can start measuring before it runs and finish afterwards. 
    But what if there’s an error during the function call? In particular, the implementation of fib(n) 
    in the code below returns an error for negative or non-integer numbers.

    The finally clause is a great place to finish the measurements no matter what.

    Here finally guarantees that the time will be measured correctly in both situations 
    – in case of a successful execution of fib and in case of an error in it:
*/

let num = +prompt("Enter a positive integer number?", 35);

let diff, result;

function fib(n) {
    if (n < 0 || Math.trunc(n) != n) {
        throw new Error("Must be not negative, and also an integer.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
    result = fib(num);
} catch (err) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

alert(result = 0);

alert(`execution took ${diff}ms`);


// (!) Variables are local inside try...catch...finally
// result and diff variables in the code above are declared before try...catch
// Otherwise, if we declared let in a try block, it would be only visible inside it

// (!) finally and return
// The finally clause works from any exit from try...catch. That includes an explicit return
// In the example below, there's a return in try. In this case, finally is executed just beofre the
// control returns the outer code

function func() {
    try {
        return 1;
    } catch (err) {
        /* ... */
    } finally {
        alert( 'finally' );
    }
}

alert( func() ); // first works alert from finally, and the this one

// (!) try...finally
// The try...finally construct, without catch clause, is also useful. We apply it when we don't want to handle
// errors here (let them fall through), but we want to be sure that processes that we started are finalized

function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}

// Global catch
// (!) Environment-specific

// it is not in the language specification but environments usually provide a way to show something to the user
// in case of an error

// Node.js has process.on("uncaughtException") for that.
// The browser can assign a function to the special window.onerror property.

window.onerror = function(message, url, line, col, error) {
    // ...
};

// message - Error message
// url - URL of the script where error happened
// line, col - line and column numbers where error happened
// error - Error object

// <script>
//     window.onerror = function(message, url, line, col, error) {
//         alert(`${message}\n At ${line}:${col} of ${url}`);
//     };

//     function readData() {
//         badFunc(); // Whoops, something went wrong!
//     }

//     readData()
// </script>

// The role of the global handler window.onerror is usually not to recover the script execution -
// but to send the error message to developers
/*
There are also web-services that provide error-logging for such cases, like https://errorception.com or http://www.muscula.com.

They work like this:

We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
That JS script sets a custom window.onerror function.
When an error occurs, it sends a network request about it to the service.
We can log in to the service web interface and see errors.
*/

// Summary
/*
    The try...catch construct allows to handle runtime errors. 
    It literally allows to “try” running the code and “catch” errors that may occur in it.

    There may be no catch section or no finally, so shorter constructs try...catch and try...finally are also valid.

    Error objects have following properties:

    message – the human-readable error message.
    name – the string with error name (error constructor name).
    stack (non-standard, but well-supported) – the stack at the moment of error creation.
    If an error object is not needed, we can omit it by using catch { instead of catch (err) {.

    We can also generate our own errors using the throw operator. 
    Technically, the argument of throw can be anything, but usually it’s an error object inheriting from the built-in Error class. 
    More on extending errors in the next chapter.

    Rethrowing is a very important pattern of error handling: 
    a catch block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn’t know.

    Even if we don’t have try...catch, most environments allow us to setup a “global” error handler to catch errors that “fall out”. 
    In-browser, that’s window.onerror.
*/
