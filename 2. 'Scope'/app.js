//*global variables
console.log('=======================global=======================');

globalVal = "I'm a Global Variable";
var anotherGlobal = "I'm Global too";
let meNoGlobal1 = "let can't be part of global properties";
const meNoGlobal2 = "const can't be part of global properties";
console.log(this.globalVal); // I'm a Global Variable
console.log(this.anotherGlobal); // I'm Global too
console.log(this.meNoGlobal1); // undefined
console.log(this.meNoGlobal2); // undefined
//*

//*var
//function scoped --> each function generates a new scope
console.log('=======================var=======================');

/*
Rule
  if variable exists in scope ->
    -> if accessed before initialized -> undefined (Only declaration hoisted)
    -> if accessed after initialized -> value
  if variable does not exist in scope -> ReferenceError
*/
function outerFun11() {
  //!first scope
  console.log(myTopVar); // undefined
  var myTopVar = 'Yo';
  console.log(myBottomVar); // undefined

  for (var i = 0; i < 1; i++) {
    var abc = "I'm from for loop";
    console.log('top: (function scope)' + myTopVar); // Yo
    console.log('bottom: (function scope)' + myBottomVar); // undefined
  }
  console.log('i value: ' + i); // 1
  console.log('var accessed outside the loop: ' + abc); // I'm from for loop

  function innerFun1() {
    //!second scope
    var innerVar = 'returned from inner function';
    console.log('Closure (inner fn) top: ' + myTopVar); // Yo
    console.log('Closure i value: ' + i); // 1
    console.log('Closure var accessed outside the loop: ' + abc); // I'm from for loop
    console.log('Closure (inner fn) bottom: ' + myBottomVar); // Hello
    return innerVar;
  }

  // console.log(innerVar); // Reference Error
  var myBottomVar = 'Hello';
  return innerFun1;
}

var funa = outerFun11();
console.log(funa()); // returned from inner function
//*

//*let
//block scoped --> each block genrates new scope --> accesible in sub blocks as well
console.log('=======================let=======================');

/*
Rule
  if variable exists in scope ->
    -> if accessed before initialized -> ReferenceError (No hoisting)
    -> if accessed after initialized -> value
  if variable does not exist in scope -> ReferenceError
*/
function outerFun22() {
  //!first scope
  //console.log(myTopVar); // Reference Error
  let myTopVar = 'Yo';
  //console.log(myBottomVar); // Reference Error

  for (let i = 0; i < 1; i++) {
    //!second scope
    let abc = "I'm from for loop";
    console.log('top: (sub block scope) ' + myTopVar); // Yo
    // console.log('closure (for loop) bottom: ' + myBottomVar); // Reference Error
    if (true) {
      //!third scope --> sub scope
      console.log('(from inner for loop): ' + abc); // I'm from for loop
      console.log('top: (sub block scope) ' + myTopVar); // Yo
      console.log('i: (sub block scope) ' + i); // 1
      // console.log('closure (inner for loop) bottom: ' + myBottomVar); //Reference Error
    }
  }
  //console.log('i value: ' + i); // Reference Error
  //console.log('let accessed outside the loop: ' + abc); // Reference Error

  function innerFun1() {
    //!fourth scope
    let innerVar = 'returned from inner function';
    console.log('Closure (inner fn) top: ' + myTopVar); // Yo
    // console.log('Closure i value: ' + i); // Referenece Error
    // console.log('Closure let accessed outside the loop: ' + abc); // Reference Error
    console.log('Closure (inner fn) bottom: ' + myBottomVar); // Hello
    return innerVar;
  }
  //console.log(innerVar); // Reference Error
  let myBottomVar = 'Hello';
  return innerFun1;
}

let funb = outerFun22();
console.log(funb()); // returned from inner function
//*

//*const
//block scoped --> each block genrates new scope --> accesible in sub blocks as well (same as let)
console.log('=======================const=======================');
const aConst = 'Hello';
//aConst = 'Bye'; // Type Error - Assignment

//Change in value possible (mutation)
for (let i = 0; i < 2; i++) {
  const myVal = i;
  //myVal = i+1; // Type Error - Assignment
  console.log(myVal);
}
//*

//*Hoisting
//technique in which decalarations are moved to the top not initializations (in case of 'var' variables and functions)
/** Hoisting order
 * 1. 'this', 'arguments' object
 * 2. Formal Parameters - funtion foo(p1,p2) {..}
 * 3. Function Declaration - function foo() {..}
 * 4. Variable Declaration - var, let, const
 */
console.log('=======================Hoisting=======================');

//>>function hoisting
function test() {
  console.log(foo); // undefined ('var' declaration alone hoisted)
  // console.log(baz); // ReferenceError ('let' declarations not hoisted)

  // foo(); // TypeError "foo is not a function"
  bar(); // valid
  // baz(); // TypeError "baz is not a function"
  // spam(); // ReferenceError "spam is not defined"

  var foo = function () {}; // anonymous function expression ('foo' gets hoisted)
  function bar() {} // function declaration ('bar' and the function body get hoisted)
  let baz = function spam() {}; // named function expression (only 'baz' gets hoisted)

  foo(); // valid
  bar(); // valid
  baz(); // valid
  //spam(); // ReferenceError "spam is not defined"
}
test();

//>>var hoisting
//assignments are not hoisted only names are hoisted
function goo() {
  console.log(x); //undefined
  console.log(y); //undefined
  if (false) {
    var x = 1;
  } else {
    var y = 1;
  }
}
goo();

//Resolved to
//----------
//         |
//         V
function actualGoo() {
  var x, y;
  if (false) {
    x = 1;
  } else {
    y = 1;
  }
}

//>>let hoisting
function moo() {
  //console.log(x); // Reference Error
  //console.log(y); // Reference Error
  if (false) {
    // console.log(x); // Reference Error
    let x = 5;
  } else {
    // console.log(y); // Reference Error
    let y = 6;
  }
}
moo();

//>>Hoisting example
function someFun(val) {
  console.log('val is ' + val); // undefined
}

someFun(val);
var val = 5;

//Resolved to
//----------
//         |
//         V
function actualSomeFun(vall) {
  console.log('val is ' + vall); // undefined
}
var vall;
actualSomeFun(vall);
vall = 5;
//*
