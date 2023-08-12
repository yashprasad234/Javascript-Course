'use strict';
/*
const Person = function (fullName, bithYear) {
  // Instance properties
  this.fullName = fullName;
  this.bithYear = bithYear;
  // console.log(this);

  // Never do this. You should never create a function inside of a constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.bithYear);
  //   };
};

const yash = new Person('Yash', 2001);
console.log(yash);

// 1. New {} (empty object) is created;
// 2. function is called, and the this keyword is set to {}, i.e, this = {};
// 3. {} is linked to a prototype; The __proto__ property is created.
// 4. function automatically returns the {}, but it doesn't necessarily has to be empty

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
console.log(jonas, matilda);

const jay = 'Jay';

console.log(yash instanceof Person);
console.log(jay instanceof Person);

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};

Person.hey();
// yash.hey(); // Won't work will show error

////////////////////////////////////
// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.bithYear);
};

yash.calcAge(); // yash can access the calcAge method due to prototypal inheritance
jonas.calcAge();

console.log(yash.__proto__); // created in the 3rd step of how the constructor function works
console.log(yash.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(yash));
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(yash.species, jonas.species);

// Own property is property that is not inherited from the prototype
console.log(yash.hasOwnProperty('fullName'));
console.log(yash.hasOwnProperty('species'));

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

// console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9, 9];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__ === Object.prototype);
// console.log(arr.__proto__.__proto__.__proto__);

// we have created a method that all the arrays in this file can access through prototypal inheritance
// but it is not recommended to do so on built-in object because of 2 reasons:-
// 1) JS might come up with a method with same name for the object and it could cause bugs in our code
// 2) when working with a team of developers all the developers implement the same method with different names that it will create so many bugs
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
// HTML elements have 6 levels deep prototype chain
console.log(h1.__proto__);
console.log(h1.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);
console.log(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
);
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `This ${this.make} is going at the speed ${this.speed} after accelerating`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(
    `This ${this.make} is going at the speed ${this.speed} after braking`
  );
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.brake();
car1.accelerate();
car1.brake();
car1.brake();
car1.brake();
car1.accelerate();

car2.accelerate();
car2.accelerate();
car2.brake();
car2.accelerate();
car2.brake();
car2.accelerate();
*/

/*
////////////////////////////////////
// ES6 Classes

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Any METHOD written outside the constructor function will be on the prototype of objects not on the objects themselves.
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Remember this pattern for when trying to set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1999);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}`);
// };

jessica.greet();

// 1. Classes are not hoisted (Not even class declarations)
// 2. Classes are first-class citizens (can be passed into or returned from functions)
// 3. Classes are executed in strict mode (even if we have not specified strict mode for the file classes will be executed in strict mode only)
*/
/*

///////////////////////////////////
// Getters and Setters

const walter = new PersonCl('Walter White', 1965);
console.log(walter);

PersonCl.hey();

const account = {
  owner: 'Yash',
  #movements: [60000, 80000, 115000, 125000],

  get latest() {
    return this.#movements.slice(-1).pop();
  },

  set latest(mov) {
    this.#movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 200000;
console.log(account.#movements);

*/

/*

///////////////////////////////////////
// Object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven Ha';
steven.birthYear = 2002;
console.log(steven);
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2001);
console.log(sarah);
sarah.calcAge();
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(
      `This ${this.make} is going at the speed ${this.speed} after accelerating`
    );
  }

  brake() {
    this.speed -= 5;
    console.log(
      `This ${this.make} is going at the speed ${this.speed} after braking`
    );
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 100;
console.log(ford.speed);
*/
/*
///////////////////////////////////////////////////
// Inheritance b/w "Classes": Constructor functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // We are just repeating our code from the Person constructor function and violating the DRY rule and if there were some changes in the Person constructor function they will not reflect here.
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  // This does not work because here we are simply calling Person as a regular function and regular functions have the this keyword set to undefined so it will not work and show error. To avoid that we can simply call the Person constructor function using the call or apply method
  // Person(firstName, birthYear);
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi! I am ${this.firstName}, and I am studying ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Artificial Intelligence');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__); // Mike's prototype i.e, Student.prototype
console.log(mike.__proto__.__proto__); // Student's prototype i.e, Person.prototype
console.log(mike.__proto__.__proto__.__proto__); // Person's prototype i.e, Object.prototype
console.log(mike.__proto__.__proto__.__proto__.__proto__); // Object's prototype i.e, null
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `This ${this.make} is going at the speed ${this.speed} after accelerating`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(
    `This ${this.make} is going at the speed ${this.speed} after braking`
  );
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make} charged upto ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(90);
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
*/

/*
///////////////////////////////////////////////////
// Inheritance b/w "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Any METHOD written outside the constructor function will be on the prototype of objects not on the objects themselves.
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Remember this pattern for when trying to set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }

  introduce() {
    console.log(`Hi! I am ${this.fullName}, and I am studying ${this.course}`);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to be the first thing that happens, because the super() is responsible for allocating the "this" keyword and if don't set the this keyword in the beginning then we can't set other parameters belonging to this class.
    super(fullName, birthYear);
    this.course = course;
  }
}

const martha = new StudentCl('Martha Davis', 2015, 'Blockchain');
martha.introduce();
martha.calcAge();
*/

/*
///////////////////////////////////////////////////
// Inheritance b/w "Classes": Object.creat()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (fullName, birthYear, course) {
  PersonProto.init.call(this, fullName, birthYear);
  this.course = course;
};

// StudentProto.getFullName = function () {
//   return this.fullName;
// };

StudentProto.introduce = function () {
  console.log(`Hi! I am ${this.fullName}, and I am studying ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay Shetty', 1992, 'Computer Science');
// console.log(jay.getFullName());
jay.introduce();

*/

/*

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// There is also the static version for the above 4

class Account {
  // 1) Public fields (instances)
  // Fields that will be the same for every instance of this class
  locale = navigator.language;

  // 2) Private fields
  // Fields that will be private and not accessible outside the class
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this.#movements = [];
    // this.locale = navigator.language;

    console.log(
      `${owner.split(' ')[0]}, thanks for opening your account with us 😁`
    );
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Yash Prasad', 'INR', 7777);

// acc1.movements.push(250000);
// acc1.movements.push(-100000);
// acc1.#approveLoan(100000000);

acc1.deposit(250000);
acc1.withdraw(100000);
acc1.requestLoan(100000000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100000000));

// Chaining
acc1
  .deposit(300000)
  .deposit(500000)
  .withdraw(100000)
  .requestLoan(25000000)
  .withdraw(1000000);

console.log(acc1.getMovements());

*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(
      `This ${this.make} is going at the speed ${this.speed} after accelerating`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `This ${this.make} is going at the speed ${this.speed} after braking`
    );
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} charged upto ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
