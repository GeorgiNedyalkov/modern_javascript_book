// Date and Time

// In JavaScript there is a built-in object for handling date and time.
// It stores the date, time and provides methods for date/ time management

// Creation
// To create a new Date object call new Date() with one of the following arguments.
// Without arguments - creates an object for the current date and time;

let now = new Date();
console.log(now);

// new Date(miliseconds)
// Create a Date object with the time equal to number of miliseconds (1/1000 of a seocnd)
// passed after the Jan 1st 1970 UTC+0

let Jan01_1970 = new Date(0);
console.log(Jan01_1970)

// now add 24 hours, get 02.01.1970 UTC+0

let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);

// An integer number representing the number of miliseconds passed since the beginning of 1970
// ... is called a timestamp

// We can always create a date from a timestamp using new Date(timestamp)
// and convert the existing Date object to a timestamp using the date.getTime() method

// Dates before 01.01.1970 have negative timestamps, e.g.;

let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log(Dec31_1969);

// new Date(datesting)
// If there's a single argument, and it's a string, then it is parsed automatically
// The algorithm is the same as Date.parse

let date = new Date("2017-01-26");
console.log(date);

// new Date(year, month, hours, date, minutes, seconds, ms)
// Create the date with the given components in the local time zone. Only the first two arguments are obligatory

/**
 * Create the date with the given components in the local time zone. Only the first two arguments are obligatory
 * The (year) should have 4 digits. For compatibility, 2 digits are also accepted and considerred 19xx, e.g. 98
 * ... is the same as 1998 here, but using 4 digits is strongly encouraged.
 * The (month) count starts with 0 (Jan), up to 11 (dec).
 * The (date) parameter is actually the day of the month, if absent then 1 is assumed.
 * if (hours/ minutes/ seconds/ ms) is absent, they are assumed to be equal to 0
*/

let Jan01_2011 = new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
console.log(Jan01_2011);

let Jan01_2011NoTimeSpecified = new Date(2011, 0, 1) // the same, hours etc are 0 by default
console.log(Jan01_2011NoTimeSpecified);

// The maximal precision is 1 ms (1/1000 sec)

let preciseDate = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log(preciseDate);

// Access date components

// getFullYear - Get the year (4 digits)
// getMonth - get the month, from 0 to 11
// getDate - Get the day of month, from 1 to 31.
// getHours(), getMinutes(), getSeconds(), getMiliseconds() - get the corresponding time components

// !Not getYear(), but getFullYear()

// getDay() - Get the day of week, from 0 (Sunday) to 6 (Saturday).

// All the methods above return the components relative to the local time zone.
// There are also their UTC counterparts.
// getUTCFullYear(), getUTCMonth(), getUTCDay(). Just inser UTC after Get

let currentDate = new Date();
console.log(currentDate);
console.log(currentDate.getHours());
console.log(currentDate.getUTCHours());

// There are two special methods that do not have UTC counterparts
// getTime() - returns the timestamp for the date - a number of miliseconds passed from 01.01.1970 UTC+0
// getTimezoneOffeset() - returns the difference between UTC and the local time zone in minutes:
console.log(new Date().getTimezoneOffset());

// Setting date components
// The following methods allow to set date/time components:
/**
 * setFullYear(year, [month], [date])
 * setMonth(month, [date])
 * setDate(date)
 * setHours(hour, [min], [sec], [ms])
 * setMinutes(min, [sec], [ms])
 * setSeconds(sec, [ms])
 * setMilliseconds(ms)
 * setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
*/

// Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().
// The components that are not specified are no modified.
let today = new Date();

today.setHours(0);
console.log(today);
today.setHours(0, 0, 0, 0);
console.log(today);

// Autocorrection
// This is a very handy deature of Date objects. We can set out-of-range values,
// and it will auto-adjust itself

let whatDate = new Date(2013, 0, 32);
console.log(whatDate);

// Out-of-range date components are distributed automatically.
let newDate = new Date(2016, 1, 28);
newDate.setDate(newDate.getDate() + 2);
console.log(newDate);

let nowDate = new Date();
nowDate.setSeconds(nowDate.getSeconds() + 70);
console.log(nowDate);

// We can also set zero or negative values
// The last day of the previous month is assumed

// Date to number, date diff
// When a Date object is converted to number, it becomes the timestamp date.getTime()

let thisMoment = new Date();
console.log(+thisMoment);

// The important side effect: dates can be subtracted, the result is their difference in ms.

let start = new Date();

for (let i = 0; i < 100000; i++) {
    let doSomehting = i * i * i;
}

let end = new Date();

console.log(`The loop took ${end - start} ms`);

// Date.now()
// If we only want to measure time we don't need the Date object
// There is a special methods Date.now() that returns the current timestamp
// It is semantically equivalent to new Date().getTime(), but it doesn't create new Date object
// So its faster and does not put pressure on garbage collection.

let beggining = Date.now();

// do the job
for (let i = 0; i < 100000; i++) {
    let doThings = i * i * i;
}

let finish = Date.now();

console.log(`The loop took ${end - start} ms`);

// Benchmarking
// If we want a reliable benchmark of CPU-hungry function, we should be careful.

function diffSubtract(date1, date2) {
    return date2 - date1;
}

function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i = 0; i < 100_000; i++) f(date1, date2);
    return Date.now() - start;
}

console.log('Time of diffSubtract: ' + bench(diffSubtract) + 'ms');  // 17ms
console.log('Time of diffGetTime: ' + bench(diffGetTime) + 'ms');    // 3ms

// Get time is way faster
// Because of the fact that there is no type conversion

// For more reliable benchmarks the whole pack of benchmarks should be rerun multiple times

let time1 = 0;
let time2 = 0;

// run bench(diffSubtract) and bench(diffGetTime) each 10 time alternating

for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

console.log('Total time for diffSubtract: ' + time1);
console.log('Total time for diffGetTime: ' + time2);

// Modern JavaScript engines strat applying advanced optimizations only to "hot code"
// ... that executes many times.

// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

console.log('Total time for diffSubtract: ' + time1);
console.log('Total time for diffGetTime: ' + time2);

// Be careful doing microbenching

// Date.parse from a string
// The method Date.parse(str) can read a date from a string.
// The string format shoudl be: YYYY-MM-DDTGG:mm:ss.sssZ, where:
/**
 * YYYY-MM-DD - is the date: year-month-day
 * The character "T" is used as a delimiter
 * HH:mm:ss.sss - is the time: hours, minutes, seconds and milliseconds
 * The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0
*/
// Shorter variants are also possible: YYYY-MM-DD or YYYY-MM or even YYYY

// The call to Date.parse(str) parses the string in the given format and returns
// the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format in invalide it returns NaN

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms);

// we can instantly create a new Date object from the timestamp

let timestampDate = new Date(Date.parse('2012-01-26T13:51:50.417-07:00'));
console.log(timestampDate);

// Summary
/**
 * Date and time in JavaScript are represented with Date object. We can't create "only date" or "only time"
 * ... Date objects carry both.
 * Months are counted from zero(Jan = 0 month)
 * Days of week in getDay(are also counted from zero(Sunday))
 * Date auto-corrects itself when out-of-range components are set.
 * Dates can be subtracted, giving their difference in milliseconds. 
 * ... because Date get converted to a number type and becomes the timestamp
 * Use Date.now() to get the current timestamp fast
*/

let Feb20_2013 = new Date(2012, 01, 20, 03, 12);
console.log(Feb20_2013);

