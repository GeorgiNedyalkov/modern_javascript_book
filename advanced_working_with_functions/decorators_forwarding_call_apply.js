// Decorators and forwarding, call/ apply

// JavaScript give exceptional flexibility when dealing with functions
// They can be passed around, used as objects, and now we'll see how to
// ... forward calls between them and decorate them

// Transparent caching

// Let's say we have a function slow(x) which is CPU-keavy, but its results are stable
// For the same x it always returns the same result

// If the function is called often, we may want to cache (remember) the results
// ... to avoid spending extra-time on recalculations.

// Instead of adding that to slow() functionality we'll create a wrapper function, that adds caching
// There are many benefits to do this

function slow(x) {
    // there can be a heavy CPU-intensive job here
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    return function (x) {
        if (cache.has(x)) {        // if there is such a key in cache
            return cache.get(x);   // read the result from it
        }

        let result = func(x);      // otherwise call func

        cache.set(x, result);      // and cache (remember) the result
        return result;
    };
}

slow = cachingDecorator(slow);

console.log(slow(1));               // slow(1) is cached and the result returned
console.log("Again: " + slow(1));   // slow(1) result returned from cashe

console.log(slow(2));               // slow(2) is cached and the result returned
console.log("Again: " + slow(2));   // slow(2) result returned from cache

// In the code above cachingDecorator is a decorator: a special function that takes another function
// ... and alters its behavior

// The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper
// So we can have many functions that use this feature, we just need to apply cachingDecorator to them

// By separating caching from the main function code we also keep the main code simpler

// The result of cachingDecorator(func) is a "wrapper": function(x) that "wraps" the call of func(x)
// ... into caching logic

// From an outside code, the wrapped slow function still does the same
// It just go a caching aspect added to its behavior

// To summarize, there are several benefits of using a separate cachingDecorator instad of
// ... altering the code of slow itself:
/**
 * The cachingDecorator is reusable. We can apply it to another function
 * The caching logic is separate, it did not increase the complexity of slow itself
 * We can combine multiple decorators if needed (other decorators will follow)
*/

// Using "func.call" for the context

// The caching decorator is not well suited to work with object methods
// There is a special function method func.call(context, ...args) that allows to call a function
// ... explicitly setting this

// Function.property.call()
// The call() method calls a function with a given this value and arguments provided individually

// The syntax:
// func.call(context, arg1, arg2, ...)

// it runs func providing the first argument as this, and the next as the argument
// For example these two functions do almost the same:

// func(1, 2, 3);
// func.call(obj, 1, 2, 3);

// The difference is that func.call also sets this to obj

// As another example, in the code below we call sayHi in the context of different objects:
// ... sayHi.call(user) runs sayHi providing this=user, and the next line set this=admin

function sayHi() {
    console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call(user); // John
sayHi.call(admin); // Admin

// And here we use call to call say with the given context and phrase:

function say(phrase) {
    console.log(this.name + ': ' + phrase);
}

say.call(user, "Hello"); // John: Hello

// In our case, we can use call in the wrapper to pass the context to the original function

let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod();
    }
};

function catchingDecoratorMethod(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x); // "this" is passed correctly now
        cache.set(x, result);
        return result;
    };
}

worker.slow = catchingDecoratorMethod(worker.slow);

console.log(worker.slow(2));
console.log(worker.slow(2));

// Let see how this is passed along:
// 1. After the decoration worker.slow is now the wrapper function(x) { ... }
// 2. So when worker.slow(2) is executed, the wrapper get 2 as argument and this=worker
// ... (it's the object before the dot)
// 3. Inside the wrapper, assuming the result is not yet cached, func.call(this.x)
// ... passes the current this (=worker) and the current argument (=2) to the original method

// Going multi-argument

// We can improve the cachingDecorator and make it more universal.
// For now it only worked with single-line argument functions.

// Now how to cache the multi-argument worker.slow method?

