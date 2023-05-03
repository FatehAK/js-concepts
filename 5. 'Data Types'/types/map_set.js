//# Map
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
//#

//# WeakMap
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
//#

//# Set
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
//#

//# WeakSet
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
//#
