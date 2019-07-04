//*this
console.log("======================='this'=======================");

//>>global level
console.log(this);
console.log(globalThis);

let z = this;
console.log(z);

//>>function level
const fun1 = function() {
    return this;
};
console.log(fun1());

const fun2 = () => this;
console.log(fun2());

function myFun1() {
    return this;
}
console.log(myFun1());

function myFun2() {
    'use strict';
    return this;
}

console.log(myFun2());

//>>event level
const myBtn1 = document.querySelector('.myBtn1');
myBtn1.addEventListener('click', function() {
    console.log(this);
}, false);

myBtn1.addEventListener('click', () => {
    console.log(this);
}, false);

//>>object level
const person = {
    firstName: 'John',
    lastName: 'Doe',
    id: 5566,

    fullName() {
        this.myVal1 = 1;
        return this.firstName + ' ' + this.lastName + ' ' + this.myVal2;
    },
    getVal() {
        this.myVal2 = 2;
        return this.myVal1;
    }
};
console.log(person);
console.log(person.getVal());
console.log(person.fullName());
console.log(person.getVal());
console.log(person);
//*

//*call, apply and bind
console.log('=======================call, apply & bind=======================');
//main difference
//call & apply - immediately execute the function
//bind - returns a function for reuse
//idea - just use that method within particular context when called
const person1 = {
    firstName: 'Mary',
    lastName: 'Smith'
};

const person2 = {
    fullName(arg) {
        return this.firstName + ' ' + this.lastName + ' ' + arg;
    }
};

console.log(person2.fullName());
console.log(person2.fullName.call(person1, 'fromCall'));
console.log(person2.fullName.apply(person1, ['fromApply']));

//>>fix 'this' when assigning method to a variable
x = 20;
console.log(x);

const myObj = {
    x: 80,
    getX(arg) {
        return this.x + ' ' + arg;
    }
};

//let myGlobalCopy = myObj.getX;
//returns window object's 'x' value
//console.log(myGlobalCopy());
//let myNewCopy = myGlobalCopy.bind(myObj, ['yo']);
let myNewCopy = myObj.getX.bind(myObj, ['yo']);
//returns the correct value
console.log(myNewCopy());

//>>fix 'this' when borrowing methods
const personObj1 = {
    firstName: 'Jon',
    lastName: 'Kuperman'
};
const personObj2 = {
    say() {
        return 'Hello ' + this.firstName + ' ' + this.lastName;
    }
};

let sayHello = personObj2.say.bind(personObj1);
console.log(sayHello());

//>>fix this inside a closure
//by maing copy or obj or using arrow fn
const bObj = {
    firstName: 'Jason',
    lastName: 'Samson',
    cars: ['Audi', 'BMW', 'Lambo'],
    fullName() {
        //make a copy of the object
        let bObjCopy = this;
        this.cars.forEach(function(car) {
            //in anonymous inner function 'this' refers to window context
            //but in strict mode ~ undefined
            console.log(this);
            console.log(car + ' ' + bObjCopy.firstName + ' ' + bObjCopy.lastName);
        });
    }
};
bObj.fullName();

const cObj = {
    firstName: 'Jason',
    lastName: 'Samson',
    cars: ['Audi', 'BMW', 'Lambo'],
    fullname() {
        //no need to make copy
        this.cars.forEach((car) => {
            //in anonymous arrow inner function 'this' refers to object itself
            console.log(this);
            console.log(car + ' ' + this.firstName + ' ' + this.lastName);
        });
    }
};
cObj.fullname();

//>>borrowing methods with .apply() or .call() or .bind()
let dObj = {
    0: 'Hello',
    1: 'This',
    2: 'is Array like',
    3: 'Object',
    function() {
        return 'Heyo';
    },
    length: 5
};

//Array methods borrowing can be done with other prototype methods as well such as String
let newArray1 = Array.prototype.slice.apply(dObj, [1]);
console.log(newArray1);
console.log(Array.prototype.push.call(dObj, 'abc'));
console.log(dObj);
//using array literal
let newArray2 = [].pop.bind(dObj);
console.log(newArray2());
console.log(dObj);

//>>rest vs arguments object
function aFun1(...myArgs) {
    let myArray1 = Array.prototype.slice.call(arguments, 1);
    console.log(myArray1);
    console.log('args length: ' + arguments.length);
    let myArray2 = myArgs.slice(2);
    console.log(myArray2);
}
aFun1(1, 2, 3, 4, 5);
//*
