//# Nullish coalescing operator (??)
/*
A logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
*/
console.log(null ?? 'foo'); // 'foo'
console.log(undefined ?? 'foo'); // 'foo'
console.log(0 ?? 'foo'); // 0
console.log(NaN ?? 'foo'); // NaN
console.log(false ?? 'foo'); // false
console.log('' ?? 'foo'); // ''
console.log(-1 ?? 'foo'); // -1

//>> vs || (OR)
console.log(null || 'foo'); // 'foo'
console.log(undefined || 'foo'); // 'foo'
console.log(0 || 'foo'); // 'foo'
console.log(NaN || 'foo'); // 'foo'
console.log(false || 'foo'); // 'foo'
console.log('' || 'foo'); // 'foo'
console.log(-1 || 'foo'); // -1

//>>in fn calls
function A() {
  console.log('A was called');
  return undefined;
}
function B() {
  console.log('B was called');
  return false;
}
function C() {
  console.log('C was called');
  return 'bar';
}

console.log(A() ?? C());
// Logs "A was called" then "C was called" and then "bar"
// as A() returned undefined so both expressions are evaluated

console.log(B() ?? C());
// Logs "B was called" then "false"
// as B() returned false (and not null or undefined), the right hand side expression was not evaluated

//>> nullish assignment (??=)
const aa = { duration: 50 };

aa.duration ??= 10;
console.log(aa.duration); // 50

aa.speed ??= 25; // -> a.speed = a.speed ?? 25
console.log(aa.speed); // 25
//#

//# Optional Chaining (?.)
/*
?. Accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.

obj.val?.prop
obj.val?.[expr]
obj.func?.(args)
*/

//>>in objects
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Purr',
  },
};
const dogName = adventurer.dog?.name;
// without chaining
// const dogName = adventurer.dog && adventurer.dog.name;

console.log(dogName); // undefined
console.log(adventurer.someNonExistentMethod?.()); // undefined

//>>in optional callbacks
function myFun(onSuccess, onError) {
  try {
    onSuccess();
  } catch (err) {
    onError?.();
  }
}

//>>in arrays
const arr = [1, 2, 3, 4];
console.log(arr?.[1]); // 2
// can access out of bounds indexes safely
console.log(arr?.[100]); // undefined

//>> combining with nullish coalescing operator
console.log(adventurer.dog?.name ?? 'Leo'); // Leo

//>>not valid in LHS assignment
const object = {};
// object?.property = 1; // SyntaxError: Invalid left-hand side in assignment
//#

//# Numeric Seperators
// To improve readability for numeric literals, underscores can be used as separators
console.log(99_000); // 99000
// console.log(99__000); // More than one underscore not allowed
// console.log(99_000_); // Not allowed at the end of numeric literals
// console.log(0_9999_0); // Can not be used after leading 0
// console.log(_99_000); // Gets treated as a variable
//#

//# Spread
console.log('=======================Spread=======================');

//>>In Function calls
//used to expand the iterable object to pass as arguments in function
//4 is discarded since no parameter present
function summer(x, y, z) {
  console.log(x + y + z); //6
}

const spArr = [1, 2, 3, 4];

//expands spArr
console.log(...spArr);
summer(...spArr);
//or//
summer.apply(null, spArr);

//>>In Array literals
const num1 = [3, 4, 5];
const num2 = [1, 2, ...num1, 6];
console.log(num2);

//copy arrray
const org = ['a', 'b', 'c', [1, 2]];
const copyArr = [...org];
console.log(copyArr);

//concat arrays
const arrr1 = [1, 2, 3, 4];
const arrr2 = [5, 6];
const full = [...arrr1, ...arrr2];
console.log(full);

//object cloning and merging
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };

//shallow clone
const clonedObj = { ...obj1 };
console.log(clonedObj);
//the last value will be considered
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);
//#

//# Rest
console.log('=======================Rest=======================');
//used with function definitions to represent indefinite number of arguments
function myFun(a, b, ...manyMoreArgs) {
  console.log('a', a);
  console.log('b', b);
  console.log('manyMoreArgs', manyMoreArgs);
}

myFun('one', 'two', 'three', 'four', 'five', 'six');

//rest and destructure
function f(...[a, b, c]) {
  return a + b + c;
}

f(1); //NaN (b and c are undefined)
f(1, 2, 3); //6
f(1, 2, 3, 4); //6 (the fourth parameter is not destructured)
//#

//# Destructuring
console.log('=======================Destructuring=======================');
//makes it possible to unpack values from arrays, or properties from objects, into distinct variables

//>>Array Destructuring
const array1 = [1, 2, 3, 4, 5, 6];
//syntax [t1, t2, ..] = source
const [m1, m2, ...m3] = array1;
console.log(m1); // 1
console.log(m2); // 2
console.log(m3); // [3, 4, 5, 6]

//assigning defaults else undefined
const array2 = [1, 2];
const [t1 = 5, t2 = 6, t3 = 3, t4] = array2;
console.log(t1); //1
console.log(t2); //2
console.log(t3); //3
console.log(t4); //undefined

//swapping
let k1 = 6;
let k2 = 1;
console.log('k1: ' + k1 + ', k2: ' + k2);
[k1, k2] = [k2, k1];
console.log('k1: ' + k1 + ', k2: ' + k2);

//returning array from function
function ff() {
  return [1, 2];
}

const [l1, l2] = ff();
console.log(l1); //1
console.log(l2); //2

//ignoring return values
function fff() {
  return [1, 2, 3];
}

const [g1, , g2] = fff();
console.log(g1); //1
console.log(g2); //3

//within functions
function funDes1([a, b]) {
  console.log(a); //1
  console.log(b); //2
}

const desArray = ['1', '2'];
funDes1(desArray);

//>>Object Destructuring
const desObj1 = { a: 'foo', b: 'bar' };
//the unpacked values should have same name as the key
//using defaults
const { a, b, c = 'baz' } = desObj1;
console.log(a); //foo
console.log(b); //bar
console.log(c); //baz

//using different names (i.e. aliases)
const { a: myFoo, b: myBar } = desObj1;
console.log(myFoo); //foo
console.log(myBar); //bar

//seperating dec and def
let myA, myB;
const desObj2 = { myA: 'Foo', myB: 'Bar' };
//covering in ();
({ myA, myB } = desObj2);
console.log(myA); //Foo
console.log(myB); //Bar

//within functions
function funDes2({ a, b, c: { val } }) {
  console.log(a); //1
  console.log(b); //2
  console.log(val); //zoo
}

const desObj3 = {
  a: 1,
  b: 2,
  c: {
    val: 'zoo',
  },
};

funDes2(desObj3);

//with nested objects
const desObj4 = {
  h1: 1,
  h2: 2,
  h3: {
    value: 'foo',
  },
};

let {
  h1,
  h2,
  h3: { value },
} = desObj4;

console.log(h1);
console.log(h2);
console.log(value);

//in iteration
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
    },
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Nora Jones',
      father: 'Richard Jones',
    },
  },
];

for (const {
  name: n,
  family: { father: f },
} of people) {
  console.log(n + ' ' + f);
}

//with spread
const desObj5 = { r1: 1, r2: 2, r3: 3, r4: 4, r5: 5 };
const { r1, r2, ...all } = desObj5;
console.log(r1); // 1
console.log(r2); // 2
console.log(all); // {r3: 3, r4: 4, r5: 5}

//array object destructuring
const props = [
  { id: 1, name: 'Fizz' },
  { id: 2, name: 'Buzz' },
  { id: 3, name: 'FizzBuzz' },
];

const [, , { name }] = props;

console.log(name); //"FizzBuzz"
//#
