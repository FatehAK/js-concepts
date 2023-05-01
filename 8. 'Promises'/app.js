'use strict';

//*Event loop
console.log('=======================event loop=======================');
/**In JavaScript, almost all I/O is non-blocking. This includes HTTP requests, database operations and disk reads and writes.
 * 1. The single thread of execution asks the runtime to perform an operation, providing a callback function and then moves on to do something else.
 * 2. When the operation has been completed, a message is enqueued along with the provided callback function.
 * 3. At some point in the future, the message is dequeued and the callback fired.
 * */

function foo(a) {
  let b = 5;
  console.log('foo');
  return bar(a, b);
}

function bar(a, b) {
  console.log('bar');
  return a + b;
}

console.log(foo(5));

// const s = new Date().getSeconds();
// setTimeout(function () {
//     // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
//     console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
// }, 500);

// //ui thread blocks for 2 seconds
// while (true) {
//     if (new Date().getSeconds() - s >= 2) {
//         console.log("UI thread blocked for 2 seconds");
//         break;
//     }
// }
//*

//*Asynchronous
//Without async if a particular code takes too long to execute or generates any errors then the code below will not be able to execute, it will simply 'block'.
//With async even if the code takes too long to execute or if it generates errors then the code below will still be able to execute.
//The async code is executed in the background and the results of the code are made available only after every single line of non-async code has been executed.
console.log('=======================Asynchronous=======================');

//>>Normal Way without asynchonousity
//without async the code '_.drop' will not be made immediately available because of uncertainity of js engine
function loadScript1(src) {
  const scriptElem = document.createElement('script');
  scriptElem.setAttribute('src', src);
  document.body.appendChild(scriptElem);
}

loadScript1('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js');

//console.log(_.drop([1, 2, 3], 2)); //results in '_' not defined

//>>With asynchronous callbacks
//with async we make sure that the code '_.drop' is exceuted once we are sure the script has been loaded
function loadScript2(src, cb) {
  const script = document.createElement('script');
  script.setAttribute('src', src);
  document.body.appendChild(script);
  script.addEventListener('load', function () {
    cb(null, script);
  });
  script.addEventListener('error', function () {
    cb(new Error(`Script load failed for ${script.src}`));
  });
}

loadScript2('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js', function (error, script) {
  if (error) {
    console.log(error);
  } else {
    console.log(_.drop([1, 2, 3], 2) + ' from callback ' + script.src);
  }
});

//>>>>Call Back Hell - when trying to load mulitple scripts
/*
loadScript2('1.js', function (error, script) {
    if (error) {
        handleError(error);
    } else {
        loadScript('2.js', function (error, script) {
            if (error) {
                handleError(error);
            } else {
                loadScript('3.js', function (error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });
            }
        });
    }
});
*/

//>>>>solution using named functions
/*
loadScript('1.js', step1);

function step1(error, script) {
    if (error) {
        handleError(error);
    } else {
        loadScript('2.js', step2);
    }
}

function step2(error, script) {
    if (error) {
        handleError(error);
    } else {
        loadScript('3.js', step3);
    }
}

function step3(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...continue after all scripts are loaded (*)
    }
};
*/

//>>With Promises
//more flexibility with promises
function loadScript3(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    document.body.appendChild(script);
    script.addEventListener('load', function () {
      resolve(script);
    });
    script.addEventListener('error', function () {
      reject(new Error(`Script load failed for ${script.src}`));
    });
  });
}

const myloadPromise = loadScript3('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js');

myloadPromise.then(
  script => console.log(_.drop([1, 2, 3], 2) + ' from promise ' + script.src),
  error => console.log(error)
);

console.log(myloadPromise);

//>>>>Fixing Callback hell with promise chaining
/*
const myloadPromise = loadScript('/article/promise-chaining/one.js');

myloadPromise.then((script) => {
    return loadScript("/article/promise-chaining/two.js");
}).then((script) => {
    return loadScript("/article/promise-chaining/three.js");
}).then((script) => {
    // use functions declared in scripts

    one(); //from script one.js
    two(); //from script two.js
    three(); //from script three.js
});
*/
//*

