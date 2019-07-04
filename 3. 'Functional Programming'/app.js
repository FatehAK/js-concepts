//*Closures
console.log('=======================Closures=======================');

//>>inner function has access to any variable within the scope also the parameters
function outerFun1(param) {
    let outerTop = 'From Top';

    function innerFun() {
        console.log(outerTop + '->' + outerBottom + '->' + param);
    }

    let outerBottom = 'From Bottom';
    innerFun();
}
outerFun1('From Parameter');

//>>inner function has access to variables even after outer function has returned
//local variables are not copied they are kept by reference
function outerFun2(param) {
    let outerVar = 'Jones';

    function innerFun() {
        console.log(outerVar + ' ' + param);
    }

    return innerFun;
}

let myInner = outerFun2('Jameson'); //outer function has returned at this point
myInner();

//>>using closures to define private members
function outerFun3() {
    let pvtMember = 1000;

    return {
        getMember() {
            return pvtMember;
        },
        setMember(val) {
            pvtMember = val;
        }
    };
}

const retObj = outerFun3();
console.log(retObj.getMember());
retObj.setMember(2000);
console.log(retObj.getMember());

//>>closure problem with loops
function outerFun4(objParam) {
    var myID = 100;

    for (var i = 0; i < objParam.length; i++) {
        objParam[i].id = function() {
            return myID + i;
        };
    }

    return objParam;
}

var myObj1 = [
    {
        name: 'Jackson'
    },
    {
        name: 'Samson'
    },
    {
        name: 'Mason'
    }
];

let retObj1 = outerFun4(myObj1);

for (let val of retObj1) {
    console.log(val.name + ': ' + val.id());
}
console.log('\n');

//>>>>solved by using IIFE
function outerFun5(objParam) {
    var myID = 100;

    for (var i = 0; i < objParam.length; i++) {
        objParam[i].id = (function(j) {
            return myID + j;
        })(i);
    }

    return objParam;
}

var myObj2 = [
    {
        name: 'Jackson'
    },
    {
        name: 'Samson'
    },
    {
        name: 'Mason'
    }
];

let retObj2 = outerFun5(myObj2);

for (let val of retObj2) {
    console.log(val.name + ': ' + val.id);
}
console.log('\n');

//>>>>solved by using let
function outerFun6(objParam) {
    let myID = 100;

    //let creates a new block scope for each iteration of the loop
    for (let i = 0; i < objParam.length; i++) {
        objParam[i].id = function() {
            return myID + i;
        };
    }

    return objParam;
}

var myObj3 = [
    {
        name: 'Jackson'
    },
    {
        name: 'Samson'
    },
    {
        name: 'Mason'
    }
];

let retObj3 = outerFun6(myObj3);

for (let val of retObj3) {
    console.log(val.name + ': ' + val.id());
}

//>>closure created on each call to outerfunction
function outerFun7(myVal) {
    function innerFun() {
        console.log(myVal);
    }

    return innerFun;
}

//closure 1
let myInnerFun1 = outerFun7(100);
myInnerFun1();
//closure 2
let myInnerFun2 = outerFun7(200);
myInnerFun2();
//*

//*Callback functions
console.log('=======================Callback=======================');
//Any function passed as an argument; gennerally executed at a later stage

//>>basic callback
function myFunction1(callbackFun) {
    let myVal = 100;
    console.log('Hello');
    callbackFun(myVal);
}

myFunction1(callbackFun);

function callbackFun(val) {
    console.log('Hello from callback ' + val);
}

//or
function myFunction2(cb) {
    let myVal = 100;
    console.log('Hello');
    cb(myVal);
}

myFunction2(function(val) {
    console.log('Hello from callback ' + val);
});

//>>problem of callbacks with objects
//solved using .call() or .apply()
const myObject = {
    fullname: 'Not set yet',
    setUserName(fname, lname) {
        this.fullname = fname + ' ' + lname;
    }
};

function getUserName(fname, lname, cb, obj) {
    // cb(fname, lname); //wont work to set value
    cb.call(obj, fname, lname);
}

//pass the object as well to set the 'this' value
getUserName('Rick', 'Devoe', myObject.setUserName, myObject);
console.log(myObject.fullname);
console.log(window.fullname);

//>>multiple callbacks
function mulFun(param, cb1, cb2) {
    if (param === 'success') {
        cb1();
    }

    if (param === 'failure') {
        cb2();
    }
}

mulFun(
    'success',
    function() {
        console.log('Yay Success');
    },
    function() {
        console.log('Nope Failure');
    }
);
//*

