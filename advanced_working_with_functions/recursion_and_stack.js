// Recursion and stack

// Recursion is a programming pattern that is useful in situations when a task can be naturally split
// ... into several tasks of the same kind, but simpler.
// Or when a task can be simplified into an easy action plus a simple variant of the same task
// Or to deal with certain data structures

// When a function solves a task by calling itself. That's called recursion.

// Two ways of thinking

// pow(2, 2) = 4
// pow(2, 3) = 8
// pow(2, 4) = 16

// There are two ways to implement a function which raises x to an given exponent n
// 1. Iterative thinking: the for loop

function pow(x, n) {
    let result = 1;

    // multiply the result by x time in the loop
    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(pow(2, 4));
console.log(pow(2, 8));

function printTwoPowerOf() {
    for (let i = 0; i < 10; i++) {
        console.log(pow(2, i));
    }
}

console.log(printTwoPowerOf());

// 2. Recursive thinking: simplify the task and call self:

function recursivePow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * recursivePow(x, n - 1);
    }
}

console.log(recursivePow(2, 3));

// A recursive solution is usually shorter than an iterative one.
// Here we can write the same function using conditional operator ? insted of if to make it more readable and terse

function shortPow(x, n) {
    return (n == 1) ? x : (x * shortPow(x, n - 1));
}

// The base of the recursion is n == 1 where the execution is trivial
// The maximal number of nested calls (including the first one) is called recursion depth.
// In this case it is exactly n.

// The maximum recursion depth is limited in JavaScript. We can rely on it being 10_000.
// Some engines allow more, but 100_000 is probably out of limit for the majority of them.

// There are limits to the application of the recursion, but it still remains very wide.
// There are many tasks where recursive way of thinking gives simpler code, easier to maintain

// The execution context and stack
// Let's examine how recursive calls work. For that we'll look under the hood of functions.
// The information about the process of execution of a running function is stored in its execution context.

// The execution context is an internal data structure that contains the details about the execution of a function:
// Where the control flow is now, current variables, the value of this and few other internal details.

// One function call has exactly one execution context associated with it.
// When a function makes a nested call, the following happens:
/**
 * The current function is paused.
 * The execution context associated with it is remembered in a special data structure called execution context stack.
 * The nested call executes
 * After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped
*/

// Recursion depth equals the maximal number of context in stack.
// Note the memory requirements. Context take memory. In the case of pow, raising to the power of n
// ... requires the memroy for n contexts, for all lower values of n.
// A loop-based algorithm is more memory-saving
// The iterative pow uses a single context changing i and result in the process. Its memory requirements
// are samm, fixed and do not depend on n.

// Any recursion can be rewritten as a loop. The loop variant usually can be made more effective.

// Recursive Traversals

// A great application of a recursion is a recursive traversal.

let company = {
    sales: [{
        name: 'John',
        salary: 1000
    }, {
        name: 'Alice',
        salary: 1600
    }],

    development: {
        sites: [{
            name: 'Peter',
            salary: 2000
        }, {
            name: 'Alex',
            salary: 1800
        }],

        internals: [{
            name: 'Jack',
            salary: 1300
        }]
    }
};

// In the above example the company is an object with three arrays (departments)
// Each department has an array of staff.
// Or a department may split into two branches: sites and internals
// it is also possible that when a subdepartment grows, it divides into subsubdepartments (or teams)

// Let's say we need a function to sum all of the salaries

// An iterative approach is not easy. There must be many loops and nested loops.

// Here is how we can do it with recursion

// When our function gets a department to sum, there are two possible cases
// 1. Either it's a "simple" department with an arrays of people - the we can sum the salaries in a simple loop.
// 2. It's an object with N subdepartments - then we can make N recursive calls to get the sum of each
// ... of the subdepartments and combine the result

// The 1st case is the base of the recursion, the trivial case, where we get an array.
// The 2nd case when we get an object is the recursive step. A complex task is split into subtasks
// ... for smaller departments. The may in turn split again, but sooner or later the split will finish at (1)

function sumSalaries(department) {
    if (Array.isArray(department)) {
        return department.reduce((prev, current) => prev + current.salary, 0);
    } else {
        let sum = 0;
        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep);
        }
        return sum;
    }
}

// For an object {...} subcalls are made, while arrays [...] are the "leaves" of the recursion tree,
// ... they give the immediate result

// Recursive structures
// A recursive (recursively-defined) date structure is a structure that replicates itself in parts.

// Based on the example above. A company department is:
// * either an array of people
// * Or an object with departments

// In the HTML document, an HTML-tag may contain a list of:
/**
 * Text pieces
 * HTML-components
 * Other HTML-tags (that in turn may containt text pieces/ comments or other tags etc.)
*/

// That's also a recursive definition

// Linked Lists are also a recursive structure

// Linked List

// Imagine we want to store an ordered list of objects. 
// The natural choice would be an array

// let arr = [obj1, obj2, obj3];

// ... but there is a problem with arrays.
// The "delete" element and "insert" element operations are expensive.
// The only structural modifications that do not require mass-renumbering are at the end of the array.
// An array can be quite slow for big queues, when we have to work in the beginning.