//*Promises
//Promises are replacement of callback function in asynchronous scenarios and make them easier to write
//A Promise is an object representing the eventual completion or failure of an asynchronous operation.
//Promises are guranteed to be resolved or rejected.
//A resolved promise cannot be rejected and vice versa.

//>>Woking of Promises
/*
The function passed to new Promise is called the executor. When the promise is created, this executor function runs automatically.
It contains the producing code, that should eventually produce a result.

The resulting promise object has internal properties:

1. status — initially “pending”, then changes to either “resolved” or “rejected”,
2. result — an arbitrary value of your choosing, initially undefined.

When the executor finishes the job, it should call one of the functions that it gets as arguments:
resolve(value) — to indicate that the job finished successfully:
    > sets the status to "resolved",
    > sets result to value.
reject(error) — to indicate that an error occurred:
    > sets status to "rejected",
    > sets result to error.

    States :
    > pending - Hasn't resolved or rejected yet
    > resolved - The action relating to the promise succeeded
    > rejected - The action relating to the promise failed
    > settled - Has resolved or rejected
*/

//>>Promises vs Callbacks
//                   Promises                             |                      Callbacks
//--------------------------------------------------------|--------------------------------------------------------------------
//1) Promises allow us to do things in the natural order. |  1) We must have a callback function at our disposal when calling
//   First, we run the function, and with obj we call     |     function. In other words, we must know what to do with
//  .then with which we write what to do with the result. |     the result before function is called.
//2) We can call .then on a Promise as many times as we   |  2) There can be only one callback.
//   want. Each time, we’re adding  a new subscribing     |
//   function, to the “subscription list”.                |

//Promise Creation
//Executor Function
const promise1 = new Promise(function (resolve, reject) {
  resolve('Yes'); //same as callback points to first param in .then() //returns a resolved Promise object
  reject('Nope'); //same as callback points to second param in .then() //returns a rejected Promise object
});

console.log(promise1);

//Promise Consumption
//Handlers
//.then(successcb, failurecb)
//the first success callback runs when the promise is resolved and receives the result of the promise
//the second failure callback runs when the promise has failed and receives an error
promise1.then(
  success => console.log(success + ' ' + promise1), //if resolved succesfully then display
  failure => console.log(failure) //this won't run promise is resolved first
);

//>>.catch()
//.catch() handles promise rejections of all kinds: be it a reject() call, or an error thrown in a handler.
//with .catch(failurecb) ==> same as .then(null, failurecb)
//only single catch is required for entire block
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Whoops!!');
  }, 1000);
});

console.log(promise2);

promise2.catch(failure => console.log(failure));
//or//
promise2.then(null, failure => console.log(failure));

//>>.finally()
//with .finally() - runs irrespective of promise status ==> .then() without parameters used at the end
//use to perform cleanup operation such as stopping loading indicators
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('All Done!!');
  }, 1000);
  setTimeout(() => {
    reject('Woops');
  }, 1000);
});

promise3
  .finally(() => console.log("I'm Final 1"))
  .then(
    success => console.log(success),
    failure => console.log(failure)
  )
  .finally(() => console.log("I'm Final 2"));

//>>immediately resolved promise
//some scenarios don't require any waiting at all
const promise4 = new Promise(resolve => {
  resolve("I'm resolved immediately");
});

promise4.then(success => console.log(success));

//>>converting setTimeout() function from callback based to promise based
//calling resolve without any arguments
function customTimeout(delay) {
  return new Promise(resolve => setTimeout(resolve(), delay));
}

const promise5 = customTimeout(1000);
promise5.then(success => console.log('From Promise based Timeout'));

//>>chaining promises
const promise6 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