//*IIFE
console.log('=======================IIFE=======================');

(function() {
    console.log('Hello from IIFE');
})();

(() => {
    console.log('Hello from Arrow IIFE');
})();

(function myIIFE() {
    console.log('Hello from named IIFE');
})();

let vNum = 100;
(function(v) {
    console.log('Hello from Paremetrized IIFE: ' + v);
})(vNum);

//no need outer parens since js understands its an expression
let varIIFE = (function() {
    console.log('Hello from var IIFE');
})();

//>>alternate forms
//can cause to return some value
//use only when return value not needed
!(function() {
    return console.log('Hello from !');
})();

-(function() {
    console.log('Hello from -');
})();

+(function() {
    console.log('Hello from +');
})();

~(function() {
    console.log('Hello from ~');
})();

//safe method when js minification
//if the preceding line is a function exp and does not have a semi colon
//then the IIFE will be executed as a parameter as part of that function
//called the leading defensive semi colon
; (function() {
    console.log('Hello from ;');
})();

//>>using IIFE within ternary operator
//condition? true : false
function terFun(bool) {
    let docTitle = bool
        ? (function() {
            return 'Title1';
        })()
        : (function() {
            return 'Title2';
        })();
    console.log(docTitle);
}

terFun(true);
terFun();
//*

//*Short circuiting
console.log('=======================Short Circuiting=======================');
//use of &&, ||
function opFun1(param) {
    //both true
    if (param === 'boo' && typeof param === 'string') {
        console.log(param);
    }
    //any one true
    if (param === 'boo' || typeof param === 'object') {
        console.log(param);
    }
}
opFun1('boo');
//falsy values : false, NaN, 0, undefined, null, ''

function documentTitle(theTitle) {
    if (!theTitle) {
        theTitle = 'Untitled Document';
    }
    return theTitle;
}
console.log(documentTitle());
//instead of that use this
//__________________
//                  |
//                  V

function opFun2(myTitle) {
    //if first one is true the value returned and don't evaluate second value
    //if first one is false then evaluate the second value and return it
    myTitle = myTitle || 'Untitled Document';
    return myTitle;
}

console.log(opFun2(null));

function opFun3(myTitle) {
    //if first one is true then also evaluate the second and return final value(second)
    //if first one is false then dont evaluate the second one
    myTitle = myTitle && 'Untitled Document';
    return myTitle;
}

console.log(opFun3('Hello World'));
//*

//*Function currying
console.log('=======================Currying=======================');
//currying transforms a function into a sequence of functions each taking a single argument of the function
//use currying if you want to pass params later and seperately in your program
//basic currying
function curryFun(cb) {
    return function(param1) {
        return function(param2) {
            return function(param3) {
                return cb(param1, param2, param3);
            };
        };
    };
}

function sum1(a, b, c) {
    return console.log(a + b + c);
}

let retCurry = curryFun(sum1);
retCurry(2)(2)(2);

//>>standard partial application
//creating a new function by fixing some parameters of the existing one
function partialFun(cb) {
    return function(param1) {
        return function(param2, param3) {
            return cb(param1, param2, param3);
        };
    };
}

function sum2(a, b, c) {
    return console.log(a + b + c);
}

let retPartial = partialFun(sum2);
let retResult = retPartial(3);
retResult(3, 3);
//or//
retPartial(3)(3, 3);

//>>partial application with .bind()
function mul(a, b) {
    return a * b;
}

let double = mul.bind(null, 2);
console.log(double(3)); // = mul(2, 3) = 6
console.log(double()); // = mul(2, ) = NaN
console.log(double(5)); // = mul(2, 5) = 10

//>>partial application of curry functions
//passing some parameters later
function curry(cb) {
    return function curried(...args1) {
        console.log(args1.length + '..' + cb.length);
        if (args1.length === cb.length) {
            return cb(...args1);
        } else {
            return function(...args2) {
                return curried(...args1.concat(args2));
            };
        }
    };
}

function sum3(a, b, c) {
    return console.log(a + b + c);
}

let curriedSum = curry(sum3);

//still callable normally
curriedSum(1, 2, 3); //6
//get the partial with curried(1) and call it with 2 other arguments
curriedSum(1)(2, 3); //6
curriedSum(1, 2)(3); //6

//full curried form
curriedSum(1)(2)(3); //6

let curryThree = curriedSum(1, 2); //wont work
curryThree(1); //now works pass it later //

//>>general use case 1
function discount(discount, price) {
    return console.log(price * discount);
}

let curryDiscount = curry(discount);

