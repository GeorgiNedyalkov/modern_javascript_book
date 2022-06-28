// // Promises chaining

// // A method to perform many asynchronous tasks one after another

// new Promise(function(resolve, reject) {

//     setTimeout(() => resolve(1), 1000); // (*)

// }).then(function(result) {

//     console.log(result); // 1
//     return result * 2;

// }).then(function(result) { // (**)

//     console.log(result);
//     return result * 2;  

// }).then(function(result) { // (***)

//     console.log(result)
//     return result * 2;

// });

// // The idea is that result is passed through the chain of .then handlers

// // Here the flow is:
// /*
//     1. The initial promise resolves in 1 second (*)
//     2. Then the .then handler is called (**), which in turn creates a new promise (resolve with 2 value).
//     3. Then the next then (***) gets the result of the previous one, process it (doubles) and passes it to the 
//     next handler.
//     4. ...and so on.
// */
// // As the result is passed along the chain of handlers, we can see a sequence of console.log calls: 1 -> 2 -> 4

// // Every call to a .then returns a new promise, so that we can call the next .then

// // Returning promises
// // A handler, used in .then(handler) may create and return a promise.
// // In that case further handlers wait until it settles, and then gets its result.

// new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(1), 1000);
// }).then(function(result) {

//   alert(result); // 1

//   return new Promise((resolve, reject) => { // (*)
//     setTimeout(() => resolve(result * 2), 1000);
//   });

// }).then(function(result) { // (**)

//   alert(result); // 2

//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(result * 2), 1000);
//   });

// }).then(function(result) {

//   alert(result); // 4

// });

// // Here the first .then shows 1 and returns new Promise(...) in the line (*). After one second it resolves, and
// // the result (the argument of resolve, here it's result * 2) is passed on to the handler of the second .then.
// // That handler is in the line (**), it shows 2 and does the same thing.

// // Returning promises allows us to build chains of asynchronous actions.

// // Example: loadScript

// loadScript("/article/promise-chaining/one.js")
//   .then(function(script) {
//     return loadScript("/article/promise-chaining/two.js");
//   })
//   .then(function(script) {
//     return loadScript("/article/promise-chaining/three.js");
//   })
//   .then(function(script) {
//     // use functions declared in scripts
//     // to show that they indeed loaded
//     one();
//     two();
//     three();
//   });

// // This code can be made shorter with arrow functions

// loadScript("/article/promise-chaining/one.js").then(scrip1 => {
//     loadScript("./article/promise-chaining/two.js").then(scrip2 => {
//         loadScript("./article/promise-chaining/three.js").then(script3 => {
//             // scripts are loaded, we can use functions declared there
//             one();
//             two();
//             three();
//         });
//     });
// });

// // Generally chaining is preferred as the code starts to move to the right. 

// // (!) Thenables? 

// // Bigger example: fetch

// // In frontend programming promises are often used for network requests. So let's see an extended example of
// // that.

// // We'll use fetch method to load the information about the user from the remote server. It has a lot of optional
// // parameters covered in separate chapters, but the basic syntax is quite simple:

// let promise = fetch(url);

// // This makes a network request to the url and returns a promise. The promise resolves with a response object
// // when the remote server response with headers, but before the full response is downloaded.

// // To read the full response, we should call the method response.text(): it returns a promise that resolves
// // then the full text is downloaded from the remote server, with that text as a result.
// // The code below makes a request to user.json and loads its text from the server:

// fetch('article/promise-chaining.user.json')
// // .then below runs when the remote server responds
//   .then(function(response) {
//     // response.text() return a new promise that resolves with the full response text.
//     return response.text();
//   })
//   .then(function(text) {
//     // ... and here's the content of the remote file
//     console.log(text);
//   });

// // The response object returned from fetch also includes the method response.json() that reads the
// // remote data and parses it as JSON. In our case that's even more convenient, so let's switch to it.

// // We'll also use arrow functions for brevity:

// // Same as above, but response.json() parses the remote content as JSON
// fetch('article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => console.log(user.name)); 

// //  Let's do something with the loaded server
//  fetch('article/promise-chaining/user.json')
//   .then(response => response.json())
//    // Make a request to Github
//    .then(user => fetch(`https://api.github.com/users/${user.name}`))
//    // Load the response as json
//    .then(response => response.json())
//    // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
//    .then(githubUser => new Promise(function(resolve, reject) {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => img.remove(), 3000);
//    }))
//    .then(githubUser => console.log("Finished showing ${githubUser.name}"));

// // There is a mistake because we need to do be able to do something as the avatar has finished showing and gets removed
// // To make a chain extendable, we need to return a promise that resolves when the avatar finishes showing:

// // This is, the .then handler that now returns new Promise, that becomes settled only after the call of 
// // resolve(githubUser) in settimeout(). The next .then in the chain will wait for that.
// // Finally we can split the code in reusable functions

function loadJson(url) {
    return fetch(url)
      .then(response => response.json());
}

function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    });
}

// Use them
loadJson('article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => console.log(`Finished showing ${githubUser.name}`));

// Summary
// If a .then (or catch/ finally) handler returns a promise, the rest of the chain waits until it settles.
// When it does, its result (or error) is passed further.