//Each handler .then() returns a result of a promise that is passed on to the next .then() in the chain
promise6
  .then(val => {
    console.log(val); //1
    return val + 1;
  })
  .then(val => {
    console.log(val); //2
    return val + 1;
  })
  .then(val => {
    console.log(val); //3
    return val + 1;
  })
  .then(val => {
    console.log(val); //4 //for last one no need to return since there is no next .then() to pass value
  });

//If a promise is returned, then JavaScript waits for it to settle and calls next handlers with its result
const promise7 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promise7
  .then(val => {
    console.log(val); //1
    return val + 1;
  })
  .then(val => {
    console.log(val); //2
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(val + 1);
      }, 1000);
    });
  })
  .then(val => {
    console.log(val); //3 (After delay of +1 sec)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(val + 1);
      }, 1000);
    });
  })
  .then(val => {
    console.log(val); //4 (After delay of +1 sec)
  });

//>>Throwing Errors
const promise11 = new Promise((resolve, reject) => {
  throw new Error("I'm throwed Error");
});

promise11.catch(err => {
  console.log(err);
});
//or//
const promise12 = new Promise((resolve, reject) => {
  reject(new Error("I'm rejected Error"));
});

promise12.catch(err => {
  console.log(err);
});

//throwing from .then()
const promise13 = new Promise((resolve, reject) => {
  resolve('ok');
});

promise13
  .then(res => {
    throw new Error("I'm error from .then()");
  })
  .catch(err => {
    console.log(err);
  });

//rethrowing
//primarily used if the current .catch() can't handle the type of error so it throws it to the next .catch()
const promise14 = new Promise((resolve, reject) => {
  resolve('ok');
});

promise14
  .then(res => {
    return res;
  })
  .then(res => {
    throw new Error('An Error: ');
    return res;
  })
  //this .then() skipped because of error above
  .then(res => {
    console.log('From then ' + res);
  })
  .catch(err => {
    console.log(err + 'foo');
    throw err; //Rethrowing the error which is handled by the next catch()
  })
  .catch(err => {
    console.log(err + 'boo');
  });

//unhandledrejection
//this rethrow throws to the global event handler for promises - 'unhandledrejection' which shows up in the console
const promise15 = new Promise(function () {
  throw new Error("I'm Unhandled Rejection");
}); // no catch to handle the error

window.addEventListener('unhandledrejection', function (event) {
  // the event object has two special properties:
  console.log(event.promise); // [object Promise] - the promise that generated the error
  console.log(event.reason); // the unhandled error object
});

//Semantics of .catch()
/*
the error generating promise or the .then() can break the chain if not caught immediately (i.e error caught at the end)

.then() {
    return resolve;
}.then() {
    return reject;
}.then() {
    //skipped
    return resolve;
}.then() {
    //skipped
    return resolve;
}.catch() {
    //handle error
}
*/
/*
if we provide a catch right after the errored .then() then normal chain flow continues

.then() {
    return resolve;
}.then() {
    return reject;
}.catch() {
    handle above error;
}.then() {
    //not skipped
    return resolve;
}.then() {
    //not skipped
    return resolve;
}.catch() {
    //skipped because error already handled
}
*/
const myPromise1 = new Promise(resolve => {
  resolve('a');
});

myPromise1
  .then(val => {
    console.log(val + ': 1st .then()'); //check
    return val;
  })
  .then(val => {
    console.log(val + ': 2nd .then()'); //check
    //here the chain can break so we handle it seperately using catch so in the next call the chain is restored
    return fetch('/').catch(err => {
      console.log(err + ' - error handled proceed');
    });
  })
  .then(response => {
    console.log(response + ': 3rd .then()'); //check
    return response;
  })
  .then(val => {
    console.log(val + ': 4th .then()'); //check
    console.log(boo); //boo is not defined so catch the error once caught the chain is restored again
    console.log(val + ": I'm also in 4th .then()"); //skipped
    return val;
  })
  .then(val => {
    console.log(val + ': 5th .then()'); //skipped
    return val;
  })
  .catch(err => {
    console.log(err + ' - This error also handled proceed');
  })
  .then(val => {
    console.log(val + ': 6th .then()'); //check
  })
  .catch(err => {
    console.log(err + "I'm not reached since all errors have been handled already");
  });

