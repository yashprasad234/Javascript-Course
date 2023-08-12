'use strict';

/*
/////////////////////////////
// Default parameters

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', '2', 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
*/

/*
/////////////////////////////
// Passing values in JavaScript: value v/s reference

const flight = 'LH123';
const yash = {
  name: 'Yash Prasad',
  passport: 3123123801,
};

const checkIn = function (flightNum, passenger) {
  (flightNum = 'LH999'), (passenger.name = 'Mr.' + passenger.name);

  if (passenger.passport === 3123123801) alert('Checked in');
  else alert('Wrong passport!');
};

checkIn(flight, yash);
console.log(flight);
console.log(yash);

// Passing primitives and object in a function in JavaScript is the same as if we had not taken an input parameter and initialised these variables like this it would have the same result
// const flightNum = flight;
// const passenger = yash;

const newPassport = function (person) {
  person.passport = Math.floor(Math.random() * 10000000000);
};

newPassport(yash);
checkIn(flight, yash);

*/

/*
/////////////////////////////
// Functions accepting callback functions

const oneWord = function (str) {
  return str.replaceAll(' ', '');
};

const str = 'the quick brown fox jumps over the lazy dog';

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer(str, upperFirstWord);
console.log('                   ');
console.log('                ');
transformer(str, oneWord);

const high5 = function () {
  console.log(`👋`);
};

document.body.addEventListener('click', high5);
['Yash', 'Himanshu', 'Maa'].forEach(high5);
*/

/*
/////////////////////////////
// Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Yash');
greeterHey('Jonas');

greet('Hey')('Yash'); // first one calls the outer function and second one calls the function returned by the outer function
// greet('Yash')('Hey');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Ayush');
*/

/*
/////////////////////////////
// The Call and Apply methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Yash Prasad');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Lionel Messi');
// Since book is now a regular function call its this keyword will point to undefined

// Call Method
book.call(eurowings, 235, 'Yash Prasad');
console.log(eurowings);

book.call(lufthansa, 239, 'Dr. Dre');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Eminem');
console.log(swiss);

// Apply method
const flightData = [532, 'Micheal Jordan'];
book.apply(swiss, flightData);
console.log(swiss);

// Since the spread operator was introduced the apply method is not used that much rather the call method is used withe the spread operator like as shown below:-
book.call(eurowings, ...flightData);
console.log(eurowings);

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(888, 'Jake Peralta');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Yash Prasad');
bookEW23('Ayush Prasad');
console.log(eurowings);

// With EventListeners
lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlanes();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlanes.bind(lufthansa));

// Partial Application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// const addGST = addTax.bind(null, 0.18);
// const addGST = value => value + value * 0.18;

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addGST = addTaxRate(0.18);

console.log(addGST(200));
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  // 1.
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },

  // 3.
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

// 2.
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
*/

/*
////////////////////////////
// Immediately Invoked Function Expression()

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();

*/

/*
///////////////////////
// Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

*/

/*
///////////////////////
// Example 1
let f;

const g = function () {
  const a = 20;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // f still has access to a (which was g's variable environment) even after its execution context was popped from the call stack
console.dir(f);

// Re-assigning f function
h();
f(); // f still has access to b (which was h's variable environment) even after its execution context was popped from the call stac
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // To show that closure has priority over scope chain
boardPassengers(180, 3);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// /*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document
    .querySelector('body')
    .addEventListener('click', () => (header.style.color = 'blue'));
})();
// */
