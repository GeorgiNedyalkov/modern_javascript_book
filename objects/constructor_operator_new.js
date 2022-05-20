// Constructor, operator "new"

// Constructor function
// Constructors are name with capital letter first
// They should be executed only with "new" operator

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

console.log(user.name);
console.log(user.isAdmin);

// When a function is executed with new, it does the following steps:
// 1. A new empty object is created and assigned to this.
// 2. The function body executes. Usually it modifies this, adds new properties to it.
// 3. The value of this is returned.

// The main purpose of constructors is to implement reusable object creation code.

// Any functions other than arrow functions can be used as constructors.

// We can skip the Constructor mode test: new.target for now.
// Only read through it.