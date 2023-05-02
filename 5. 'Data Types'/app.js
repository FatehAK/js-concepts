//*Array
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
console.log(mapArray);

//>>forEach((val, idx, arr) => {})
//does same as map but does not return an array
//instead returns undefined
const returnForEach = funArray.forEach(function (val, index, arr) {
  console.log(val * 2);
});
console.log(returnForEach);

//>>filter((val, idx, arr) => {})
//returns a new array that passes condition
const filterArray = funArray.filter(function (val, index, arr) {
  //the callback--> if 'true' value added to array else discarded
  return val < 10;
});
console.log(funArray);
console.log(filterArray);

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
//*

//*String - IMMUTABLE METHODS (return new string)
console.log('=======================String=======================');

const sentence = 'A sentence';

//>>charAt(idx)
//returns the actual character at the index
console.log(sentence.charAt(0)); // A
//or// treat it like array
console.log(sentence[0]); // A
// or
console.log(sentence.at(0)); // A
console.log(sentence.at(-4)); // e
//returns the UNICODE representation
console.log(sentence.charCodeAt(0)); // 65

//>>String.fromCharCode(code1, code2...codeN)
// construct string from UTF-16 code units (ascii)
console.log(String.fromCharCode(65, 66, 67)); // ABC

//>>String.raw``
//  used to get the raw string form of template literals — that is, substitutions (e.g. ${foo}) are processed, but escape sequences (e.g. \n) are not.
console.log(String.raw`C:\Development\profile\aboutme.html`);

//>>concat(str1, str2...strN)
//returns a concatenated string
const anotherSentence = ' is given';
console.log(sentence.concat(anotherSentence)); // A sentence is given
//for performance use + operator instead
console.log(sentence + anotherSentence); // A sentence is given

const myar1 = ['hello', ' there'];
console.log('Hi '.concat(...myar1)); // Hi hello there

//>>indexOf(char, fromIndex)
//returns index of passed character - first occurence
const myStr = 'Web is Awesome Awesome';
console.log(myStr.indexOf('Awesome')); // 7

//count number of occurences of letter in string
const str = 'To be, or not to be, that is the question.';
let count = -1;
let pos = str.indexOf('e');

/*
pos = 4
0
pos = 10
1
post = 15
2
pos = -1
3 // result
*/
while (pos !== -1) {
  pos = str.indexOf('e', pos + 1);
  count = count + 1;
}

console.log("Count of 'e': " + count); // 3

//>>lastIndexOf('', fromIndex)
//search in backward direction
//returns index of passed character - last occurence
console.log(myStr.lastIndexOf('Awesome')); // 15

//>>includes('', fromIndex)
//returns true if substring is found in the string
console.log(myStr.includes('Awe')); // true

//>>substring(start, end)
// start -> inclusive
// end -> exclusive
// negative indices clamped to 0
// returns a substring of the string
console.log(myStr.substring(0, 3)); // Web
console.log(myStr.substring(-1)); // Web is Awesome Awesome
console.log(myStr.substring(-4, -1)); // ''

//>>slice(start, end)
// start -> inclusive
// end -> exclusive
// returns a slice of the original string
console.log(myStr.slice(0, 3)); // Web
console.log(myStr.slice(-1)); // e
console.log(myStr.slice(-4, -1)); // som

/*
The substring() method swaps its two arguments if indexStart is greater than indexEnd, meaning that a string is still returned. The slice() method returns an empty string if this is the case.

const text = "Mozilla";
console.log(text.substring(5, 2)); // "zil"
console.log(text.slice(5, 2)); // ""

If either or both of the arguments are negative or NaN, the substring() method treats them as if they were 0.

console.log(text.substring(-5, 2)); // "Mo"
console.log(text.substring(-5, -2)); // ""

slice() also treats NaN arguments as 0, but when it is given negative values it counts backwards from the end of the string to find the indexes.

console.log(text.slice(-5, 2)); // ""
console.log(text.slice(-5, -2)); // "zil"
*/

//>>repeat(count)
//repeats the string specified by the count
//returns a new string
console.log(myStr.repeat(2));

//>>replace('pattern' || regex, 'new pattern' || func)
//replace the pattern in the string for a new pattern
//can replace only one occurence
//returns new string
console.log(myStr.replace(' ', '-')); // Web-is-Awesome-Awesome
//to replace all occurence use regex
// /g means global replace /i means ignore case
console.log(myStr.replace(/awesome/gi, 'Amazing')); // Web is Amazing Amazing