//>>the 'Thenable' object
//a 'Thenable' object is any object with the method .then()
//.then() may return an arbitrary “Thenable” object, and it will be treated the same way as a promise.
//use: idea is that 3rd-party libraries may implement “promise-compatible” objects of their own.
//They can have extended set of methods, but also be compatible with native promises, because they implement .then()
//This feature allows to integrate custom objects with promise chains without having to inherit from Promise.
class Thenable {
  constructor(num) {
    this.num = num;
  }

  //provide the function definiton for then()
  then(resolve) {
    setTimeout(() => {
      let result = this.num + 1;
      resolve(result);
    }, 1000);
  }
}

const promise8 = new Promise(resolve => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

promise8
  .then(val => {
    console.log(val); //10
    return val + 1;
  })
  .then(val => {
    console.log(val); //11
    return new Thenable(val); //calls the then() method in 'Thenable' automatically and returns the result
  })
  .then(val => {
    console.log(val); //12 (after +1 sec)
  });

//>>Real world example
//note : the promise result will propogate down the chain,
//if result ==> failure then futher propogation stops and it goes the next available catch() handler or then(null, fail) handler
//note :  always make sure to return the result of promise at every step of chain it may be useful for future expansions

//create our own Error class for handling the error
//this is necessary to know what caused the error
class MyHttpError extends Error {
  constructor(response) {
    //displaying the error
    super(`${response.status} for ${response.url}`);
    this.name = 'MyHttpError';
    this.response = response;
  }
}

const asyncParent = document.querySelector('.async');
const asyncBtn1 = document.querySelector('.asyncBtn1');
asyncBtn1.addEventListener('click', gitFetch1);

function gitFetch1() {
  const userName = prompt('Enter User Name', 'FatehAK');
  const promise10 = fetch(`https://api.github.com/users/${userName}`);
  console.log(promise10);

  promise10
    .then(response => {
      document.body.style.opacity = 0.3;
      if (response.status === 200) {
        return response.json();
      } else {
        throw new MyHttpError(response);
      }
    })
    .then(user => {
      console.log(user.login);
      return user;
    })
    //this code will remove the load indication, it will run after the previous then
    .finally(() => {
      return new Promise(resolve => {
        //we add some delay so that we can see it else opacity changes immediately
        setTimeout(() => {
          document.body.style.opacity = '';
          resolve();
        }, 500);
      });
    })
    .then(user => {
      console.log(user.bio);
      //make sure to return the promise if we want it's result(success or failure) to be passed to the next .then() or .catch()
      return new Promise(resolve => {
        //since we are removing the pic after 2 seconds we need to return a Promise
        //the js engine will wait till the promise settles
        const img = document.createElement('img');
        img.setAttribute('src', user.avatar_url);
        asyncParent.appendChild(img);
        //throw new Error('My Error'); //this error makes the promise result as failure which in turn skips other .then() calls and goes directly to .catch() outside
        setTimeout(() => {
          img.remove();
          resolve(user);
        }, 2000);
      });
    })
    .then(user => {
      console.log(user.name + ' picture is removed');
    })
    //a single catch handler to catch error occurence at any point on the chain
    .catch(err => {
      if (err instanceof MyHttpError && err.response.status === 404) {
        alert('No such user. Please renter details...');
        console.log(err);
        gitFetch1();
      }
    });
}
//*

//*Promise API
//>>Promise.resolve()
//Returns a resolved promise with the given value
//use only if the value is immediately available and can be passed
const promise16 = Promise.resolve(100);
//same as
//   |
//   V
// const promise16 = new Promise((resolve) => {
//     resolve(100);
// });

promise16
  .then(val => {
    console.log(val);
    return val + 1;
  })
  .then(val => {
    console.log(val);
  });

//Promise resolving another promise
const promise17 = Promise.resolve(['a', 'b', 'c']);
promise17
  .then(val => {
    return Promise.resolve(val);
  })
  .then(val => {
    console.log(val);
  });
//or//
const promise18 = Promise.resolve(['d', 'e', 'f']);
const promise19 = Promise.resolve(promise18);
promise19.then(arr => {
  console.log(arr);
});

//with 'thenables'
const promise20 = Promise.resolve({
  then: function (resolve) {
    resolve('From thenable');
  },
});

promise20.then(val => {
  console.log(val);
});

//>>Promise.reject()
//Returns a rejected promise with the given error
const promise21 = Promise.reject(new Error('Rejected form New Method'));
//same as
//   |
//   V
// const promise21 = new Promise((resolve, reject) => {
//     reject(new Error('Rejected from New method'));
// });

promise21.catch(err => {
  console.log(err);
});

//>>Promise.all()
//takes an array of promises and returns a new promise.
//The new promise resolves when all listed promises are resolved and has an array of their results else rejected if even one is not resolved.
//if even one promise in the promise list is rejected then the other promises continue to execute, and then eventually settle, but all their results are ignored.

const allPromises1 = Promise.all([
  new Promise(resolve => setTimeout(() => resolve('1000')), 3000),
  new Promise(resolve => setTimeout(() => resolve('2000')), 2000),
  new Promise(resolve => setTimeout(() => resolve('3000')), 1000),
]);
//not possible to use shorthand in this context
//   |
//   V
// const allPromises1 = Promise.all([
//     Promise.resolve(setTimeout(() => '1000'), 3000),
//     Promise.resolve(setTimeout(() => '2000'), 2000),
//     Promise.resolve(setTimeout(() => '3000'), 1000),
// ]);

allPromises1.then(val => {
  //the values are logged in order even the promise 1 occurs with a delay of 3 sec
  //in such a case .all() waits till all of the promises are settled
  console.log(val);
});

//Promise.all() can take any value need not be promise object
const p11 = Promise.resolve(3);
const p22 = 1337;
const p33 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 2000);
});

