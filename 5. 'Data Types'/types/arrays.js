//# Array
console.log('=======================Array=======================');
const arr1 = ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi'];

//>>MUTABLE METHODS - modifies original array
//>>push()
//add one or more elements to last and return new length
//modifies array 'in place'
console.log(arr1.push('Orange')); // 6
console.log(arr1); // ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi', 'Orange']

const vegetables = ['parsnip', 'potato'];
const moreVegs = ['celery', 'beetroot'];
// addd items from the second array into the first one
vegetables.push(...moreVegs);
console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']

//>>pop()
//remove last and return removed
console.log(arr1.pop()); // Orange
console.log(arr1); // ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi']

//>>shift()
//remove first element and return removed
console.log(arr1.shift()); // Apple
console.log(arr1); // ['Mango', 'Grapes', 'Berry', 'Litchi']

//>>unshift()
//adds one or more to start and return new length
console.log(arr1.unshift('Pineapple', 'Guava')); // 6
console.log(arr1); // ['Pineapple', 'Guava', 'Mango', 'Grapes', 'Berry', 'Litchi']

//>>reverse()
//reverse elements of array
const newArr1 = arr1.reverse();
console.log(newArr1); // ['Litchi', 'Berry', 'Grapes', 'Mango', 'Guava', 'Pineapple']
//careful reverse the elements in place so original array also modified
console.log(arr1); // ['Litchi', 'Berry', 'Grapes', 'Mango', 'Guava', 'Pineapple']

//>>splice(index, delCount, item)
// index -> index inclusive
//returns the deleted element
//insert element at 2nd position
console.log(arr1.splice(1, 0, 'JackFruit')); // []
console.log(arr1); // ['Litchi', 'JackFruit', 'Berry', 'Grapes', 'Mango', 'Guava', 'Pineapple']
//replace 1st element
console.log(arr1.splice(0, 1, 'Cherry')); // ['Litchi']
console.log(arr1); // ['Cherry', 'JackFruit', 'Berry', 'Grapes', 'Mango', 'Guava', 'Pineapple']
//delete 2 elements from 2nd position
console.log(arr1.splice(2, 2)); // ['Berry', 'Grapes']
console.log(arr1); // ['Cherry', 'JackFruit', 'Mango', 'Guava', 'Pineapple']

//>>sort(compareFun)
//sorting is done in place
//without compare function
// console.log(arr1.sort());
// or - sorting with handling of accented chars
console.log(arr1.sort((a, b) => a.localeCompare(b)));

// with compare function - string array sorting
console.log(
  arr1.sort(function compare(a, b) {
    if (a < b) {
      //push 'b' to back
      return -1;
    }
    if (a > b) {
      //bring 'b' to front
      return 1;
    }
    //a must be equal to b
    return 0;
  })
);

// with compare function - number array sorting
const numArray = [10, 100, 22, 1, 2];
//! issue with normal sorting -> sorting is done based on ASCII chars
console.log(numArray.sort()); // [1, 10, 100, 2, 22]
// a - b (asc); b - a (dsc)
console.log(numArray.sort((a, b) => a - b)); // [1, 2, 10, 22, 100]

//array of objects sorting
const items = [
  { name: 'Edward' },
  { name: 'Sharpe' },
  { name: 'And' },
  { name: 'The' },
  { name: 'Magnetic' },
  { name: 'Zeros' },
];
// sort by name
/*
{name: 'And'},
{name: 'Edward'},
{name: 'Magnetic'},
{name: 'Sharpe'},
{name: 'The'},
{name: 'Zeros'}
*/
console.log(
  items.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); //ignore upper and lowercase
    const nameB = b.name.toUpperCase(); //ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    //names must be equal
    return 0;
  })
);

//>>fill(value, start, end)
// start - inclusive; end - exclusive
// fill with specified value from start to end-1
const fillArray = [1, 2, 3, 4, 5, 6, 7, 8];
fillArray.fill(5, 0, 3);
console.log(fillArray); // [5, 5, 5, 4, 5, 6, 7, 8]