// using capture groups to swap words
console.log('Maria Cruz'.replace(/(\w+)\s(\w+)/, '$2, $1')); // Cruz, Maria

// using a fuction replacer
console.log(
  'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, (match, p1, p2, p3, offset, string) => {
    console.log('## the match,offset: ', match, offset); // abc12345#$*% 0
    // p1 is non-digits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
  })
); // abc - 12345 - #$*%
// all occurrences of capital letters in the string are converted to lower case, and a hyphen is inserted just before the match location.
console.log(
  'borderTop'.replace(/[A-Z]/g, (match, offset) => {
    console.log('## the match,offset: ', match, offset); // T 6
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  })
); // border-top

//>>replaceAll()
// returns a new string with all matches of a pattern replaced by a replacement
console.log('aabbcc'.replaceAll('b', '.')); // 'aa..cc'
// if using regex then make sure to use the /g flag else exception is thrown
console.log('aabbcc'.replaceAll(/b/g, '.')); // 'aa..cc'

//>>search(regexp or '')
//returns the first index of the matched string, else -1
// 'g' flag has no effect on searching
console.log(myStr.search('Awe')); // 7
console.log(myStr.search(/Awe/)); // 7

//>>match(regexp || '')
//returns first match and its position, else null
console.log(myStr.match('A')); // ['A', index: 7, input: 'Web is Awesome Awesome', groups: undefined]
console.log(myStr.match(/[A-Z]/)); // ['W', index: 0, input: 'Web is Awesome Awesome', groups: undefined]

// use with 'g' to get all matches without their position info
console.log(myStr.match(/[A-Z]/g)); // ['W', 'A', 'A']

// improper escaping can cause unintended matches
console.log('123'.match('1.3')); // ['123', index: 0, input: '123', groups: undefined]
// always escpate special chars with double slash
console.log('123'.match('1\\.3')); // null

//>>matchAll(regexp || '')
// returns an iterator with matched strings and their positions
console.log(...myStr.matchAll('A'));
// ['A', index: 7, input: 'Web is Awesome Awesome', groups: undefined]0: "A"groups: undefinedindex: 7input: "Web is Awesome Awesome"length: 1[[Prototype]]: Array(0) ['A', index: 15, input: 'Web is Awesome Awesome', groups: undefined]

const matches = 'table football, foosball'.matchAll(/foo[a-z]*/g);
for (const match of matches) {
  console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
}
// Found football start=6 end=14.
// Found foosball start=16 end=24.

// have to add the 'g' flag in case of regex else exception is thrown
console.log(...myStr.matchAll(/[A-Z]/g));
// ['W', index: 0, input: 'Web is Awesome Awesome', groups: undefined] ['A', index: 7, input: 'Web is Awesome Awesome', groups: undefined] ['A', index: 15, input: 'Web is Awesome Awesome', groups: undefined]

//>>RegExp.test('str')
// returns true if there is a match; false otherwise.
const reg = new RegExp('^hello', 'i');
console.log(reg.test('hello world!')); // true
console.log(/^hello/i.test('ello world!')); // false

// test() called multiple times on the same global regular expression instance will advance past the previous match.
const regex = /[A-Z]/g;
let matched = regex.test('This Is A New Web');
console.log('## regex lastIndex: ', regex.lastIndex); // 1

while (matched) {
  matched = regex.test('This Is A New Web');
  console.log('## regex lastIndex: ', regex.lastIndex); // 6, 9, 11, 15, 0
}
/* Note:
1. If you only care whether the regex matches a string, but not what is actually being matched, use RegExp.prototype.test() instead.

2. If you are finding all occurrences of a global regex and you don't care about information like capturing groups, use String.prototype.match() instead. In addition, String.prototype.matchAll() helps to simplify matching multiple parts of a string (with capture groups) by allowing you to iterate over the matches.

3. If you are executing a match to find its index position in the string, use the String.prototype.search() method instead.
*/

//>>split('char' || regex, limit)
//splits string based on a char and returns an array of values without including separator in the results
console.log(myStr.split(' ')); // ['Web', 'is', 'Awesome', 'Awesome']
console.log(myStr.split(/\s/)); // ['Web', 'is', 'Awesome', 'Awesome']
// limit -> limits the no. of arrays elements created
console.log(myStr.split(' ', 2)); // ['Web', 'is']

