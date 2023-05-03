//# Immutability Tests
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
//#
