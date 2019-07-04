//*Array
console.log('=======================Array=======================');
const arr1 = ['Apple', 'Mango', 'Grapes', 'Berry', 'Litchi'];

//>>MUTABLE METHODS - modifies original array
//>>push()
//add one or more to last and return new length
//modifies array 'in place'
console.log(arr1.push('Orange'));
console.log(arr1);

const vegetables = ['parsnip', 'potato'];
const moreVegs = ['celery', 'beetroot'];
// Merge the second array into the first one
vegetables.push(...moreVegs);
console.log(vegetables);

//>>pop()
//remove last and return removed
console.log(arr1.pop());
console.log(arr1);

//>>shift()
//remove first element and return removed
console.log(arr1.shift());
console.log(arr1);

//>>unshift()
//adds one or more to start and return new length
console.log(arr1.unshift('Pineapple', 'Guava'));
console.log(arr1);

//>>reverse()
//reverse elements of array
const newArr1 = arr1.reverse();
console.log(newArr1);
//careful reverse the elements in place so original array also modified
console.log(arr1);

//>>splice(index, delCount, item)
//returns the deleted element
//insert element at 2nd position
console.log(arr1.splice(1, 0, 'JackFruit'));
console.log(arr1);
//replace 1st element
console.log(arr1.splice(0, 1, 'Cherry'));
console.log(arr1);
//delete 2 elements from 2nd position
console.log(arr1.splice(2, 2));
console.log(arr1);

//>>sort(compareFun)
//sorting is done in place
//without compare function
console.log(arr1.sort());

//with compare function - string array sorting
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

//with compare function - number array sorting
const numArray = [10, 7, 22, 1, 2];
console.log(
    numArray.sort(function(a, b) {
        return a - b;
    })
);