console.log('Hello 1 word. Sentence number 2.'.split(/\d/)); // ['Hello ', ' word. Sentence number ', '.']
// If separator is a regular expression that contains capturing parentheses ( ), matched results are included in the array.
console.log('Hello 1 word. Sentence number 2.'.split(/(\d)/)); // ['Hello ', '1', ' word. Sentence number ', '2', '.']

//>>trim()
//removes whitespace characters
const strr = '       Hello       ';
//removes from both front and back
console.log(strr.trim()); // Hello
//only front
console.log(strr.trimStart()); // Hello (spaces)
//only back
console.log(strr.trimEnd()); // (spaces) Hello

//>>toString()
//returns a string representation of the specified object
const strObj = new String('Hello');
console.log(strObj);
console.log(strObj.toString());

//>>str1.localCompare(str2)
//returns +ve if the ref string comes after the compare string
//returns -ve if the ref string comes before the compare string
//for sorting strings
const strr1 = 'Orange';
const strr2 = 'Apple';
console.log(strr1.localeCompare(strr2));

//>>pad
//pads the given string by some values
//padEnd(count, val)
console.log(myStr.padEnd(myStr.length + 5, '.'));
//padStart(count, val)
console.log(myStr.padStart(myStr.length + 5, '.'));

//>>startsWith('str', startIndex)
// start - inclusive
console.log('hello'.startsWith('he')); // true
console.log('hello'.startsWith('He')); // false
console.log('hello world'.startsWith('wor', 6)); // true

//>>endsWith('str', endIndex)
// end - exclusive
console.log('hello'.endsWith('lo')); // true
console.log('hello'.endsWith('Lo')); // false
console.log('hello world'.endsWith('rld', 11)); // true
//*

//*Immutability Tests
console.log('=======================Immutability Tests=======================');
//Immutable by default - Strings, Numbers (modification of copy does not modifiy original)
//Mutable - Arrays, Objects, Map, Set (modification of copy modifies the original)(Only certain methods of Arrays)

//>>Immutability of Strings
//All String methods return a new String
let string1 = 'foo';
console.log(string1);
console.log(string1.repeat(2));
console.log(string1);

//>>Immutability of Numbers
let number1 = 10;

console.log(number1);
console.log(number1.toPrecision(5));
console.log(number1);

//>>Mutability of Arrays
let iArray1 = [1, 2];
let iArray2 = iArray1;

iArray2.push(3, 4, 5); // 1, 2, 3, 4, 5
iArray2.pop(); // 1, 2, 3, 4
iArray2.reverse(); // 4, 3, 2, 1
iArray2.sort(); // 1, 2, 3, 4
iArray2.fill(4, 2, 3); // 1, 2, 4, 4
iArray2.shift(); // 2, 4, 4
iArray2.unshift(0, 1); // 0, 1, 2, 4, 4
iArray2.splice(3, 1, 3); // 0, 1, 2, 3, 4

console.log(iArray1);
console.log(iArray2);

//>>Immutability of Arrays
//A new Array is created so reference to iArray1 is lost
//Array methods which return a new Array are immutable
//such as =, slice(), flat(), map(), filter(), reduce() or the ...(spread operator)
iArray2 = ['a', 'b', 'c', 'd'];
console.log(iArray2);

iArray2 = iArray2.slice(2, 4);
console.log(iArray2);
console.log(iArray1);

//>>Mutability of Objects
let mObj1 = {
  fname: 'Jack',
};

let mObj2 = mObj1;
mObj2.fname = 'Mickey';

console.log(mObj1); //Mickey
console.log(mObj2); //Mickey

//>>Immutability of Objects

//>>>>Shallow Clone
//in shallow clone nested objects are copied by reference
const o1 = {
  a: 1,
  b: 2,
  c: function () {
    return 'Obj Function';
  },
  d: { val: 'foo' },
};
const o2 = { ...o1 };
o2.a = 5;
console.log(o1);
console.log(o2);
//if we modify o2.d.val then o1.d.val also modified because of reference
o2.d.val = 'moo';
console.log(o1);
console.log(o2);
console.log('\n');
//or//
const b1 = {
  a: 1,
  b: 2,
  c: function () {
    return 'Obj Function';
  },
  d: { val: 'foo' },
};
const b2 = Object.assign({}, b1);

b2.a = 10;
console.log(b1);
console.log(b2);

b2.d.val = 'moo';
console.log(b1);
console.log(b2);
console.log('\n');

//>>>>Deep Clone
//in deep clone all values are copied includind nested ones
//JSON method not suitable if object has 'functions'
const n1 = {
  a: 1,
  b: 2,
  c: function () {
    return 'Obj Function';
  },
  d: { val: 'foo' },
};
const n2 = JSON.parse(JSON.stringify(n1));

