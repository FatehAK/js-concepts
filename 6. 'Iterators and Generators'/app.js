//# Generator
console.log('=======================Generator=======================');
//Generators are functions which can be exited and later re-entered
//Their context is saved across re-entrances

function* myGen(i) {
  //yield - pauses the function and returns the value to the caller
  //yield is same as return except it pauses the function rather than exiting from it
  yield i;
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

//returns an iterator
const iter1 = myGen(10);

console.log(iter1.next()); //10
console.log(iter1.next()); //11
console.log(iter1.next()); //12
console.log(iter1.next()); //13
console.log(iter1.next()); //undefined, { done: true }
console.log('\n');

//>>yield*
function* myGenerator(i) {
  yield i;
  yield i + 1;
  yield* anotherGen(i); //yield* - tranfers control to another gen() function
  yield i + 3;
}

function* anotherGen(i) {
  yield i;
  yield i + 10;
  yield* ['a', 'b']; //yield* can also yield from other iterables
  yield i + 20; //once over return back to original gen() function
}

const iter2 = myGenerator(10);

console.log(iter2.next()); //10
console.log(iter2.next()); //11
console.log(iter2.next()); //10
console.log(iter2.next()); //20
console.log(iter2.next()); //'a'
console.log(iter2.next()); //'b'
console.log(iter2.next()); //30
console.log(iter2.next()); //13
console.log(iter2.next()); //undefined
console.log('\n');

//>>with return;
function* myGen1(i) {
  console.log("I'm First");
  yield i;
  console.log('Im Second');
  yield i + 10;
  return 'foo'; //at this point done: true
  yield i + 20;
}

const iter3 = myGen1(10);

console.log(iter3.next()); //10
console.log(iter3.next()); //20
console.log(iter3.next()); //foo
console.log(iter3.next()); //undefined
console.log('\n');

//>>using yield to pass value inside as well
function* gen() {
  let ask1 = yield '2 + 2?';
  console.log(ask1); // 4

  let ask2 = yield '3 * 3?';
  console.log(ask2); // 9
}

let generator = gen();

console.log(generator.next()); //"2 + 2?"
console.log(generator.next(4)); //"3 * 3?"
console.log(generator.next(9)); //undefined
console.log('\n');

//>>use case
const customers = ['John', 'Mary', 'Christine', 'Edward'];

const getCustomers = function* () {
  yield 'The customers are about to be retrieved. Press next() again to proceed.';
  //   for (let customer of customers) {
  //     yield customer;
  //   } //or//
  yield* customers;
  return 'No more users to be retrieved.'; //acts as final return once all values are 'yielded'
};

const customersGenerator = getCustomers();

console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log(customersGenerator.next().value);
console.log('\n');
//#

//# Iterator and Iterables
console.log('=======================Iterator and Iterables=======================');
//An object is an iterator when it implements a next() method with -->
//done--> 'false' if next value in sequence available | 'true' if next value not available
//value-->  any JavaScript value returned by the iterator. Can be omitted when 'done' is 'true'.
//The next method always has to return an object with appropriate properties including done and value.

//In order to be iterable using for...of loop, an object must implement the @@iterator method, meaning that the object must have a property with a Symbol.iterator key.
//Array, String, Map, Set are bulit in iterables since their prototypes have the Symbol.iterator method.

//>>using built in iterables and using the iteration protocol explictly
//string
const itString = 'Hello';
//Symbol.iterator for string is defined in its prototype so no need to define it just call it directly
const iter5 = itString[Symbol.iterator]();

console.log(iter5.next()); // h
console.log(iter5.next()); // e
console.log(iter5.next()); // l
console.log(iter5.next()); // l
console.log(iter5.next()); // o
console.log(iter5.next()); // undefined, done: true
//same as
//   |
//   V
for (const s of itString) {
  console.log(s);
}
console.log('\n');

//array
const itArray = ['a', 'b', 'c', 'd'];
//Symbol.iterator for array is defined in its prototype so no need to define it just call it directly
const iter6 = itArray[Symbol.iterator]();

console.log(iter6.next());
console.log(iter6.next());
console.log(iter6.next());
console.log(iter6.next());
console.log(iter6.next());
//same as
//   |
//   V
for (const a of itArray) {
  console.log(a);
}
console.log('\n');

//>>using custom iterables
const range = {
  from: 1,
  to: 5,
};

//define our Symbol.iterator
//returns an iterator object
range[Symbol.iterator] = function () {
  // 1. Onward, for..of works only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 2. next() is called on each iteration by the for..of loop
    next() {
      // 3. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { value: this.current++, done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

//for...of method - implicit call
//The Symbol.iterator method is called automatically by for...of
for (const num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

//direct method - explicit call
const iter7 = range[Symbol.iterator]();

console.log(iter7.next());
console.log(iter7.next());
console.log(iter7.next());
console.log(iter7.next());
console.log(iter7.next());
console.log(iter7.next());

//>>or use generators
function* generateSeq(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const iter8 = generateSeq(1, 5);

console.log(iter8.next());
console.log(iter8.next());
console.log(iter8.next());
console.log(iter8.next());
console.log(iter8.next());
console.log(iter8.next());
//same as
//     |
//     V
console.log(...iter8); //wont work now since iteration is complete
//same as
//     |
//     V
for (const a of iter8) {
  console.log(a); //wont work now since iteration is complete
}

//if you need the iterable
const rangeGen = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    //shortcut for [Symbol.iterator] = function* ()
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  },
};

const iter9 = rangeGen[Symbol.iterator]();

console.log(iter9.next());
console.log(iter9.next());
console.log(iter9.next());
console.log(iter9.next());
console.log(iter9.next());
console.log(iter9.next());
//same as
//     |
//     V
console.log(...iter9); //wont work now since iteration is complete
//same as
//     |
//     V
for (const a of iter9) {
  console.log(a); //wont work now since iteration is complete
}
//#