Promise.all([p11, p22, p33]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});

//the second promise is rejected so entire promise is treated as rejected
const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44), Promise.reject(55)];
const allPromises2 = Promise.all(mixedPromisesArray);

allPromises2
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err + ' Rejected sigh!!'); //44 Rejected sigh!!
  });

//control the fail-fast behavior of Promise.all()
//in this method we treat all promises as resolved even though one has rejected
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'Everything OK in Promise 1');
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'Everything OK in Promise 2');
});
const p3 = new Promise((resolve, reject) => {
  resolve(new Error('Something went wrong in Promise 3!'));
});

Promise.all([p1, p2, p3]).then(values => {
  values.forEach(value => {
    if (value instanceof Error) {
      console.log('ERR: ' + value.message);
    } else {
      console.log(value);
    }
  });
});

//real life example with Promise.all() with abilty to handle invalid urls
const asyncBtn2 = document.querySelector('.asyncBtn2');
asyncBtn2.addEventListener('click', gitFetchAll1);

const urls1 = ['https://api.github.com/users/fatehak', '/', 'http://no-such-url'];

function gitFetchAll1() {
  Promise.all(urls1.map(url => fetch(url).catch(err => err)))
    // if it's an error then pass on
    // otherwise response.json() and catch errors as results
    .then(responses => {
      return responses.map(response => {
        if (response instanceof Error) {
          return response;
        } else {
          return response.json().catch(err => {
            return err;
          });
        }
      });
    })
    .then(results => {
      results.forEach(result => {
        if (result instanceof Error) {
          console.log(result);
        } else {
          console.log(result);
        }
      });
      throw new Error('Dummy Error');
    })
    .catch(err => {
      console.log(err);
    });
}