n2.a = 5;
console.log(n1);
console.log(n2);
//n1.d.val not modified because of deep clone
n2.d.val = 'moo';
console.log(n1);
//note that 'c' is not present
console.log(n2);
console.log('\n');
//or//
//use iteration (preferred)
function copy(src) {
  let target, val, key;
  target = Array.isArray(src) ? [] : {};
  for (key in src) {
    val = src[key];
    target[key] = typeof val === 'object' ? copy(val) : val;
  }
  return target;
}

const d1 = {
  a: 1,
  b: 2,
  c: function () {
    return 'Obj Function';
  },
  d: { val: 'foo' },
};

const d2 = copy(d1);

d2.a = 100;
console.log(d1);
console.log(d2);
//d1.d.val is not modified
d2.d.val = 'moo';
console.log(d1);
console.log(d2);
//*

//*Map
console.log('=======================Map=======================');
//holds key : value pairs

//>>Map vs Object
// map keys can hold any value    | object keys can only be string or symbol
// map keys are inserted in order | object keys not inserted in order
// map is iterable by default     | object is not iterable

//map is primarily used in cases where addition and deletion of keys is done frequently
const myMap = new Map();
let mapVar = 5;
let mapString = "I'm in Map";
let mapObj = {};
let mapFun = function () {};

//>>set(key, value)
//and returns the map
myMap.set(mapVar, 5);
myMap.set(mapString, "I'm in Map");
myMap.set(mapObj, { a: 6, b: 7 });
myMap.set(mapFun, function () {
  return 5;
});

//>>get(key)
console.log(myMap.get(mapVar));
console.log(myMap.get(mapString));
console.log(myMap.get(mapObj));
console.log(myMap.get(mapFun)()); // 5

//>>has(key)
console.log(myMap.has(mapString));

//>>delete(key)
console.log(myMap);
console.log(myMap.delete(mapFun));
console.log(myMap);

const newMap = new Map();
newMap.set('one', 1);
//duplicate key override any existing key
newMap.set('one', 11);
newMap.set('two', 2);
newMap.set('three', 3);
newMap.set('four', 4);
/*
0: {"one" => 11}
1: {"two" => 2}
2: {"three" => 3}
3: {"four" => 4}
*/
console.log(newMap);

//>>using forEach()
newMap.forEach(function (val, key) {
  console.log(key + ': ' + val);
});

//newMap.clear(); //will clear the map()

//>>keys()
//returns iteratator obj with keys
const mapIterator1 = newMap.keys();
for (const key of mapIterator1) {
  console.log(key);
}

//>>values()
//returns iteratator obj with values
const mapIterator2 = newMap.values();
for (const key of mapIterator2) {
  console.log(key);
}

//>>entries()
//returns iteratator obj with [key, value]
const mapIterator3 = newMap.entries();
for (const [key, val] of mapIterator3) {
  console.log(key + ': ' + val);
}

// get the size of the map (same as arr.length)
console.log(newMap.size);

//>>Relation with Arrays
const mpArray = [
  ['key1', 'val1'],
  ['key2', 'val2'],
];
const arrMap = new Map(mpArray);
console.log(arrMap);
/*
0: {"key1" => "val1"}
1: {"key2" => "val2"}
*/
console.log(Array.from(arrMap));
//or//spread operator converts the map into an array
console.log(...new Map(mpArray));

//>>Map Merge
const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

const second = new Map([
  [1, 'uno'],
  [2, 'dos'],
]);

//Merge maps with an array. The last repeated key wins.
const merged = new Map([...first, ...second, [1, 'eins']]);

console.log(merged.get(1)); //eins
console.log(merged.get(2)); //dos
console.log(merged.get(3)); //three
//*

//*WeakMap
console.log('=======================Weak Map=======================');
//The object references in the keys are held weakly, meaning that they are garbage collected if there is no other reference to the object anymore.
//the keys can only be objects
//the keys are not enumerable
//cannot be iterated
//usecase: The idea of WeakMap is that we can store something for an object that should exist only while the object exists.

const wm1 = new WeakMap();
const wm2 = new WeakMap();

const ob1 = {};
const ob2 = function () {};
const ob3 = window;

wm1.set(ob1, 37);
wm1.set(ob2, 'azerty');
wm2.set(ob1, ob2); // a value can be anything, including an object or a function
wm2.set(ob3, undefined);
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

