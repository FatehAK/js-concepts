//*global variables
console.log('=======================global=======================');

globalVal = "I'm a Global Variable";
var anotherGlobal = "I'm Global too";
let meNoGlobal1 = "let can't be part of global properties";
const meNoGlobal2 = "const can't be part of global properties";
console.log(this.globalVal);
console.log(this.anotherGlobal);
console.log(this.meNoGlobal1);
console.log(this.meNoGlobal2);
//*

//*var
//function scoped --> each function generates a new scope
console.log('=======================var=======================');

function outerFun11() {
  //!first scope
  console.log(myTopVar); //undefined
  var myTopVar = 'Yo';
  console.log(myBottomVar); //undefined

  for (var i = 0; i < 1; i++) {
    var abc = "I'm from for loop";
    console.log('top: (function scope)' + myTopVar);
    console.log('bottom: (function scope)' + myBottomVar); //undefined
  }
  console.log('i value: ' + i);
  console.log('var accessed outside the loop: ' + abc);

  function innerFun1() {
    //!second scope
    var innerVar = 'returned from inner function';
    console.log('Closure (inner fn) top: ' + myTopVar);
    console.log('Closure i value: ' + i);
    console.log('Closure var accessed outside the loop: ' + abc);
    console.log('Closure (inner fn) bottom: ' + myBottomVar);
    return innerVar;
  }

  //console.log(innerVar); //Reference Error
  var myBottomVar = 'Hello';
  return innerFun1;
}

var funa = outerFun11();
console.log(funa());
//*

//*let
//block scoped --> each block genrates new scope --> accesible in sub blocks as well
console.log('=======================let=======================');

function outerFun22() {
  //!first scope
  //console.log(myTopVar); //Reference Error
  let myTopVar = 'Yo';
  //console.log(myBottomVar); //Reference Error

  for (let i = 0; i < 1; i++) {
    //!second scope
    let abc = "I'm from for loop";
    console.log('top: (sub block scope) ' + myTopVar);
    //console.log('closure (for loop) bottom: ' + myBottomVar); //Reference Error
    if (true) {
      //!third scope --> sub scope
      console.log('(from inner for loop): ' + abc);
      console.log('top: (sub block scope) ' + myTopVar);
      console.log('i: (sub block scope) ' + i);
      //console.log('closure (inner for loop) bottom: ' + myBottomVar); //Reference Error
    }
  }
  //console.log('i value: ' + i); //Reference Error
  //console.log('let accessed outside the loop: ' + abc); //Reference Error

  function innerFun1() {
    //!fourth scope
    let innerVar = 'returned from inner function';
    console.log('Closure (inner fn) top: ' + myTopVar);
    //console.log('Closure i value: ' + i); //Referenece Error
    //console.log('Closure let accessed outside the loop: ' + abc); //Reference Error
    console.log('Closure (inner fn) bottom: ' + myBottomVar);
    return innerVar;
  }
  //console.log(innerVar); //Reference Error
  let myBottomVar = 'Hello';
  return innerFun1;
}

let funb = outerFun22();
console.log(funb());
//*

//*const
//block scoped --> each block genrates new scope --> accesible in sub blocks as well (same as let)
console.log('=======================const=======================');
const aConst = 'Hello';
//aConst = 'Bye'; //Type Error - Assignment

//Change in value possible (mutation)
for (let i = 0; i < 2; i++) {
  const myVal = i;
  //myVal = i+1; //Type Error - Assignment
  console.log(myVal);
}
//*

//*Hoisting
//technique in which decalarations are moved to the top not initializations (in case of variables)
/** Hoisting order
 * 1. 'this', 'arguments' object
 * 2. Formal Parameters - funtion foo(p1,p2) {..}
 * 3. Function Declaration - function foo() {..}
 * 4. Variable Declaration - var, let, const
 */
console.log('=======================Hoisting=======================');

//>>function hoisting
function test() {
  //foo(); // TypeError "foo is not a function"
  bar(); // valid
  //baz(); // TypeError "baz is not a function"
  //spam(); // ReferenceError "spam is not defined"

  let foo = function () {}; // anonymous function expression ('foo' gets hoisted)
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
  //console.log(x); //Reference Error
  //console.log(y); //Reference Error
  if (false) {
    let x = 5;
  } else {
    let y = 6;
  }
}
moo();

//Resolved to
//----------
//         |
//         V
function actualMoo() {
  let x, y;
  if (false) {
    x = 1;
  } else {
    y = 1;
  }
}

//>>Hoisting example
function someFun(val) {
  console.log('val is ' + val);
}

someFun(val);
var val = 5;

//Resolved to
//----------
//         |
//         V
function someFun(vall) {
  console.log('val is ' + vall);
}
let vall;
someFun(vall);
val = 5;
//*