//>>Promise.race()
//similiar to Promise.all() where we pass an array
//but the difference is it does not wait for all promises to complete instead it takes the result of the first returned promise(i.e. fastest)
//so in the end the result will have only one result from one of the promise in the promise list

//here '3' will win since it has the shortest delay
const racePromise1 = Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 500)),
]);

racePromise1.then(val => {
  console.log(val + ': I won the race!!'); //3 (completes the fastest)
});

//here 1 will win since all have same delay the first promise will win
const racePromise2 = Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 1000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]);

racePromise2.then(val => {
  console.log(val + ': I won the race!!'); //1 (completes the fastest)
});

//same goes for rejection as well
//here 3 is fastest but is customized for rejected so it wins but gets rejected
const racePromise3 = Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(3), 500)),
]);

racePromise3
  .then(val => {
    console.log(val + ': I won the race!!'); //wont execute
  })
  .catch(err => {
    console.log(err + ': I won but I am rejected sigh...'); //3 (fast rejection!!)
  });
//*

//*Promisification
//It’s conversion of a function that accepts a callback into a function that returns a promise.
///a promise may have only one result, but a callback may technically be called many times.
//So promisification is only meant for functions that call the callback once. Further calls will be ignored.

//consider a main function with cb
function hello(times, cb) {
  for (let i = 0; i < times; i++) {
    console.log('Hello');
    cb();
  }
}

//calling without promisification
hello(3, function () {
  console.log('From Callback');
});

//calling with promisification by wrapping the call within a wrapper function
//the wrapper function takes the first arg of the cb and return a new promise
function helloPromise(times) {
  return new Promise(resolve => {
    hello(times, () => resolve(1));
  });
}

const promisified1 = helloPromise(3);

promisified1.then(res => {
  console.log(res + ' From Promise');
});

//for reference
// function loadScript2(src, cb) {
//     const script = document.createElement('script');
//     script.setAttribute('src', src);
//     document.body.appendChild(script);
//     script.addEventListener('load', function () {
//         cb(null, script);
//     });
//     script.addEventListener('error', function () {
//         cb(new Error(`Script load failed for ${script.src}`));
//     });
// }

//our usual call
// loadScript2('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js', function (error, script) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(_.drop([1, 2, 3], 2) + ' from ' + script.src);
//     }
// });

//our promise call
function loadPromise(src) {
  return new Promise((resolve, reject) => {
    loadScript2(src, function (err, script) {
      if (err) {
        reject(err);
      } else {
        resolve(script);
      }
    });
  });
}
const promisified2 = loadPromise('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js');

promisified2
  .then(val => {
    console.log(_.drop([1, 2, 3], 2) + ' from promisified ' + val.src);
  })
  .catch(err => {
    console.log(err);
  });
//*

//*Task queue
//Two types of queues
//1) Microtask queue
//2) Macrotask queue

//All promise actions added to the Microtask queue like .then()/.catch()/.finally()
//All events, network operations (i.e. fetch()), setTimeout() are added to the Macrotask queue

//order of execution: regular code-->code in microtask(promises)-->code in macrotask(events)

setTimeout(() => console.log('timeout')); //(3) macrotask

Promise.resolve().then(() => console.log('promise')); //(2) microtask

console.log('code'); //(1) regular code

//microtask schedules macrotask
Promise.resolve()
  .then(() => {
    setTimeout(() => console.log('timeout'), 0); //(2) will execute only when the microtask queue is empty
  })
  .then(() => {
    console.log('promise'); // (1) microtask
  });
//*

//*Aysnc & Await
//a special syntax to work with promises in a more comfortable fashion

//>>Async
//'async' returns the promise object automatically but still that object needs to be consumed
//'async' function returns are always wrapped up in promises
//important: the code inside async does not execute asynchronously
//to make code asynchronous use the 'await' keyword
//if we don't explicity make async function return a promise then implicitly it will have resolved value of 'undefined'
//if any error occured and we haven't explicitly made our async function return a promise then implicitly it will have the rejected value of 'error occured'

