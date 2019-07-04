//no need since by default modules are in 'strict' mode
// "use strict";

//Modules have a lexical top-level scope. This means that for example, running var foo = 42; within a module does not create a global variable named foo, accessible through window.foo in a browser, although that would be the case in a classic script
import { anotherFun } from './appmod2.js';

export const myVal = 10;

export function myFun() {
    return 'From export Module';
}
//or//
//export{myVal, myFun};

console.log(anotherFun());

//default export can only be one function or class within the entire module
//default export cannot be var, let, const
export default function defFun() {
    return 'I\'m default export';
}

//exporting function from another module
export { mod as redirectMod } from './appmod2.js';
