// Basic Operators, maths

// Terms: "unary", "binary", "operand"
// operand - is what the operators are applied to. In 2 * 3 both 2 and 3 are operands a.k.a arguments.
// operator is unary if it has a single operand. -5 where - is a unary operator.
let z = 5;
z = -5;
console.log(z);
// operator is binary if it has two operands. 
let x = 1, y = 3;
console.log(y - x);

// Maths: addition +, subtraciton -, multiplication *, division /, remainder %, exponenton **
console.log(5 % 2);
console.log(5 ** 2);
console.log(5 ** 4);
console.log(5 ** 5);
console.log(25 ** (1 / 2)); // square root
console.log(27 ** (1 / 3)); // cubic root

// String concatenation with binary +
// If the binary + is used for strings it combines them together. 
let myName = "Georgi" + " " + "Nedyalkov";
console.log(myName);

let sexPosition = "6" + 9;
console.log(sexPosition)
let notSexPosition = 5 + 7 + "9";
console.log(notSexPosition);
// other binary operators execute the mathematical expression
let stringMaths = '6' - 3;
console.log(stringMaths);

// Numeric conversion, unary +
let bi = "2"
console.log(bi + " easy");
console.log(typeof +bi);
console.log(+false);
console.log(+true);

// Operators have a precedence. unary pluses are applied first, they convert strings to numbers and then binary sums them up.

// Operator Precedence
// Every operator has a precedence number. Higher numbers get executed first.
/*
Precedence	Name	Sign
…	…	…
15	unary plus	+
15	unary negation	-
14	exponentiation	**
13	multiplication	*
13	division	/
12	addition	+
12	subtraction	-
…	…	…
2	assignment	=
…	…	…*/

// Assignment
// When we assigna variable that has to calculate its value, the calculations are done first and assignment is done last.
let a = 1;
let b = 2;

let c = 3 - (a = b + 1);
console.log(a);
console.log(c);

//Chaining assignments
let j, k, m;

j = k = m = 2 + 2;
console.log(j);
console.log(k);
console.log(m);

//Modify and asing operators
let modify = 2;
modify += 14;
console.log(modify)

modify *= 2 + 3;
console.log(modify)

// Increment/ Decremet
modify++;
modify--;
--modify;
++modify;
// if the result of increment/decrement is not used, there is no difference.
// if we'd like to increase a value and immediately use the result we need the prefix form ++variable
// if we like to increment a value but use its previous value we need postfix form variable++
// Increment/decrement operators can be used inside expressions as well.
// Their precedence is higher than most other arithmetical operations.


// Bitwise operators
// Treat arguments as 32-bit integer numbers and work on the level of their binary representation.
/* LIST of Bitwies operators:
 - AND (&)
 - OR (|)
 - XOR (^)
 - NOT (~)
 - LEFT SHIFT (<<)
 - RIGHT SHIFT (>>>)
*/
// These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level.
// We won’t need these operators any time soon, as web development has little use of them,
// but in some special areas, such as cryptography, they are useful.

// Comma
// one of the rarest and most unusual operators.
// The comma operator allows us to evaluate several expressions, dividing them with a comma ,.
// Each of them is evaluated but only the result of the last one is returned.

let q = (1 + 2, 3 + 4);
console.log(q);

for (a = 1, b = 3, c = a * b; a < 10; a++) {

}