async function aFun1() {
  return 1;
}
aFun1().then(val => {
  console.log(val);
});

//same as
//   |
//   V
async function aFun1() {
  return Promise.resolve(1);
}
aFun1().then(val => {
  console.log(val);
});

//Alternative 1
//   |
//   V
const myPromise2 = new Promise(resolve => {
  resolve(1);
});
myPromise2.then(val => {
  console.log(val);
});

//Alternative 2
//   |
//   V
const myPromise3 = Promise.resolve(1);
myPromise3.then(val => {
  console.log(val);
});

//>>Await
//an 'await' expression pauses the execution of the async function and waits for the passed Promise's resolution,
//and then resumes the async function's execution and returns the resolved value.
//the 'await' keyword works only inside the 'async' function
//so we still need to use .then()/.catch() if we are using the result of the promise outside
async function aFun3() {
  //main use of 'await' is to wait for promise to settle and then auto-consume the value (rather than using .then() seperately later)
  const aVal1 = await new Promise(resolve => {
    setTimeout(() => {
      resolve("I'm Awaited");
    });
  });

  console.log(aVal1);
}

aFun3();

async function aFun2() {
  return await 1;
}

//no use of 'await' if we return last in the 'async' function
const aVal1 = aFun2();
console.log(aVal1);
//use '.then()' to consume the value
aFun2().then(val => {
  console.log(val);
});

//await accepts 'thenables'
async function aFun4() {
  const result = await new Thenable(5);
  console.log('Async/Await Thenable: ' + result); //6
}

aFun4();

//as class method
class MyAsync {
  constructor(num) {
    this.num = num;
  }

  async aFun1() {
    const result = await Promise.resolve(this.num);
    console.log('Async/Await Class: ' + result);
  }
}

const asyncObj = new MyAsync('Hello');
asyncObj.aFun1();

//await auto throws the error which can be handled by standard try..catch statements
async function aFun5() {
  try {
    const response = await fetch('/no-user-here');
  } catch (err) {
    // catches error in fetch()
    console.log('Aysnc/Await Error: ' + err);
  }
}

//if above catch not defined then error are caught by .catch()
//or any undetected error not enclosed in try block could be catched here
aFun5().catch(err => {
  console.log('Caught from .catch() ' + err);
});

//'await' pauses the exection of other code(async or sync) till it settles the current 'awaited' code
async function aFun6() {
  new Promise(resolve => {
    console.log('Not in time'); //code in the Promise constructor is executed synchronously
    resolve();
  });

  await new Promise(resolve => {
    setTimeout(() => {
      //asynchronous because of setTimeout() and blocks the synchronous code below 'In async'
      console.log('In Time 1');
      resolve();
    }, 0);
  });

  //executed last because of being in the macrotask queue
  setTimeout(() => console.log('In Time 2'), 0); //asynchronous code

  await console.log('Foo'); //this also awaited

  //this sync code delayed by await
  console.log('In async'); //synchronous code

  return 'boo'; //resolved 'boo' returned
}

//get the returned promise
const myPromise4 = aFun6();
myPromise4.then(val => {
  console.log(val); //asynchronous code
});
//'await' semantics don't work outside so this get printed second
console.log('In Main'); //synchronous code
//Order of execution
//Not in time
//In Main
//In Time 1
//Foo
//In async
//boo
//In Time 2

//>>problem with 'await'
//The await keyword blocks execution of all the code after it until the promise fulfills, exactly as it would with a synchronous operation.
//This is means that your code could be slowed down by a significant number of awaited promises happening straight after one another.
//Each await will wait for the previous one to finish, whereas actually what you want is for the promises to begin processing simultaneously.

function timeoutPromise(interval) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('done');
    }, interval);
  });
}

