// Conditional branching: If, ?

let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
    alert('Too early...');
} else if (year > 2015) {
    alert('Too late');
} else {
    alert('Exactly!');
}

// Conditional operator ? or ternary

let resultOne = condition ? value1 : value2;
let accessAllowedOne = (age > 18) ? true : false;
let accessAloowed = age > 18;

// A sequence of question mark operators
let age = prompt('Age?', 18);

let message = (age < 3) ? "Hi, baby!" :
    (age < 18) ? 'Hello!' :
        (age < 100) ? 'Greetings!' :
            'What an unusual age!';


// this is not recommended
(company == 'Netscape') ? alert('Right!') : alert('Wrong.');

let officialName = prompt('What is the "official" name of JavaScript', '')

if (officialName == "ECMAScript") {
    alert("Right!");
} else {
    alert("You don't know? ECMAScript")
}


// Show the sign exercise

let value = prompt('Type a number', 0);

if (value > 0) alert(1);
else if (value < 0) alert(-1);
else alert(0);

if (value > 0) {
    alert(1);
} else if (value < 0) {
    alert(-1);
} else {
    alert(0);
}

let promptTernary = prompt('Type a number', 0);

let result = (a + b < 4) ? 'Below' : 'Over';

let messageTwo = (login == 'Employee') ? "Hello" :
    (login == 'Director') ? 'Greetings' :
        (login == '') ? 'No login' :
            '';