//>>Map vs WeakMap
//For instance, we have code that keeps a visit count for each user. The information is stored in a map:
//a user is the key and the visit count is the value. When a user leaves, we don’t want to store their visit count anymore.
//Map
let john1 = { name: 'John' };
// map: user => visits count
const visitsCountMap1 = new Map();

//john is the key for the map
visitsCountMap1.set(john1, 123);

console.log(visitsCountMap1); //1 obj
//now john leaves us, we don't need him anymore
john1 = null;

//but it's still in the map, we need to clean it!
//john1 will not be gc'd since the map still has a reference to it
console.log(visitsCountMap1); //1 obj
//and john is also in the memory, because Map uses it as the key

//WeakMap
let john2 = { name: 'John' };

const visitsCountMap2 = new WeakMap();

visitsCountMap2.set(john2, 123);

//now john leaves us, we don't need him anymore
console.log(visitsCountMap2);
john2 = null;

//john2 is removed from the map beacuse of weak reference
console.log(visitsCountMap2); //none it's gc'd but value remains
//there are no references except WeakMap,
//so the object is removed both from the memory and from visitsCountMap automatically
//*

//*Set
console.log('=======================Set=======================');
//          Map                  |               Set
//Duplicate keys override existing keys  | Duplicate values/keys not allowed
//Duplicate values allowed    | In set the key is same as value

const mySet = new Set();
const setObj = { a: 1, b: 2 };

//>>add()
mySet.add(20);
mySet.add('Yolo');
mySet.add(setObj);
mySet.add(function () {
  return 'Fun in Set';
});
console.log(mySet); // Set(4) {20, 'Yolo', {…}, ƒ}

//>>has()
console.log(mySet.has('Yolo')); //true
console.log(mySet.has({})); //false
console.log(mySet.has({ a: 1, b: 2 })); //false
console.log(mySet.has(setObj)); //true
console.log(mySet.size); // 4

//>>delete()
mySet.delete(20);
console.log(mySet);

//>>forEach()
//duplicates removed
const newSet = new Set([1, 2, 2, 3, 4]);
console.log(newSet);
newSet.forEach(function (val1, val2) {
  console.log(val1 + ': ' + val2);
});
console.log(newSet[1]);

//>>keys()
//returns iteratator obj with keys
const setIterator1 = newSet.keys();
console.log(setIterator1.next().value);
console.log(setIterator1);
for (const key of setIterator1) {
  console.log(key);
}
console.log(setIterator1.next().value);

//>>values()
//returns iteratator obj with values
const setIterator2 = newSet.values();
for (const key of setIterator2) {
  console.log(key);
}

//>>entries()
//returns iteratator obj with [key, value]
const setIterator3 = newSet.entries();
for (const [key, val] of setIterator3) {
  console.log(key + ': ' + val);
}

//>>Relation with arrays
//removes duplicates
const myNum = [1, 2, 2, 3, 3, 4, 5];
const arrSet = new Set(myNum);
console.log(arrSet);
//or//
console.log(...new Set(myNum));

//>>Relation with strings
//removes duplicate 'n'
const myString = 'Jacksonn';
const strSet = new Set(myString);
console.log(strSet);
//or//
console.log(...new Set(myString));
//*

//*WeakSet
console.log('=======================Weak Set=======================');
//The object references in the keys are held weakly, meaning that they are garbage collected
//if there is no other reference to the object anymore.
//the keys can only be objects
//cannot be iterated
//the keys are not enumerable

const ws1 = new WeakSet();
const ws2 = new WeakSet();

const ob4 = {};
const ob5 = window;

ws1.add(ob4);
ws2.add(ob5);

//>>Set vs WeakSet
//Set
let jack1 = { name: 'Jack' };
const jackSet1 = new Set();

jackSet1.add(jack1);
console.log(jackSet1); //1 obj

jack1 = null;
console.log(jackSet1); //1 obj (object not gc'd)

//WeakSet
let jackObj = { name: 'Jack' };
const jackSet2 = new WeakSet();

jackSet2.add(jackObj);
console.log(jackSet2);

jackObj = null;
console.log(jackSet2); //none it's gc'd

//>>use case
//for class branding
//restrict objects to the class type
const foos = new WeakSet();
class Foo {
  constructor() {
    foos.add(this);
  }
  method() {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method called on incompatible object!');
    }
  }
}
//*

//*Spread
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
//*

//*Rest
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
//*

//*Destructuring
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
//*
