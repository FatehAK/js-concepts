//# Numbers - IMMUTABLE METHODS (return new Number)
console.log('=======================Numbers=======================');

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

//>>Number.isFinite(num)
console.log(Number.isFinite(1 / 0)); // false
console.log(Number.isFinite(10 / 5)); // true

//>>Number.isInteger(num)
// checks if a given num is an integer (non-decimal value)
console.log(Number.isInteger(0)); // true
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(-100000)); // true
console.log(Number.isInteger(NaN)); // false
console.log(Number.isInteger('10')); // false
console.log(Number.isInteger(5.0)); // true
console.log(Number.isInteger(5.5)); // false

//>>Number.isNaN(num)
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(102)); // false

//>>Number.parseInt('str', radix) -> returns converted integer
// leading and trailing spaces are removed
// If radix is undefined or 0, it is assumed to be 10 except when the number begins with the code unit pairs 0x or 0X, in which case a radix of 16 is assumed.
console.log(Number.parseInt('   12  ')); // 12
console.log(Number.parseInt('0x12')); // 18
console.log(Number.parseInt('12', 10)); // 12
console.log(Number.parseInt('12', 16)); // 18
console.log(Number.parseInt('12', 8)); // 10

//>>Number.parseFloat('str') -> returns a decimal
console.log(parseFloat('3')); // 3
console.log(parseFloat('3.14')); // 3.14
console.log(parseFloat('  3.14  ')); // 3.14
console.log(parseFloat('3.14some non-digit characters')); // 3.14

//>>toFixed(count)
// formats a number using fixed-point notation
// The number is rounded if necessary, and the fractional part is padded with zeros if necessary so that it has the specified length.
console.log((99.69).toFixed()); // 100
console.log((99.69).toFixed(1)); // 99.7
console.log((99.69).toFixed(4)); // 99.6900

//>>toLocaleString(locale)
// format a number according to a locale, returns a string
console.log((123456.789).toLocaleString()); // 123,456.789
console.log((123456.789).toLocaleString('en-IN')); // 1,23,456.789
console.log((123456.789).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })); // ₹1,23,456.79

//>>>>Math
console.log(Math.PI); // 3.141592653589793

//>>Math.abs(num)
// returns the absolute value (without sign) of a number
// it can coerce the input to number
console.log(Math.abs('-1')); // 1
console.log(Math.abs(-2)); // 2

//>>Math.ceil(num)
// rounds up and returns the smaller integer greater than or equal to a given number
console.log(Math.ceil(0.95)); // 1
console.log(Math.ceil(-0.95)); // -0
console.log(Math.ceil(-0)); // -0
console.log(Math.ceil(0)); // 0
console.log(Math.ceil(4)); // 4

//>>Math.floor(num)
// rounds down and returns the largest integer less than or equal to a given number.
console.log(Math.floor(5.95)); // 5
console.log(Math.floor(5.05)); // 5
console.log(Math.floor(5)); // 5
console.log(Math.floor(-5.05)); // -6

//>>Math.max(...nums)
// returns the largest of the numbers given as input parameters
console.log(Math.max(-1, 2, 3)); // 3
console.log(Math.max(-1, -2, -3)); // -1

//>>Math.min(...nums)
// returns the smallest of the numbers given as input parameters
console.log(Math.min(-1, 2, 3)); // -1
console.log(Math.min(-1, -2, -3)); // -3

//>>Math.pow(num, power)
// returns the value of a num raised to a power
console.log(Math.pow(5, 2)); // 25
console.log(Math.pow(1, 100)); // 1

//>>Math.random()
// returns a floating-point, pseudo-random number that's >= 0 and < 1
console.log(Math.random()); // random num between 0 and 1
console.log(Math.random() * 3); // 0, 1 or 2
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
console.log(getRandomIntInclusive(10, 15)); // 10, 11, 12, 13, 14 or 15

//>>Math.round(num)
// returns the value of a number rounded to the nearest integer
// If the fractional portion of the argument is greater than 0.5, the argument is rounded to the integer with the next higher absolute value. If it is less than 0.5, the argument is rounded to the integer with the lower absolute value. If the fractional portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞
console.log(Math.round(5.95), Math.round(5.5), Math.round(5.05), Math.round(5.49));
// Expected output: 6 6 5 5
console.log(Math.round(-5.05), Math.round(-5.5), Math.round(-5.95));
// Expected output: -5 -5 -6

//>>Math.sign(num)
// retuns 1 for +ve num and -1 for -ve num
console.log(Math.sign(3)); // 1
console.log(Math.sign(-3)); // -1

//>>Math.trunc(num)
// returns the integer part of a number by removing any fractional digits.
console.log(Math.trunc(13.37)); // 13
console.log(Math.trunc(42.84)); // 42
console.log(Math.trunc(0.123)); // 0
console.log(Math.trunc(-0.123)); // -0