//array of objects sorting
const items = [{ name: 'Edward' }, { name: 'Sharpe' }, { name: 'And' }, { name: 'The' }, { name: 'Magnetic' }, { name: 'Zeros' }];
// sort by name
console.log(
    items.sort(function(a, b) {
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
//fill with specified value from start to end-1
const fillArray = [1, 2, 3, 4, 5, 6, 7, 8];
fillArray.fill(5, 3, 5);
console.log(fillArray);

//>>IMMUTABLE METHODS - return a new array
//>>slice(start, end)
//return new array with sliced elements
//from position 1 to position 2 (end item not counted)
const sliced = arr1.slice(1, 3);
console.log(sliced);
//original array unmodified
console.log(arr1);

//>>join('seperator')
//returns a string
//default seperator is 'comma'
const str1 = arr1.join();
console.log(str1);
const str2 = arr1.join('--');
console.log(str2);

//>>concat()
//merge two arrays and return new array
const a1 = [1, 2];
const a2 = [3, , 5, 6, 7];
const newArray = a1.concat(a2);
console.log(a1);
console.log(a2);
console.log(newArray);

//>>includes()
//whether array includes the value
console.log(newArray.includes(1));
console.log(newArray.includes(8));

//>>every()
//return boolean
//checks if every element passes the condition
function checkEvery(val) {
    return val <= 10;
}

console.log(newArray.every(checkEvery));

//>>some()
//return boolean
//checks if any one element is able to pass the condition
newArray.push(20);

function checkSome(val) {
    return val <= 10;
}
//20 is > 10 but still 'true'
console.log(newArray.some(checkSome));

//>>indexOf('val', fromIndex)
//returns the index of first occurence of passed value
//-1 otherwise
console.log(arr1);
console.log(arr1.indexOf('Mango', 2));
arr1.push('Mango');
console.log(arr1);

//>>lastIndexOf('val', fromBackIndex)
//returns the index of last occurence of passed value
//array is searched backwards
console.log(arr1.lastIndexOf('Mango'));

//>>findIndex()
//returns the index of elem that passes a condition

function myCondition(val) {
    return val === 'Pineapple';
}

console.log(arr1.findIndex(myCondition));

//>>find()
//return the first elem that passes the condition
console.log(arr1.find(myCondition));

//>>flat()
//returns a new flattened array
const deepArray = [1, 2, ['a', 'b'], 3];
console.log(deepArray);
const flatArray = deepArray.flat();
console.log(flatArray);

//can also fill holes in array
const holeArray = [1, 2, , , 5];
console.log(holeArray);
const noHoles = holeArray.flat();
console.log(noHoles);

//>>map()
//calls a function on each element and returns a new array
const funArray = [1, 5, 7, 3, 8, 20, 10];
console.log(funArray);
const mapArray = funArray.map(function(val, index, obj) {
    return val * 2;
});
console.log(mapArray);

//>>forEach()
//does same as map but does not return an array
//instead returns undefined
const returnForEach = funArray.forEach(function(val, index, obj) {
    console.log(val * 2);
});
console.log(returnForEach);

//>>filter()
//returns a new array that passes condition
const filterArray = funArray.filter(function(val) {
    //the callback--> if 'true' value added to array else discarded
    return val < 10;
});
console.log(funArray);
console.log(filterArray);

//>>reduce(accumulator, currentVal)
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
const sumOfArray = funArray.reduce(function(accu, val, index, obj) {
    return accu + val;
});
console.log(funArray);
console.log(sumOfArray);

//removing duplicates with reduce()
const myRandomArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
// []
// ['a']
// ['a', 'b']
// ['a', 'b']
// ['a', 'b']
// ['a', 'b', 'c']
// ['a', 'b', 'c', 'e']
// ['a', 'b', 'c', 'e']
// ['a', 'b', 'c', 'e']
// ['a', 'b', 'c', 'e', 'd']
// ['a', 'b', 'c', 'e', 'd']
// ['a', 'b', 'c', 'e', 'd']
// ['a', 'b', 'c', 'e', 'd']
const myOrderedArray = myRandomArray.reduce(function(accumulator, currentValue) {
    //if not in array then push
    if (accumulator.indexOf(currentValue) === -1) {
        accumulator.push(currentValue);
    }
    return accumulator;
}, []);

console.log(myOrderedArray);

//>>reduceRight(accumulator, currentVal)
//reduction starts right to left(from last) rather than left to right(from first)
// funArray = [1, 5, 7, 3, 8, 20, 10]
// (0, 10)  --> 0 + 10  = 10
// (10, 20) --> 10 + 20 = 30
// (30, 8)  --> 30 + 8  = 38
// (38, 3)  --> 38 + 3  = 41
// (41, 7)  --> 41 + 7  = 48
// (48, 5)  --> 48 + 5  = 53
// (53, 1)  --> 53 + 1  = 54

const sumOfArrayRight = funArray.reduce(function(accu, val, index, obj) {
    return accu + val;
});
console.log(funArray);
console.log(sumOfArrayRight);

//>>Array.from(array-like, mapFn)
//generates Array from Array-like objects
//i.e objects with 'length' property
// (or) Iterable objects (Map, Set)
let myString1 = 'abc';
console.log(Array.from(myString1));

let myString2 = '123';
console.log(Array.from(myString2, function(val) {
    return val * 2;
}));

//>>values()
const iterArray = ['a', 'b', 'c', 'd'];

//returns an Iterable object with values
const iterableObj1 = iterArray.values();
//can explicatly iterate
console.log(iterableObj1.next()); //a
//note: the iterable object is able to maintain the state
//i.e if object is iterated once in one place then when iterating from some other place it will start from left out values
//once iteration over done = true else done = false
console.log(iterableObj1);
for (let val of iterableObj1) {
    console.log(val); // b, c, d
}
console.log(iterableObj1.next());

//>>keys()
//returns an Iteratable object with keys
const iterableObj2 = iterArray.keys();
console.log(iterableObj2);
for (const key of iterableObj2) {
    console.log(key);
}

//>>entries
const iterableObj3 = iterArray.entries();
console.log(iterableObj3);
for (const entry of iterableObj3) {
    console.log(entry);
}
//*

//*String - IMMUTABLE METHODS (return new string)
console.log('=======================String=======================');

const sentence = 'A sentence';

//>>charAt()
//returns the actual character at the index
console.log(sentence.charAt(0));
//or// treat it like array
console.log(sentence[0]);
//returns the UNICODE representation
console.log(sentence.charCodeAt(0));

//>>concat()
//returns a concatenated string
const anotherSentence = ' is given';
console.log(sentence.concat(anotherSentence));
//for performance use + operator instead
console.log(sentence + anotherSentence);

const myar1 = ['hello', ' there'];
const sr = 'Hi '.concat(...myar1);
console.log(sr);

//>>indexOf('', fromIndex)
//returns index of passed character - first occurence
const myStr = 'Web is Awesome Awesome';
console.log(myStr);
console.log(myStr.indexOf('Awesome'));

//count number of occurences of letter in string
const str = 'To be, or not to be, that is the question.';
let count = -1;
let position = str.indexOf('e');

while (position !== -1) {
    position = str.indexOf('e', position + 1);
    count++;
}
console.log("Count of 'e': " + count);

//>>lastIndexOf('', fromIndex)
//search in backward direction
//returns index of passed character - last occurence
console.log(myStr.lastIndexOf('Awesome'));

//>>includes('')
//returns true if substring is found in the string
console.log(myStr.includes('Awe'));

//>>repeat(count)
//repeats the string specified by the count
//returns a new string
console.log(myStr.repeat(2));

//>>replace('pattern', 'new pattern')
//replace the pattern in the string for a new pattern
//can replace only one occurence
//returns new string
console.log(myStr.replace(' ', '-'));
//to replace all occurence use regex
// /g means global replace /i means ignore case
const re = / /gi;
console.log(myStr.replace(re, '-'));

//>>search(regexp or '')
//returns the index of the matched string
const reg1 = /[A-Z]/g;
console.log(myStr.search(reg1));

//>>match(regexp)
//returns an array of matched strings
const reg2 = /[A-Z]/g;
console.log(myStr.match(reg2));

//>>slice(startIndex, endIndex)
//returns a portion of the original string
console.log(myStr.slice(7, 14));

//>>split('seperator')
//splits string based on a seperator and returns an array of values
console.log(myStr.split(' '));

//>>trim()
//removes whitespace characters
const strr = '       Hello       ';
console.log(strr);
//removes from both front and back
console.log(strr.trim());
//only front
console.log(strr.trimStart());
//only back
console.log(strr.trimEnd());

//>>toString()
//returns a string representation of the specified object
const strObj = new String('Hello');
console.log(strObj);
console.log(strObj.toString());

//>>localCompare()
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
    fname: 'Jack'
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
    c: function() {
        return 'Obj Function';
    },
    d: { val: 'foo' }
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
    c: function() {
        return 'Obj Function';
    },
    d: { val: 'foo' }
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
    c: function() {
        return 'Obj Function';
    },
    d: { val: 'foo' }
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
    c: function() {
        return 'Obj Function';
    },
    d: { val: 'foo' }
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
let mapFun = function() { };

//>>set(key, value)
//and returns the map
myMap.set(mapVar, 5);
myMap.set(mapString, "I'm in Map");
myMap.set(mapObj, { a: 6, b: 7 });
myMap.set(mapFun, function() {
    return 5;
});

//>>get(key)
console.log(myMap.get(mapVar));
console.log(myMap.get(mapString));
console.log(myMap.get(mapObj));
console.log(myMap.get(mapFun)());

//>>has(key)
console.log(myMap.has(mapString));

//>>delete(key)
console.log(myMap);
console.log(myMap.delete(mapFun));
console.log(myMap);

const newMap = new Map();
newMap.set('one', 1);
//duplicate keys not allowed
newMap.set('one', 1);
newMap.set('two', 2);
newMap.set('three', 3);
newMap.set('four', 4);
console.log(newMap);

//>>using forEach()
newMap.forEach(function(val, key) {
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

console.log(newMap.size);

//>>Relation with Arrays
const mpArray = [['key1', 'val1'], ['key2', 'val2']];
const arrMap = new Map(mpArray);
console.log(arrMap);
console.log(Array.from(arrMap));
//or//spread operator converts the map into an array
console.log(...new Map(mpArray));

//>>Map Merge
const first = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

const second = new Map([[1, 'uno'], [2, 'dos']]);

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
const ob2 = function() { };
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

//now john leaves us, we don't need him anymore
console.log(visitsCountMap1); //1 obj
john1 = null;

//but it's still in the map, we need to clean it!
//john1 will not be gc'd since the map still has a refernce to it
console.log(visitsCountMap1); //1 obj
//and john is also in the memory, because Map uses it as the key

//WeakMap
let john2 = { name: 'John' };

const visitsCountMap2 = new WeakMap();

visitsCountMap2.set(john2, 123);

//now john leaves us, we don't need him anymore
console.log(visitsCountMap2); //none it's gc'd but value remains
john2 = null;

//john2 is removed from the map beacuse of weak reference
console.log(visitsCountMap2); //none it's gc'd but value remains
//there are no references except WeakMap,
//so the object is removed both from the memory and from visitsCountMap automatically
//*

//*Set
console.log('=======================Set=======================');
//          Map                  |               Set
//Duplicate keys not allowed but | Duplicate values/keys not allowed
//duplicate values allowed       | In set the key is same as value

const mySet = new Set();
const setObj = { a: 1, b: 2 };

//>>add()
mySet.add(20);
mySet.add('Yolo');
mySet.add(setObj);
mySet.add(function() {
    return 'Fun in Set';
});
console.log(mySet);

//>>has()
console.log(mySet.has('Yolo')); //true
console.log(mySet.has({})); //false
console.log(mySet.has({ a: 1, b: 2 })); //false
console.log(mySet.has(setObj)); //true

console.log(mySet.size);

//>>delete()
mySet.delete(20);
console.log(mySet);

//>>forEach()
//duplicates removed
const newSet = new Set([1, 2, 2, 3, 4]);
console.log(newSet);
newSet.forEach(function(val1, val2) {
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
console.log(jackSet1); //1 obj

//WeakSet
let jack2 = { name: 'Jack' };
const jackSet2 = new WeakSet();

jackSet2.add(jack2);
console.log(jackSet2); //none it's gc'd

jack2 = null;
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
const ar1 = [1, 2, 3, 4];
const ar2 = [5, 6];
const full = [...ar1, ...ar2];
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
console.log(m1);
console.log(m2);
console.log(m3);

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
        val: 'zoo'
    }
};

funDes2(desObj3);

//with nested objects
const desObj4 = {
    h1: 1,
    h2: 2,
    h3: {
        value: 'foo'
    }
};

let { h1, h2, h3: { value } } = desObj4;

console.log(h1);
console.log(h2);
console.log(value);

//in iteration
const people = [
    {
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith'
        }
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Nora Jones',
            father: 'Richard Jones'
        }
    }
];

for (const { name: n, family: { father: f } } of people) {
    console.log(n + ' ' + f);
}

//with spread
const desObj5 = { r1: 1, r2: 2, r3: 3, r4: 4, r5: 5 };
const { r1, r2, ...all } = desObj5;
console.log(r1);
console.log(r2);
console.log(all);

//array object destructuring
const props = [{ id: 1, name: 'Fizz' }, { id: 2, name: 'Buzz' }, { id: 3, name: 'FizzBuzz' }];

const [, , { name }] = props;

console.log(name); //"FizzBuzz"
//*