//>>IMMUTABLE METHODS - return a new array
const ar1 = ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi'];
//>>slice(start, end)
// start - inclusive; end - exclusive
//return new array with sliced elements
console.log(ar1.slice(0, 3)); // ['Apple', 'Mango', 'Grapes']
// remove last el
console.log(ar1.slice(0, -1)); // ['Apple', 'Mango', 'Grapes', 'Berry']
console.log(ar1.slice(-1, 3)); // [] (no such index positions) [-1 + arr.len = 4,3)
//original array unmodified
console.log(arr1); // ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi']

//>>join('seperator')
//returns a string
//default seperator is 'comma'
console.log(ar1.join()); // Apple,Mango,Grapes,Berry,Litchi
console.log(ar1.join('--')); // Apple--Mango--Grapes--Berry--Litchi

//>>concat(arr)
//merge two arrays and return new array
const a1 = [1, 2];
const a2 = [3, , 5, 6, 7];
const newArray = a1.concat(a2);
console.log(newArray); // [1, 2, 3, empty, 5, 6, 7]

//>>includes(elem, fromIndex)
//whether array includes the value
console.log(newArray.includes(1)); // true
console.log(newArray.includes(8)); // false
console.log(newArray.includes(1, 1)); // false

//>>every()
//return boolean
//checks if every element passes the condition
function checkEvery(val) {
  return val <= 10;
}

console.log(newArray.every(checkEvery)); // true

//>>some()
//return boolean
//checks if any one element is able to pass the condition
newArray.push(20);

function checkSome(val) {
  return val <= 10;
}
//20 is > 10 but still 'true'
console.log(newArray.some(checkSome)); // true

//>>indexOf('val', fromIndex)
//returns the index of first occurence of passed value
//-1 otherwise
console.log(ar1.indexOf('Mango')); // 1
console.log(ar1.indexOf('Mango', 2)); // -1

//>>lastIndexOf('val', fromBackIndex)
//returns the index of last occurence of passed value
//array is searched backwards
ar1.push('Mango');
console.log(ar1.lastIndexOf('Mango')); // 5

//>>findIndex(cb)
//returns the index of elem that passes a condition, else -1
function myCondition(val) {
  return val === 'Pineapple';
}

console.log(ar1.findIndex(myCondition)); // -1

//>>find(cb)
//return the first elem that passes the condition, else undefined
console.log(ar1.find(myCondition)); // undefined

//>>flat(depth)
//returns a new flattened array
const deepArray = [1, 2, ['a', 'b', [['c', 'd']]], 3];
console.log(deepArray.flat()); // [1, 2, 'a', 'b', [['c', 'd']], 3]
console.log(deepArray.flat(5)); // [1, 2, 'a', 'b', 'c', 'd', 3]

// can also remove holes in array
const holeArray = [1, 2, , , 5];
console.log(holeArray); // [1, 2, empty × 2, 5]
console.log(holeArray.flat()); // [1, 2, 5]

//>>map((val, idx, arr) => {})
//calls a function on each element and returns a new array
const funArray = [1, 5, 7, 3, 8, 20, 10];
console.log(funArray);
const mapArray = funArray.map(function (val, index, arr) {
  return val * 2;
});
console.log(mapArray); // [2, 10, 14, 6, 16, 40, 20]

//>>forEach((val, idx, arr) => {})
//does same as map but does not return an array
//instead returns undefined
const returnForEach = funArray.forEach(function (val, index, arr) {
  console.log(val * 2);
});
console.log(returnForEach); // undefined

//>>filter((val, idx, arr) => {})
//returns a new array that passes condition
const filterArray = funArray.filter(function (val, index, arr) {
  //the callback--> if 'true' value added to array else discarded
  return val < 10;
});
console.log(filterArray); // [1, 5, 7, 3, 8]