/*
    let worker = {
        slow(min, max) {
            return min + max;   (scary CPU-hogger is assumend)
        }
    };

    (should remember same-argument calls)
    worker.slow = cachingDecorator(worker.slow);
*/

// Previously, for a single argument x we could just cache.set(x, result) to save the result and
// cache.get(x) to retrieve it. But now we need to remember the result for a combination of arguments (min, max)
// The native Map takes a single value only as the key 

/*
    There are many solutions possible:
    1. Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys
    2. Use nested maps: cache.set(min) will be a Map that stores the pair (max, result) So we can get result as 
    ... cache.get(min).get(max)
    3. Join two values into one. For example, use a string "min, max" as the map key. For flexibility
    ... we can allow to provide a hashing function for the decorator, that knows how to make one value from many
*/

let newWorker = {
    slow(min, max) {
        console.log(`Called with ${min}, ${max}`);
        return min + max;
    }
};

function newCachingDecorator(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }

        let result = func.call(this, ...arguments);

        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + ',' + args[1];
}

newWorker.slow = newCachingDecorator(worker.slow, hash);

console.log(newWorker.slow(3, 5));
console.log("Again" + newWorker.slow(3, 5));

// func.apply

// Instead of func.call(this, ... arguments) we could use func.apply(this, arguments)

// Syntax:
// func.apply(context, args)

// it runs the func setting this=context and using an array-like object args as the list of arguments
// The only syntax differece is that call expects a lists of arguments, while apply takes an array-like object with them

// So these two calls are almost equivalent

func.call(context, ...args);
func.apply(context, args);

// They perform the same call of func with given context and arguments

// There's only a subtle difference ragarding args:
// * The spread syntax ... allows to pass iterable args as the list to call
// * The apply accepts only array-like args

// For objects that are both iterable and array-like, such as a real array, we can use any of them,
// but apply will probably be faster, because most JavaScript engines internally optimise it better.

// Passing all arguments along with the context to another function is called call forwarding
// the simplest form of it: 

let wrapper = function () {
    return func.apply(this, arguments);
};

// When an external code calls such wrapper, it is indistiguishable from the call of the original function func

// Borrowing a method

function hash() {
    console.log([].join.call(arguments));
}

hash(1, 2);

// The trick is called method borrowing

// We take (borrow) a join method from a regular array ([].join) and use [].join.call to run it in the context
// of arguments

// Why does it work?

// Because of the internal algorith of the native method arr.join(glue)
/*
    1. let glue be the first argument or, if no arguments, then comma ", "
    2. Let result be an empty string
    3. Append this[0] to result
    4. Append glue and this[1]
    5. Append glue and this[2]
    6... Do so until this.length items are glued
    7. Return result
*/

// Decorators and function properties

// It is generally safe to replace a function or a method with a decorated one, except for one thing.
// If the original function had properties on it, like func.calledCount, then the decorated one will
// ... not provide them. Because that is a wrapper. So one needs to be carefull when using them.

// Some decorators may provide their own properties. E.g. a decorator may count how many times
// ... a function was invoked and how much time it took, and expose this information via wrapper properties

// There exists a way to create decorators that keep access to function properties, but this requires
// ... using a special Proxy object to wrpa a funciton.

// Summary
/*
    Decorator is a wrapper around a function that alters its behaviour. The main job is still carried out
    ... by the function.

    Decorators can be seen as "features" or "aspects" that can be added to a function.
    We can add one or add many. All without changing its code.

    To implement cachingDecorator, we studied methods:
    * func.call(context, arg1, arg2) - calls func with given context and arguments
    * func.apply(context, args) - calls func passing context as this and array-like args into a list of arguments

    The generic call forwarding is usually done with apply

    let wrapper = function() {
        return original.apply(this, arguments);
    }

    We also saw an example of method borrowing when we take a method from an object and call it in the context
    of another object. It is quite common to take array methods and apply them to arguments.
    The alternative is to use rest parameters object that is a real array.
*/

// TODO: Tasks