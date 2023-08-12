'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-26T23:36:17.929Z',
    '2023-07-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-07-28T18:49:59.371Z',
    '2023-07-30T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(Math.floor((date1 - date2) / (1000 * 60 * 60 * 24)));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (val, locale, cur) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: cur,
  }).format(val);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
  // Set timer for 5 minutes
  let time = 10;
  const tick = () => {
    // In each call print remaining time to the interface
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // When 0s stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease time by 1s
    time--;
  };
  tick();
  // Call timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting with API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'short',
// };
// const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Display current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long ',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
///////////////////////////////////////
// Converting and Checking Numbers

console.log(23 === 23.0);

// Base 10 -> 0 - 9. 1/10 = 0.1 10/3 = 3.3333333
// Base 2 -> 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // This should be true but it is false due to JS using the 64 base 2 numbering system

// Conversion
console.log('23');
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('20px', 10));
console.log(Number.parseInt('e20', 10));

console.log(Number.parseInt('   2.5rem 6    '));
console.log(Number.parseInt('   2.5rem    '));
console.log(Number.parseFloat('   2.5rem6    '));

// console.log(parseFloat('   2.5rem    ')); // This works but it is preferred to use the parse method with Number

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(20 / 0)); // false

// Checking if value is a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(20 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false
console.log(Number.isInteger(23 / 4)); // false

*/

/*
////////////////////////////////////////
// Math and Rounding

console.log(Math.sqrt(25));
console.log(25 ** 1 / 2);
console.log(8 ** 1 / 3);

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2)); // Does type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // Doesn't parse

console.log(Math.min(5, 18, '23', 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.floor(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20));

// Rounding Integers
// All these methods do type coercion
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.9));

// Rounding decimals
// toFixed method returns a string
console.log((2.7).toFixed(0));
console.log(+(2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log(+(2.7).toFixed(3));
console.log(+(2.345).toFixed(2));
*/

/*
/////////////////////////////////////////////////
// The Remainder (Modulo = %) operator

console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3);

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((el, i) => {
    if (i % 2 === 0) el.style.backgroundColor = 'orangered';
  });
});

*/

/*
////////////////////////////////
// Numeric separator

// 287,460,000,000
const diameter = 287_460_000_000; // Javascript percieves this as 287460000000
console.log(diameter);

const price = 245_99; // 24599
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
// according to javascript both transferFee1 and transferFee2 are same whereas we can see that transferFee1 is 15$ and transferFee2 is 1500$;
console.log(transferFee1 === transferFee2); // true

// const PI = 3._1415; // Cannot place an underscore after a decimal the underscore can only be placed b/w two numbers, not at the beginning not even at the end, and two in a row also cannot be placed.
const PI = 3.14_15;
console.log(PI);

console.log(+'230000');
console.log(+'230_000'); // This will return NaN so we should only use the numeric separator ("_") when writing in the program for our use only otherwise say if we are transferring our data into an api it will result in errors because the strings cannot be parsed into numbers correctly.
console.log(parseInt('230_000')); // we only get the 230 part

*/

/*
//////////////////////////
// BigInt

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(46849153066824684462468426614684n);
console.log(BigInt(6464646));

// Operations
console.log(1000n + 1000n);
console.log(16164646546532135n * 10000n);

const huge = 641634841613213656313131n;
const num = 23;
// console.log(huge * num); // This gives an error because JS doesn't do type coercion here
console.log(huge * BigInt(num));
console.log(Math.sqrt(huge)); // Does not work

// Exceptions (where we dont need to convert other operands to BigInt if one of the operand is BigInt)
console.log(20n > 15); // here bigint works fine and result will be true
console.log(20n === 20); // here also bigint works fine but result will be false since the operands are different primitive types
console.log(typeof 20n);
console.log(20n == 20); // here also bigint works and result is true because JS does not check for type of data.
console.log(20n == '20');

console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(10n / 3n); // Returns the closest bigint
console.log(10 / 3); // Returns a float value

*/

/*
//////////////////////////////////////////////
// Creating and Working with Dates

// Create a date
const now = new Date();
console.log(now);

console.log(new Date('Jul 31 2023 21:02:16'));
console.log(new Date('December 25, 2014'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142237185000));

console.log(Date.now()); // Gives the passed in milliseconds from start of UNIX time till now

future.setFullYear(2050);
console.log(future);

*/

/*
//////////////////////////////////
// Intl

// Internationalizing Dates (Intl)

const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(+future);

const daysPassed = (date1, date2) =>
  Math.abs(Math.floor((date1 - date2) / (1000 * 60 * 60 * 24)));

console.log(daysPassed(new Date(2037, 3, 4), new Date(2037, 3, 23)));
*/

/*
//////////////////////////////////
// Internationalizing Numbers (Intl)

const num = 3884764.23;

const options = {
  style: 'currency', // this can be either unit or percent or currency but with currency instead of unit we mention currency property
  unit: 'mile-per-hour',
  currency: 'EUR',
  // useGrouping: false, // this is used to turn on or off the numeric separator
};

console.log(`US:      `, new Intl.NumberFormat('en-US', options).format(num));
console.log(`Germany: `, new Intl.NumberFormat('de-DE', options).format(num));
console.log(`Syria:   `, new Intl.NumberFormat('ar-SY', options).format(num));

*/

/*
///////////////////////////
// Timers: SetTimeout and SetInterval

// setTimeout
const ingredients = ['olives', 'paneer'];
const pizzaOrder = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting....');

if (ingredients.includes('spinach')) clearTimeout(pizzaOrder);

// setInterval
setInterval(() => console.log(new Date()), 3000);

*/
// Challenge: Print clock in console
// setInterval(
//   now => {
//     const options = {
//       hour: 'numeric',
//       minute: 'numeric',
//       seconds: 'numeric',
//     };
//     console.log(new Intl.DateTimeFormat('en-GB', options).format(now));
//   },
//   1000,
//   new Date()
// );