// If we really need fast insertion/ deletion, we can choose another data structure called linked lists
// The linked list element is recursively defines as an object with
// * value
// * next - property referencing the next linked list element or null.

// For example:
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

// An alternative code for creation: 

let list2 = { value: 1 };
list2.next = { value: 2 };
list2.next.next = { value: 3 };
list2.next.next.next = { value: 4 };
list2.next.next.next.next = null;

// here we can clearly see that there are multiple objects, each has a value and next
// ... pointing to the neighbor. The list variable is the first object in the chain.
// so following next pointers from it we can reach any element.

// The list can be easily split into multiple parts and later joined back.
let secondList = list.next.next;
list.next.next = null;

// To join:
list.next.next = secondList;

// And surely we can insert or remove items in any place.

// For instance, to prepend a new value, we need to update the head of the list:

let aList = { value: 1 };
aList.next = { value: 2 };
aList.next.next = { value: 3 };
aList.next.next.next = { value: 4 };

// prepend the new value to the list
aList = { value: "new item", next: aList };

// To remove a value from the middle, change next of the previous one:
aList.next = aList.next.next;

// The value of aList next will be removed from memory.
// Unlike arrays we can easily rearrange elements.

// The main drawback is that we can't easily access an element by its number.
// In array that is easy: array[n] is a direct reference.
// But in the list we need to start form the first item and go to the next N times to get the Nth element.

// ... But we don't always need such operations. For example, when we nned a queue or even a deque -
// ... the ordered structure that must allow very fast adding/ removing elements from both ends, but access
// ... to the middle is not needed.

// Lists can be enhanced:
/**
 * We can add property prev in addition to next to reference the previous element, to move back easily.
 * We can also add a variable named tail referencing the last element of the list (and update it when
 * ... adding/ removing elements from the end)
 * ... The data structure may vary according to our needs.
*/

// Summary
// Terms:
/**
 * Recursion is a programming term that means calling a function from itself.
   Recursive functions can be used to solve tasks in elegant ways.
   When a function calls itself, that's called a recursion step. The basis of recursion is funcitonal
   arguments that make the task so simple that the function does not need to make any other calls.

 * A recursively-defined data structure is a data structure that can be defined using itself.
   For instance, the linked list can be defined as a data structure consisting of an object refering a list or null

   Trees like HTML elemts tree or the department tree are also naturally recursive:
   The have branches and every branch can have other branches.

   Recursive functions can be used to walk them.

   Any recursive function can be rewritten as an iterative on. And that's sometimes required to optimize stuff.
   But for many tasks a recursive function is fast enough and easiier to write and support
*/

// Tasks
console.log("Tasks");

// Sum all number till the given one
// Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n

// for instance
/*
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
 */

function sumTo(n) {
    if (n == 1) {
        return n;
    }
    else {
        return n += sumTo(n - 1)
    }
}

function simpleSumTo(n) {
    return (n == 1) ? n : n += simpleSumTo(n - 1);
}

function iterativeSumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

function sumArithmeticProgression(n) {
    // formula: a(n) = a(1) + (n - 1)D

    return n * (n + 1) / 2;
}

console.log(sumArithmeticProgression(100));
// P.S. Naturally the formula is the fastest solution. It only uses 3 operations for any number n
// Math helps!


// Calculate factorial
console.log("Calculate Factorial");

function calcFactorial(n) {
    // n * (n - 1)(n - 2)(n - 3)


    let factorial = 1;

    for (let i = n; i > 0; i--) {
        factorial *= i;
    }

    return factorial;
}

function recursiveFactorial(n) {
    let result = 1;
    let factorial = n;

    if (factorial == 0) {
        return result;
    }
    else {
        return factorial *= recursiveFactorial(--n);
    }
}

function calcFactorialWhile(num) {
    let factorial = 1;

    while (num > 0) {
        factorial = factorial * num;
        num--;
    }

    return factorial;
}

console.log(calcFactorial(1));
console.log(calcFactorial(2));
console.log(calcFactorial(3));
console.log(calcFactorial(4));
console.log(calcFactorial(5));

console.log(recursiveFactorial(1));
console.log(recursiveFactorial(2));
console.log(recursiveFactorial(3));
console.log(recursiveFactorial(4));
console.log(recursiveFactorial(5));

console.log(calcFactorialWhile(1));
console.log(calcFactorialWhile(2));
console.log(calcFactorialWhile(3));
console.log(calcFactorialWhile(4));
console.log(calcFactorialWhile(5));

// Fibonacci numbers

// 0, 1, 1, 2, 3, 5, 8, 13, 21

function fib(n) {

    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
console.log(fib(7));

function fibonacci(n) {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}


let list1 = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printList(list1) {
    let tmp = list1;

    while (tmp) {
        console.log(tmp.value);
        tmp = tmp.next;
    }
}

printList(list1);

function recursivePrintingOfList(list1) {
    console.log(list1.value);

    if (list1.next) {
        printList(list1.next);
    }
}

printList(list1);
