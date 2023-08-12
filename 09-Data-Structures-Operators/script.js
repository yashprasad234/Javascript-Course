'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterInd, mainInd) {
    return [this.starterMenu[starterInd], this.mainMenu[mainInd]];
  },

  orderDelivery({ time = '20:00', address, starterInd = 1, mainInd = 0 }) {
    console.log(
      `Order received! ${this.starterMenu[starterInd]} and ${this.mainMenu[mainInd]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    let str = `You have ordered a pizza with ${mainIngredient}`;
    for (let i = 0; i < otherIngredients.length; i++) {
      if (i == otherIngredients.length - 1) {
        str = str.concat(` and ${otherIngredients[i]}`);
      } else {
        str = str.concat(`, ${otherIngredients[i]}`);
      }
    }
    str = str.concat(`, it will be ready in 10 minutes`);
    console.log(str);
  },
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightsDisplay = function (flights) {
  const flightArr = flights.split('+');
  for (let i = 0; i < flightArr.length; i++) {
    const [status, from, to, time] = flightArr[i].split(';');
    const displayString = `${
      status.startsWith('_Delayed') ? '🔴' : ''
    }${status.replaceAll('_', ' ')} from ${from
      .slice(0, 3)
      .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time})`;
    console.log(displayString.padStart(45, ' '));
  }
};

flightsDisplay(flights);

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
// Challenge #4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const varNames = document.querySelector('textarea').value.split('\n');
  for (let i = 0; i < varNames.length; i++) {
    const [first, second] = varNames[i].toLowerCase().trim().split('_');
    const camelCaseVar = ` ${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(camelCaseVar.padEnd(20, ' ').padEnd(20 + i + 1, '✅'));
  }
});
*/
// const underToCamel = function (word) {
//   const [first, second] = word.toLowerCase().trim().split('_');
//   return `${first}${second.replace(second[0], second[0].toUpperCase())}`;
// };

/*
///////////////////////////////////////
// Working with Strings part - 3

console.log('a+very+nice+string'.split('+'));
console.log('Yash Prasad'.split(' '));
const [fName, lName] = 'Yash Prasad'.split(' ');

const newName = [
  'Mr.',
  fName[0].toUpperCase() + fName.slice(1).toLowerCase(),
  lName.toUpperCase(),
].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const nameArr = name.toLowerCase().split(' ');
  for (let i = 0; i < nameArr.length; i++) {
    nameArr[i] = nameArr[i].replace(
      nameArr[i].slice(0, 1),
      nameArr[i].slice(0, 1).toUpperCase()
    );
  }
  const capitalizedName = nameArr.join(' ');
  console.log(capitalizedName);
};

const passenger = 'jessica ann smith davis';
capitalizeName(passenger);

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(22, '+'));
console.log('Yash'.padStart(17, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const numberString = number + '';
  return numberString.slice(-4).padStart(numberString.length, '*');
};

console.log(maskCreditCard(1234567891234567));

// Repeat

const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};

planesInLine(3);
planesInLine(5);
planesInLine(12);
*/

/*
///////////////////////////////////////
// Working with Strings part - 2
const airline = 'Air India';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name

const passenger = 'YaSh';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@yash.io';
const loginEmail = '   Hello@YasH.Io \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceGB, priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));

// Booleans

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));
console.log(plane.startsWith('Aib'));

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of the NEW Airbus family');

// Practice exercise

const checkBaggage = function (items) {
  const itemsLower = items.toLowerCase();
  if (itemsLower.includes('knife') || itemsLower.includes('gun'))
    console.log('You are NOT allowed on board');
  else console.log('Welcome aboard 😁');
};
checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a Gun for protection');
*/

/*
///////////////////////////////////////
// Working with Strings part - 1
const airline = 'Air India';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('i'));
console.log(airline.lastIndexOf('i'));
console.log(airline.indexOf('India'));
console.log(airline.indexOf('india'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  const ch = seat.slice(-1);
  if (ch === 'B' || ch === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/*
// Challenge #3
// 1,
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4.
let half = 'FIRST HALF';
for (const [min, event] of gameEvents) {
  half = min < 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF]: ${min}: ${event}`);
}

/*
///////////////////////////////////////
// Maps

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time >= rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arr = [1, 2];
// rest.set([1,2], 'Test');
// console.log(rest.get([1,2])); // This will not work as the array used to get the value is not the same (in the heap) as the one used to set the value.
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object into map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iteration in maps
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log([...question]);
// console.log(question.keys()); // This gives a weird Iterator
console.log([...question.keys()]);
// console.log(question.values()); // This gives a weird Iterator
console.log([...question.values()]);
*/

