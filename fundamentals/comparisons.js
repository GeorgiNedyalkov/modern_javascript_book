// Comparisons

console.log(4 > 4)
console.log(4 == 4)

// string comparison
console.log('Z' > 'A');
console.log('Bee' == 'Beea');

// comparisons of different types
console.log('2' > 1);
console.log('01' == 1);

// strict equality ===
console.log(0 === false)
console.log(null === undefined)

/*
  Summary
  Comparison operators return a boolean value.
  Strings are compared letter-by-letter in the “dictionary” order.
  When values of different types are compared, 
  they get converted to numbers (with the exclusion of a strict equality check).
  The values null and undefined equal == each other and do not equal any other value.
  Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.

*/