//for general customers - fix 10% discount
let tenPercentDiscount = curryDiscount(0.1);
tenPercentDiscount(500);
tenPercentDiscount(1000);

//for favorite customers - fix 20% discount
let twentyPercentDiscount = curryDiscount(0.2);
twentyPercentDiscount(500);
twentyPercentDiscount(1000);

//>>general use case 2
function log(date, importance, message) {
    console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

let curriedLog = curry(log);
curriedLog(new Date(), 'DEBUG', 'some debug');
curriedLog(new Date())('DEBUG')('some debug');

//convenience function for today's logs
//fix first parameter
let todayLog = curriedLog(new Date());
todayLog('INFO', 'message');

//convenience function for today's debug logs
//fix second parameter
let todayDebug = todayLog('DEBUG');
todayDebug('message');
//*

//*Memoization
console.log('=======================Memoization=======================');
//no caching
function add(param) {
    return console.log(param + 10);
}

let cache1 = {};
function memAdd(key) {
    //if exist return
    if (cache1[key]) {
        console.log('fetching from cache');
        return cache1[key];
    }
    //if not exist add to cache
    else {
        console.log('adding to cache');
        return (cache1[key] = key + 10);
    }
}

console.time('t1');
console.log(memAdd(3));
console.timeEnd('t1');
console.time('t2');
console.log(memAdd(3));
console.timeEnd('t2');
console.log('\n');

let cache2 = {};
function memSqr(key) {
    //if exist return
    if (cache2[key]) {
        console.log('fetching from cache');
        return cache2[key];
    }
    //if not exist add to cache
    else {
        console.log('adding to cache');
        return (cache2[key] = Math.sqrt(key));
    }
}

console.time('t6');
console.log(memSqr(36));
console.timeEnd('t6');
console.time('t7');
console.log(memSqr(36));
console.timeEnd('t7');
console.log('\n');

//>>memoize any function with this code
//can only be used for direct value fetching
//cannot compute based on previous value
function memoize(cb) {
    let cache = {};
    return function(...key) {
        //if exist return
        if (cache[key]) {
            console.log('fetching from cache');
            return cache[key];
        }
        //if not exist add to cache
        else {
            console.log('adding to cache');
            return (cache[key] = cb(...key));
        }
    };
}

//addition
function addFun(a, b, c) {
    return a + b + c;
}

let addMem = memoize(addFun);
console.time('t8');
console.log(addMem(2, 2, 2));
console.timeEnd('t8');
console.time('t9');
console.log(addMem(2, 2, 2));
console.timeEnd('t9');
console.log('\n');

//standard factorial
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

//>>memoized factorial
//do not use genric memoizer with recusive functions
let cacheFact = {};
function factMemoize(key) {
    if (key === 0) {
        return 1;
    } else if (cacheFact[key]) {
        console.log('cache hit: ' + key);
        return cacheFact[key];
    } else {
        cacheFact[key] = key * factMemoize(key - 1);
        return cacheFact[key];
    }
}
//standard factoiral
console.time('t17');
console.log(factorial(11));
console.timeEnd('t17');
//memoized factorial
console.log('6! = ', factMemoize(6));
console.log('\n');
console.log('8! = ', factMemoize(8));
console.log('\n');
console.log('9! = ', factMemoize(9));
console.log('\n');
console.log('10! = ', factMemoize(10));
console.log('\n');
console.time('t18');
console.log('11! = ', factMemoize(11));
console.timeEnd('t18');
console.log(cacheFact);
console.log('\n');

//standard fibonacci
function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

//>>memoized fibonacci
//do not use genric memoizer with recusive functions
let cacheFib = {};
function fibMemoize(key) {
    if (key === 1 || key === 2) {
        return 1;
    } else if (cacheFib[key]) {
        console.log('cache hit: ' + key);
        return cacheFib[key];
    } else {
        cacheFib[key] = fibMemoize(key - 1) + fibMemoize(key - 2);
        return cacheFib[key];
    }
}

//standard fibonacci
console.time('t19');
console.log(fibonacci(11));
console.timeEnd('t19');
//memoized fibonacci
console.log('6 :' + fibMemoize(6));
console.log('\n');
console.log('7 :' + fibMemoize(7));
console.log('\n');
console.log('8 :' + fibMemoize(8));
console.log('\n');
console.log('9 :' + fibMemoize(9));
console.log('\n');
console.log('10 :' + fibMemoize(10));
console.log('\n');
console.time('t20');
console.log('11 :' + fibMemoize(11));
console.timeEnd('t20');
console.log(cacheFib);
//*
