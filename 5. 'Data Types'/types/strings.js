//# Strings - IMMUTABLE METHODS (return new string)
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
//#