//sequential execution - 6 seconds
//time taken = 2 + 2 + 2 = 6 sec
async function timeTest1() {
  await timeoutPromise(2000); //wait for 2 seconds
  await timeoutPromise(2000); //another 2 seconds
  await timeoutPromise(2000); //...another 2 seconds
}

let startTime1 = Date.now();
timeTest1().then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime1;
  console.log('Time taken in milliseconds: Sequential ' + timeTaken);
});

//concurrent execution - 2 seconds
//time taken = time taken by longest promise ~ 2 sec
async function timeTest2() {
  const t1 = timeoutPromise(2000);
  const t2 = timeoutPromise(2000);
  const t3 = timeoutPromise(2000);

  // await t1; //wait for 2 seconds
  // await t2; //by which this would have already been completed
  // await t3; //by which this would have already been completed
  //or//
  let [a, b, c] = await Promise.all([t1, t2, t3]);
  console.log(a + ' ' + b + ' ' + c);
}

let startTime2 = Date.now();
timeTest2().then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime2;
  console.log('Time taken in milliseconds: Concurrent ' + timeTaken);
});

//parallel execution - 4 milliseconds
async function timeTest3() {
  //truly parallel we execute synchronously
  await Promise.all([
    async () => timeoutPromise(2000),
    async () => timeoutPromise(2000),
    async () => timeoutPromise(2000),
  ]);
}

let startTime3 = Date.now();
timeTest3().then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime3;
  console.log('Time taken in milliseconds: Parallel ' + timeTaken);
});

//Normal way with Promises - 2 seconds
//time taken = time taken by longest promise ~ 2 sec
const myPromise5 = Promise.all([timeoutPromise(2000), timeoutPromise(2000), timeoutPromise(2000)]);

let startTime4 = Date.now();
myPromise5.then(() => {
  let finishTime = Date.now();
  let timeTaken = finishTime - startTime4;
  console.log('Time taken in milliseconds: Normal ' + timeTaken);
});

//>>Example useing Async/Await
//gitFetch()
const asyncBtn3 = document.querySelector('.asyncBtn3');
asyncBtn3.addEventListener('click', gitFetch2);

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new MyHttpError(response);
  }
}

async function gitFetch2() {
  const userName = prompt('Enter User Name', 'FatehAK');
  //await waits for the promises then gets the result of the promise and places it in the variable
  let user;
  try {
    user = await loadJson(`https://api.github.com/users/${userName}`);
    console.log(user);
  } catch (err) {
    if (err instanceof MyHttpError1 && err.response.status === 404) {
      alert('No such user. Please reenter the details...');
      console.log(err);
      gitFetch2();
    } else {
      //rethrow the error since we don't know how to handle it
      throw err;
    }
  }
  document.body.style.opacity = 0.3;
  await new Promise(resolve => {
    setTimeout(() => {
      document.body.style.opacity = '';
      resolve();
    }, 500);
  });
  console.log('From Aysnc/Await: ' + user.login);

  const img = document.createElement('img');
  img.setAttribute('src', user.avatar_url);
  asyncParent.appendChild(img);

  //await wait for this promise to settle then goes to the next code
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  img.remove();
  return user;
}

//gitFetchAll()
const urls2 = ['https://api.github.com/users/fatehak', '/', 'http://no-such-url'];

const asyncBtn4 = document.querySelector('.asyncBtn4');
asyncBtn4.addEventListener('click', gitFetchAll2);

async function jsonFetch(urls) {
  const responses = await Promise.all(
    urls.map(url =>
      fetch(url).catch(err => {
        return err;
      })
    )
  );
  return responses.map(response => {
    if (response instanceof Error) {
      return response;
    } else {
      return response.json().catch(err => {
        return err;
      });
    }
  });
}

async function gitFetchAll2() {
  const users = await jsonFetch(urls2);

  users.forEach(user => {
    if (user instanceof Error) {
      console.log(user);
    } else {
      console.log(user);
    }
  });
}
//*