/*
///////////////////////////////////////
// Sets

const orderSet = new Set(['Pizza', 'Pasta', 'Risotto', 'Pizza', 'Pasta']);
console.log(orderSet);

console.log(new Set('Yash'));

console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
// orderSet.clear();
console.log(orderSet);

for (const order of orderSet) console.log(order);

// Example
const staff = ['Water', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
console.log(staffUnique);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
      Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
      
      BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*
// Challenge #2
// 1.
for (const [goalNo, scorer] of game.scored.entries()) {
  console.log(`Goal ${goalNo + 1}: ${scorer}`);
}

// 2.
let avgOdds = 0;
for (const odd of Object.values(game.odds)) {
  avgOdds += odd;
}
avgOdds /= 3;
console.log(`The avg odds of the game are: ${avgOdds}`);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

// Bonus
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
*/
/*
// Looping over objects
///////////////////////////////////////
// Property Names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days, `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property Values
const values = Object.values(openingHours);
console.log(values);

// Entries
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open} and close at ${close}`);
}
*/

/*
///////////////////////////////////////
// Optional Chaining

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// With Optional Chaining

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open); // same as the if statement above

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(1, 0) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(1, 0) ?? 'Method does not exist');
// restaurant.order?.(1, 0) ?? console.log('Method does not exist');

// Arrays
// const users = [{ name: 'Yash', email: 'hello@yash.ai' }];
const users = [];
console.log(users[0]?.name ?? 'Users array empty!');
*/

/*
///////////////////////////////////////
// FOR-OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [ind, item] of menu.entries()) {
  console.log(`${ind + 1}: ${item}`);
}
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
// Challenge #1
// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5.
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...goalScorers) {
  for (let i = 0; i < goalScorers.length; i++) {
    console.log(goalScorers[i]);
  }
  console.log(goalScorers.length);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 < team2 || console.log('Team 2 is more likely to win');
*/

/*
//////////////////////////////////
// LOGICAL ASSIGNMENT OPERATORS
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/*
//////////////////////////////////
// Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
*/

/*
//////////////////////////////////
// Short Circuiting

console.log('-------- OR --------');
console.log(3 || 'Yash');
console.log('' || 'Yash');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || null || 0 || '' || 'Hello' || 23 || false);

// Practical example
// restaurant.numGuests = 23;
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('-------- AND --------');
console.log(0 && 'Yash');
console.log(7 && 'Yash');

console.log(7 && 'Yash' && null && 'Hello');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

/*
//////////////////////////////////
// THE REST OPERATOR
// 1) Destructuring

// SPREAD, because on right side of assignment operator ("=")
const arr = [1, 2, ...[3, 4]];
console.log(arr);

// REST, because on left side of assignment operator ("=")
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  const sum = numbers.reduce((prev, curr) => prev + curr);
  console.log(sum);
};
add(2, 3); // 5
add(2, 3, 4, 5); // 14
add(2, 3, 7, 8, 9); // 29
add(2, 3, 5, 6, 7, 8); // 31

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('Paneer', 'Capsicum', 'Cheese', 'Jalapeno');
*/

/*
//////////////////////////////////
// THE SPREAD OPERATOR
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Merge 2 or More Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, 'S.'];
console.log(letters);
console.log(...str);

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { founder: 'Guiseppe', ...restaurant, foundedIn: 1988 };
console.log(newRestaurant);

// Shallow copy of objects
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
//////////////////////////////////
// OBJECT DESTRUCTURING
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  starterInd: 2,
  mainInd: 2,
});

const { name, categories, openingHours } = restaurant;
console.log(name);
console.log(categories);
console.log(openingHours);

// CHANGING THE NAME OF VARIABLES
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(name, hours, tags);

// DEFAULT VALUES
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
*/

/*
//////////////////////////////////
// ARRAY DESTRUCTURING

const arr = [2, 3, 4];
const [x, y, z] = arr;

console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Swapping values of two variables

[main, secondary] = [secondary, main];
console.log(main, secondary);

// console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter + ' and ' + mainCourse);

// NESTED DESTRUCTURING
const nested = [2, 3, [4, 6]];
const [a, , [b, c]] = nested;
console.log(a, b, c);

// DEFAULT VALUES
// const [p, q, r] = [8, 9];
// console.log(p, q, r);

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

*/