//>>reduce((accumulator, currentVal, idx, arr) => {}, initialVal)
//return a reduced array
//takes a reducer function to provide single output value
//where accumulator --> value returned by cb (0 initially but can be supplied)
//where currentVal --> value being considered
// funArray = [1, 5, 7, 3, 8, 20, 10]
// (0, 1)   --> 0  + 1  = 1
// (1, 5)   --> 1  + 5  = 6
// (6, 7)   --> 6  + 7  = 13
// (13, 3)  --> 13 + 3  = 16
// (16, 8)  --> 16 + 8  = 24
// (24, 20) --> 24 + 20 = 44
// (44, 10) --> 44 + 10 = 54
/*
If initial val present
  -> acc = initialVal
  -> then starIndex of iteration = 0
If initial val not present
  -> acc = arr[0]
  -> then startIndex of iteration = 1
*/
const sumOfArray = funArray.reduce(function (acc, cur, index, obj) {
  return acc + cur;
}, 0);
console.log(sumOfArray); // 54

//removing duplicates with reduce()
const myRandomArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
const myOrderedArray = myRandomArray.reduce(function (accumulator, currentValue) {
  //if not in array then push
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);
console.log(myOrderedArray); // ['a', 'b', 'c', 'e', 'd']

//>>reduceRight((accumulator, currentVal, idx, arr) => {}, initialVal)
//reduction starts right to left(from last) rather than left to right(from first)
// funArray = [1, 5, 7, 3, 8, 20, 10]
// (0, 10)  --> 0 + 10  = 10
// (10, 20) --> 10 + 20 = 30
// (30, 8)  --> 30 + 8  = 38
// (38, 3)  --> 38 + 3  = 41
// (41, 7)  --> 41 + 7  = 48
// (48, 5)  --> 48 + 5  = 53
// (53, 1)  --> 53 + 1  = 54

const sumOfArrayRight = funArray.reduce(function (accu, val, index, obj) {
  return accu + val;
});
console.log(sumOfArrayRight); // 54

//>>Array.from(array-like, mapFn)
//generates Array from Array-like objects
//i.e objects with 'length' property
// (or) Iterable objects (Map, Set)
console.log(Array.from('abc')); // ['a', 'b', 'c']
console.log(Array.from('123', val => val * 2)); // [2, 4, 6]
console.log(Array.from({ length: 5 }, (val, idx) => idx * 2)); // [0, 2, 4, 6, 8]

//>>at(idx) -> a getter method for array element at index
// allows to access element at + or - index
// you can't do this in JS -> arr[-1] instead you usually do arr[arr.length - 1], but now with at ->
console.log(['red', 'green', 'blue'].at(-1)); // blue
console.log(['red', 'green', 'blue'].at(0)); // red

//>>flatMap((val) => {})
// returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1
console.log([1, 2, [1]].flatMap(num => (num === 2 ? [2, 2] : num))); // [1, 2, 2, 1]

//>>values()
const iterArray = ['a', 'b', 'c', 'd'];

//returns an Iterable object with values
const iterableObj1 = iterArray.values();
//can explicatly iterate
console.log(iterableObj1.next()); //  { value: 'a', done: false }
//note: the iterable object is able to maintain the state
//i.e if object is iterated once in one place then when iterating from some other place it will start from left out values
//once iteration over done = true else done = false
for (let val of iterableObj1) {
  console.log(val); // b, c, d
}
console.log(iterableObj1.next()); // { value: undefined, done: true }

//>>keys()
//returns an Iteratable object with keys
const iterableObj2 = iterArray.keys();
for (const key of iterableObj2) {
  console.log(key); // 1, 2, 3, 4
}

//>>entries()
const iterableObj3 = iterArray.entries();
console.log(iterableObj3);
for (const entry of iterableObj3) {
  console.log(entry); // [0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']
}
//#
