/*
For the whole thing to work anyhow, the result of sum must be function.
That function must keep in memory the current value between calls.
According to the task, the function must become the number when used in ==. 
Functions are objects, so the conversion happens as described in the chapter Object to primitive conversion,
and we can provide our own method that returns the number.
Now the code:
*/

function sum(a) {
    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}

console.log(sum(1)(2)); // 3
console.log(sum(5)(-1)(2)); // 6
console.log(sum(6)(-1)(-2)(-3)); // 0
console.log(sum(0)(1)(2)(3)(4)(5)); // 15