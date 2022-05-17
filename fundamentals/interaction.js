// functions to interact with the user: alert, prompt and confirm

// Alert
// Logs a mini-window with the message. Called modal window.
alert("Hello World!");

// Prompt
// accepts two arguments:
// title: the text to show the visitor
// default: an optional second parameter, the initial value for the input field.
let result = prompt(title, [dafault]);

let age = prompt("What is your age?", 30);

// Confirm

result = confirm(question);
// It shows a modal window with a question and two buttons: Ok and Cancel

let letsMoveOn = confirm("Should we continue?");

// Sumary
/*
 - alert
    shows a message.
 - prompt
    shows a message asking the user to input text. It returns the text or, if Cancel button or Esc is clicked, null.
 - confirm
    shows a message and waits for the user to press “OK” or “Cancel”. 
    It returns true for OK and false for Cancel/Esc.

 All these methods are modal: 
 they pause script execution and don’t allow the visitor to interact 
 with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

The exact location of the modal window is determined by the browser. Usually, it’s in the center.
The exact look of the window also depends on the browser. We can’t modify it.
That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, 
but if “bells and whistles” do not matter much, these methods work just fine.
*/