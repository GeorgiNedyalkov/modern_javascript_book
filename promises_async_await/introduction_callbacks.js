// Introduction: callbacks

// Many functions are provided by JavaScript host environments that allow you to schedule asynchronous actions.
// There are actions that we initiate now, but they finish later.

// Real world examples of asynchronous actions are. e.g. loading scripts and modules.

// function loadScript(src) {
//     // creates a <scirpt> tag and appends it to the page
//     // this causes the script with given src to start loading and run when complete
//     let script = document.createElement('script');
//     script.src = src;
//     document.head.append(script);
// }

// // It inserts into the document a new, dynamically created, tag <script src=""> with the given src.
// // The browser automatically starts loading it and executes when complete

// // We can use this function like this:
// console.log("Hello");
// loadScript('./script.js');

// The script starts and it the program doesn't wait for it to finish but starts to execute the code below

// lets add a callback function as a second argument to loadScript that should execute when the script loads:

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    // .onload is an event that allows us to track the loading of external resources - scripts, iframes, pictures, etc.
    script.onload = () => callback(script);
    document.head.append(script);
}

// If we want to call new functions from the script, we should write that in the callback:

// loadScript('/my/script.js', function() {
//     // the callback runs after the script is loaded
//     newFunction(); // so now it works
//     ...
// });

// Here is a runnable example with a real script:

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert(_); // is a function delcared in the loaded script
})

// That's called a "callback-based" style of asynchronous programming.
// A function that does something asynchronously should provide a callback argument where we put
// the function to run after it's complete.

// Callback in callback
/*
    loadScript('/my/script.js', function(script) {
      loadScript('/my/script2.js', function(script) {
        loadScript('/my/script3.js', function(script) {
          // ...continue after all scripts are loaded
        });
      });
    });
*/

// Handling errors

// What if in the above example of multiple callbacks our loading fails? Our callback should be able to react on that.
// Here is an improved version of loadScript that tracks loading errors:

function improvedLoadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

// For successful load I calls callback(null, script)
// In case of errors it calls callback(new Error(`Script load error...`))

// The usage:

loadScript('my/script.js', function(error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
});
// The structure of the load script is called error first callback style.

// The convention is:
// 1. The first argument of the callback is reserved for an error if it occurs. The callback(err) is called
// 2. The second argument (and the next ones if needed) are for the successful result. 
// So the single callback function is used for both reporting errors and passing back results

// Pyramid of doom