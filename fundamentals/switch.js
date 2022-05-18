// the Switch Statement

let x = 2 + 2;

switch (x) {
    case 3:
        console.log('Too small');
        break;
    case 5:
        console.log('Too big');
        break;
    case 4:
        console.log('Exactly');
        break;
    default:
        console.log("I don't know such values");
}

// any expression can be switch/ case expressions

// Grouping of "case"
let b = 3;

switch (b) {
    case 4:
        alert('Right!');
        break;

    case 3: // (*) grouped two cases
    case 5:
        alert('Wrong!');
        alert("Why don't you take a math class?");
        break;

    default:
        alert('The result is strange. Really.');
}

// Type matters
// The equlit check is always strict. 


// Rewrite the "switch" into an "if"



function askBrowserType() {
    let browser = prompt("What is your browser?", "");

    if (browser === "Edge") {
        alert("You've got the Edge!")
    } else if (
        browser == 'Chrome' ||
        browser == 'Firefox' ||
        browser == 'Safari' ||
        browser == 'Opera'
    ) {
        alert('Okay we support these browsers too')
    } else {
        alert('We hope that this page looks ok!')
    }
}


let a = +promt('a?', '');

switch (a) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
}