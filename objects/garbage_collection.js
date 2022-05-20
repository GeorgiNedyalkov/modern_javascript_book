// Garbage collection
// Memory management in JavaScript is performed automatically.
// Primitives, objects, functions... all of that takes memory.

// What happens when something isn't needed anymore?

// Reachability
// "Reachable" values are those that are accessible or usable somehow.
// They are guaranteed to be stored in memory.

// 1. There's a base set of iherently reachable values, that cannot be deleted
/*
    For instance:
    - The currently executing function, its local variables and parameters.
    - Other functions on the current chain of nested calls, their local variables and params
    - Global variables
    - (There are some internal ones as well)

    These values are called roots
*/
// 2. Any other value is considerred reachable if it's reachable from a root
// by reference or by a chain of references

// There is a background process in JS engine called Garbage Collector
// it monitors all objects and removes those that have become unreachable

let user = {
    name: "John"
};

user = null // The object {name: "John"} becomes unreachable and is discarded

let admin = user;

user = null; // now the object is there because there is another reference to it.

// Interlinked Objects

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman
    }
}

let family = marry({
    name: "John"
}, {
    name: "Ann"
});

//Function marry “marries” two objects by giving them references to each other
// and returns a new object that contains them both.

// we delete two references to John
delete family.father;
delete family.mother.husband;

// Now there are no incoming references for John.
// The only reference is that he has a wife Ann but there is no way to access John
// We need to delete not one but two links that have an incoming reference to an object
// In order for the garbage collection to discard it.
// Outgoing references do not matter. Only incoming references can make it reachable

// Unreachable Island
// It is possible that the whole island of interlinked objects becomes unreachable
// and it is removed from the memory.

family = null;

// This example demonstrates how important reachability is.

// Internal algorithms
// The basic garbage collection algorithm is called "mark-and-sweep."
/** The following garbage collection steps are regularly performed
    1. The Garbage collector takes roots and "marks" (remembers) them
    2. The it visits and "marks" all references from them.
    3. Then it visits marked objects and marks their references.
    All visited objects are remembered, so as not to visit the same object twice in the future
    4. ... And so on util every reachable (from the roots) references are visited.
    5. All objects except marked ones are removed
 */

// There are some optimisations to make the gc algo run faster:
// Generational collection - old objects are examined less often than new ones.
// Incremental colleciton
// Idle-time collection - trues to run only while the CPU is idle,
// to reduce possible effect on execution.

/*
The main things to know:

Garbage collection is performed automatically. We cannot force or prevent it.
Objects are retained in memory while they are reachable.
Being referenced is not the same as being reachable (from a root): 
a pack of interlinked objects can become unreachable as a whole.
Modern engines implement advanced algorithms of garbage collection.

A general book “The Garbage Collection Handbook: 
The Art of Automatic Memory Management” (R. Jones et al) covers some of them.*/