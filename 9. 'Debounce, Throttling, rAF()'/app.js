/* eslint-disable prefer-reflect */
/* eslint-disable newline-before-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
/* eslint-disable no-implicit-coercion */
/* eslint-disable init-declarations */
/* eslint-disable object-curly-spacing */
/* eslint-disable array-element-newline */
/* eslint-disable no-undef */

'use strict';

//# Debouncing
//allows us to group multiple sequential calls to a single call
//Grouping a sudden burst of events (like keystrokes or scrolls) into a single one.
//gives a layer of control between the event and the execution of the function
//since we can't control how often dom events are going to be emitted and can vary
//types - Trailing debounce ~ waits until all calls have been made and then wait for the period of time passed in params (lodash)
//      - Leading debounce : triggers immediately at the start rather than waiting
//if gap period between calls < debounce period (i.e the param) then same debounce continues
//if gap period between calls > debounce period (i.e. the param) then a new debounce is initiated

//_.debounce(func, wait, {options}) - loadash implementation
//Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
//The func is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last func invocation.
//eg.For debouncing, let’s consider the auto save feature. Auto save tries to save the state of the application every time the user makes an update or interacts.
//We can debounce the save until a user hasn’t made any updates or interacted for a set period of time.That way we don’t spam the save function and make unnecessary saves.
//>>resize
//avoid adding expensive functions to resize and scroll events just debounce them
//since the user only cares for the value of the last result anyway
window.addEventListener('resize', function () {
  console.log('Simple - Resize');
});

//trailing debounce
window.addEventListener(
  'resize',
  _.debounce(function () {
    console.log('Debounce - Resize - Trailing');
  }, 300)
);

//leading debounce
window.addEventListener(
  'resize',
  _.debounce(
    function () {
      console.log('Debounce - Resize - Leading');
    },
    300,
    { leading: true }
  )
);

//>>scroll
window.addEventListener('scroll', function () {
  console.log('Simple - Scroll');
});

window.addEventListener(
  'scroll',
  _.debounce(function () {
    console.log('Debounce - Scroll');
  }, 300)
);

//>>forms
//can be used to make ajax requests once the user has finished typing
const debounceInput = document.querySelector('.debounce-input');

debounceInput.addEventListener('keyup', function (evt) {
  console.log('Simple - Input :' + evt.target.value);
});

debounceInput.addEventListener(
  'keyup',
  _.debounce(function (evt) {
    //make ajax request here
    console.log('Debounce - Input :' + evt.target.value);
  }, 1300)
);

//>>buttons
//avoid accidental clicking
//register only one click even though many clicks are made
const dbutton = document.querySelector('.dbutton');
dbutton.addEventListener(
  'click',
  _.debounce(function () {
    console.log('Debounce - Clicked');
  }, 500)
);

//>>custom debouncer
//simple debouncing function
function simpleDebounce(fun, wait) {
  let timeout;
  return function (...args) {
    clearInterval(timeout);
    timeout = setTimeout(() => fun.apply(this, args), wait);
  };
}

//debouncing function with leading mode
function customDebounce(fun, wait = 1, immediate = false) {
  //closure trick so that this value can be used in inner fun
  let timeout;
  return function (...args) {
    //If immediate is true and not already in a timeout then the answer is: Yes
    let callNow = immediate && !timeout;
    //clear the timer on each call to the function (i.e. on each firing of event)
    clearInterval(timeout);
    //start the timer if no more calls are being made then call the debounced function after wait period
    //if any call is made before wait period is over then clear the timer again and the cycle repeats
    timeout = setTimeout(() => {
      //set timeout to null so that next execution works when in 'immediate' mode
      //this value is set only after the wait time is over and not interrupted
      timeout = null;
      //check if immediate is false
      if (!immediate) {
        //calling our original function
        fun.apply(this, args);
      }
    }, wait);

    //if immediate is true and timer is over call
    if (callNow) {
      //calling our original function
      fun.apply(this, args);
    }
  };
}

// window.addEventListener('scroll', customDebounce(function() {
//     console.log('Custom Debounce - Scroll');
// }, 2000, true));

//# Throttling
//allows us to control the execution of the function by making it execute at particual intervals
//eg. in an infinite scrolling app like twitter check every 200ms the scroll position and if the user is near the bottom load more content
//>>scroll
window.addEventListener(
  'scroll',
  _.throttle(function () {
    //throttle every 2s on scrolling
    console.log('Throttling - foo');
  }, 2000)
);

const tContainer = document.querySelector('.throttle');

//this function is called every 2 seconds while scrolling
//i.e we check every 2 seconds whether the user has reached the bottom or not
tContainer.addEventListener(
  'scroll',
  _.throttle(function () {
    console.log('called');
    if (tContainer.clientHeight + tContainer.scrollTop >= tContainer.scrollHeight - 10) {
      console.log('adding items');
      const itemsDup = document.querySelector('.items').cloneNode(true);
      tContainer.appendChild(itemsDup);
    }
  }, 1000)
);

//Throttling a button click so we can’t spam click
//eg.We have a button in our app that when clicked, makes an API call of some kind. Let’s say to enter a competition.
//With throttling we can restrict the amount the API would get hit.The user may be clicking 20 times a second but we only fire the handler once per second.
//>>button
//called every 1 sec while click event is firing
const tbutton = document.querySelector('.tbutton');
tbutton.addEventListener(
  'click',
  _.throttle(function () {
    console.log('Throttle - Clicked');
  }, 1000)
);

//>>custom throttle
function customThrottle(fn, limit) {
  let waiting = false;
  return function (...args) {
    //if waiting is false then call the function
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      //set waiting to 'false' after limit time elapsed
      //the timeout runs and only when its over call the fn again
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
    //if waiting is 'true' then do nothing
  };
}

// window.addEventListener('scroll', customThrottle(function() {
//     console.log('Custom Throttle - Scroll');
// }, 2000));

//# requestAnimationFrame()
//native to the browser
//alternative for throttling primarily used for animating stuff
//runs every 16ms
//use it for everything that needs recalculation of element positions
let request;

const animateContainer = document.querySelector('.animate');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const obj = document.querySelector('.obj');

function animate() {
  request = requestAnimationFrame(animate);
  let dupObj = obj.cloneNode();
  animateContainer.appendChild(dupObj);
}

function stopAnimate() {
  cancelAnimationFrame(request);
}

start.addEventListener('click', animate);
stop.addEventListener('click', stopAnimate);
