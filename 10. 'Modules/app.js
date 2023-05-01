/* eslint-disable no-duplicate-imports */
//deferred execution
'use strict';

//imports everything
import * as myModule from './modules/appmod1.js';
//or//
//import { myVal, myFun } from './modules/appmod.js';
//or//
//import {myVal as v, myFun as fun} from './modules/appmod.js';

//default imports can have any name
import defImp from './modules/appmod1.js';
//from redirected module
import { redirectMod } from './modules/appmod1.js';

console.log(myModule.myVal);
console.log(myModule.myFun());
console.log(defImp());
console.log(redirectMod());

//dynamic import
const btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
  import('./modules/appmod2.js')
    .then(module => {
      console.log(module.dyna());
    })
    .catch(err => {
      console.log(err);
    });
});
