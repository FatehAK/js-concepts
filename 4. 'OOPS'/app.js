//*Objects
console.log('=======================Object=======================');
//>>object getters and setters
const eObj = {
    values: ['a', 'b', 'c'],
    get gVal() {
        return this.values[0];
    },
    set sVal(val) {
        this.values[3] = val;
    }
};

console.log(eObj.gVal);
eObj.sVal = 'Yo';
console.log(eObj);
console.log('eObj:', eObj);

//>>object creation using Object() constructor
const pObj = new Object({
    name: 'Chris',
    age: 38
});

const e1 = { a: 1, b: 2 };
//create a object and adds the passed object properties as the object's prototype
const e2 = Object.create(e1);
Object.defineProperties(e2, {
    //by default enumerable --> false (only in case of deifneProperties)
    //means that key won't appear in for loops
    foo: {
        value: 5 //own non enumerable property
    },
    bar: {
        value: 3,
        enumerable: true //own enumerable propery
    }
});
e2.c = 5;
console.log(e2);
const iterObj = Object.keys(e2);
for (const key of iterObj) {
    console.log(key); // bar, c
}
console.log(e2.hasOwnProperty('foo')); //true
console.log(e2.hasOwnProperty('a')); //false - prototype property
console.log(e2.hasOwnProperty('b')); //false - prototype property

//>>Object creation using another object (added to prototype)
const fObj = {
    firstName: 'Joyce',
    lastName: 'Jameson',
    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
};

const newObj = Object.create(fObj);
newObj.firstName = 'Jamie';
console.log(newObj.fullName());
console.log(newObj);

//>>Object assignment
//source object overrides contents of the target
const source = {
    b: 4,
    c: 5
};

//here target is mutated
const target = {
    a: 1,
    b: 2
};

const returnedTarget = Object.assign(target, source);

console.log(source);
console.log(target);
console.log(returnedTarget);

//>>modify or add property/properties
const gObj = {
    firstName: 'Jon',
    lastName: 'Jones'
};

console.log(gObj);
Object.defineProperty(gObj, 'middleName', {
    value: 'Jolly',
    enumerable: true
});
console.log(gObj);
Object.defineProperties(gObj, {
    finalName: {
        value: 'Jameson',
        enumerable: true
    },
    getName: {
        value: function() {
            return this.firstName + ' ' + this.middleName + ' ' + this.lastName + ' ' + this.finalName;
        }
    }
});
console.log(gObj);
console.log(gObj.getName());
console.log(Object.keys(gObj));
console.log(Object.values(gObj));
//*

//*OOPS
console.log('=======================OOPS=======================');
/**
 * 1. When a function is created in JavaScript, JavaScript engine adds a prototype property to the function.
 * 2. This prototype property is an object (called as prototype object) which has a constructor property by default.
 * 3. We can access the function’s prototype property using the syntax functionName.prototype.
 * 4. When an object is created in JavaScript, JavaScript engine adds a __proto__ property to the newly created object which is called as dunder proto.
 * 5. The dunder proto or __proto__ points to the prototype object of the constructor function.
 * 6. Prototype object of the constructor function is shared among all the objects created using the constructor function.
 * 7. If a property is not found on the object just go up the prototype chain - (obj[own]) --> (obj's prototype [i.e constructor]) --> (constructor's prototype[Object])
 */

//constructor function
function Person(name) {
    this.name = name;
    //copy of this method is given to each object created using new
    this.greeting = () => {
        console.log('Hi ' + this.name);
    };
    console.log("I'm from constructor");
}

Person.prototype.proProp = "I'm from prototype object";

const pObj1 = new Person('Jake');
const pObj2 = new Person('Sammy');

pObj1.greeting();
//modify own property
pObj1.name = 'Sam';
pObj1.greeting();

console.log(pObj1.proProp); //I'm from prototype object
console.log(pObj1);
//this object modifies the prototype property so a new custom independent property added to object itself
pObj2.proProp = 'Foo';
console.log(pObj2.proProp); //'Foo'
console.log(pObj2);

console.log(pObj1.valueOf());
console.log(pObj1.__proto__);
console.log(pObj1.__proto__.__proto__);

//returns the prototype object of the specified object
console.log(Object.getPrototypeOf(pObj1));
//the data within the prototype object
console.log(Person.prototype);
//get names of all properties on the object
console.log(Object.getOwnPropertyNames(pObj1));
//returns property configuration for the object
//config - 'true' means whether below props can be changed or property can be deleted
//enum - 'true' means the property will showup in count for loop
//value - value associated with the property
//writable - 'true' means new value can assigned
console.log(Object.getOwnPropertyDescriptors(pObj1));

//true is property there on obj; false if inherited (prototype) property
//does not check the prototype chain
console.log(pObj1.hasOwnProperty('greeting'));
console.log(pObj1.hasOwnProperty('proProp'));

//'in' checks the property in prototype chain as well
console.log('proProp' in pObj1);
console.log('greeting' in pObj1);

//'instanceof' checks if object exists in another object prototype chain
console.log(pObj1 instanceof Person); //true
console.log(pObj1 instanceof Object); //true
console.log(pObj1 instanceof Array); //false

let myArray = ['1', '2'];
console.log(myArray.__proto__);
console.log(myArray.__proto__.__proto__);
console.log(Object.getPrototypeOf(myArray));

//>>The prototype chain
// Let's create an object o from function f with its own properties a and b:
function F() {
    this.a = 1;
    this.b = 2;
}
let o = new F(); // {a: 1, b: 2}

// add properties in f function's prototype
F.prototype.b = 3;
F.prototype.c = 4;

// do not set the prototype f.prototype = {b:3,c:}; this will break the prototype chain
// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype.
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
// This is the end of the prototype chain, as null,
// by definition, has no [[Prototype]].
// Thus, the full prototype chain looks like:
// {a: 1, b: 2} ---> {b: 3, c: } ---> Object.prototype ---> null

console.log(o.a); // 1
// Is there an 'a' own property on o? Yes, and its value is 1.

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called 'Property Shadowing'

console.log(o.c); //
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.

console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.
//*

//*Function Level Inheritance
console.log('=====================Function Level Inheritance=======================');

//>>Single Inheritance
// Parent
//   |
//   v
// Child

//>>>Non Parameterized Constructor
function MyConstructor() {
    this.fname = 'Jack';
    this.lname = 'Jonas';
}

MyConstructor.prototype.getName = function() {
    return 'Name is: ' + this.fname + ' ' + this.lname;
};

function MyChild(age) {
    MyConstructor.call(this);
    this.age = age;
}

//Set Child's prototype to be Parent's prototype
MyChild.prototype = Object.create(MyConstructor.prototype);
//reset Child's contructor so that it points to itself
MyChild.prototype.constructor = MyChild;

MyChild.prototype.getAge = function() {
    return 'Age is: ' + this.age;
};

const nonParaObj = new MyChild(12);
console.log(nonParaObj.fname + ' ' + nonParaObj.lname);
console.log(nonParaObj.getName());
console.log(nonParaObj.age);
console.log(nonParaObj.getAge());

//>>>>Parameterized Constructor
function Parent(fname, lname) {
    this.fname = fname;
    this.lname = lname;
    //Works!! but an independent function copy will be created for each object created using new operator
    //use only if working with limited number of objects since its not memory efficient
    //else use the prototype property itself
    // this.getFullName = function () {
    //     return this.fname + '' + this.lname;
    // };
}

//shared among all object instances no independent copy for each object
Parent.prototype.getFullName = function() {
    console.log(this);
    return this.fname + ' ' + this.lname;
};

function Child(fname, lname, age) {
    Parent.call(this, fname, lname);
    this.age = age;
}

//let the Child prototype refer to the new object created that has methods defined in Parent.prototype
//note : it make the constructor and the protoype property enumerable(appears in for..in loop)
Child.prototype = Object.create(Parent.prototype);
//Now the Child constructor is set to Parent Constructor so we reset it
Child.prototype.constructor = Child;

Child.prototype.getAge = function() {
    console.log(this);
    return this.fname + ' ' + this.lname + ' ' + this.age;
};

const childObj = new Child('Jack', 'Samson', 34);
console.log(childObj.getFullName());
console.log(childObj.getAge());
console.log(childObj.fname);
console.log(childObj);
console.log(childObj.__proto__);
console.log(childObj.__proto__.__proto__);
console.log(childObj.__proto__.__proto__.__proto__);
console.log(Parent.prototype);
console.log(Child.prototype);
console.log(childObj instanceof Parent);
//checks if an object exists in another object's prototype chain
console.log(Parent.prototype.isPrototypeOf(childObj));

//>>>>A hybrid mix of 'this' and prototype
/**
 * 1. If your methods do not use local variables defined in your constructor then use the prototype approach.
 * 2. If you're creating lots of Dogs, use the prototype approach. This way, all "instances" (i.e. objects created by the Dog constructor) will share one set of functions, whereas      the constructor way, a new set of functions is created every time the Dog constructor is called, using more memory.
 * 3. If you're creating a small number of Dogs and find that using local, "private" variables in your constructor improves your code, this may be the better approach. Use your         judgment and do some benchmarks if performance or memory consumption are major concerns.
 */
function AngryDog(name) {
    this.name = name;

    let barkCount = 0;

    this.bark = function() {
        barkCount++;
        console.log(this.name + ' bark');
    };

    this.getBarkCount = function() {
        console.log(this.name + ' has barked ' + barkCount + ' times');
    };
}

AngryDog.prototype.wagTail = function() {
    console.log(this.name + ' wagging tail');
};

const myDog1 = new AngryDog('Buster');
myDog1.bark();
myDog1.bark();
myDog1.getBarkCount();
myDog1.wagTail();
console.log(myDog1);

const myDog2 = new AngryDog('Mojo');
myDog2.bark();
myDog2.bark();
myDog2.getBarkCount();
myDog2.wagTail();
console.log(myDog2);
console.log(AngryDog.prototype);

//>>Heirarchical Inheritance
//    Animal
//    /    \
//   v      v
//  Dog     Cat
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    return this.name + ' eats.';
};

function Cat(name, age) {
    Animal.call(this, name);
    this.age = age;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.meow = function() {
    return this.name + ' meows... with age ' + this.age;
};

function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return this.name + ' barks... with age ' + this.age ;
};

const catObj = new Cat('Shiny', 3);
console.log(catObj.eat());
console.log(catObj.meow());

const dogObj = new Dog('Max', 8);
console.log(dogObj.eat());
console.log(dogObj.bark());

console.log(Animal.prototype);
console.log(Cat.prototype);
console.log(Dog.prototype);
console.log(catObj instanceof Animal); //true

//>>Multilevel Inheritance
// Animal
//   |
//   v
// Big Dog
//   |
//   v
// PuppyDog

function AnimalBase(name) {
    this.name = name;
}

AnimalBase.prototype.eat = function() {
    return this.name + ' eats.';
};

function BigDog(name, age) {
    AnimalBase.call(this, name);
    this.age = age;
}

BigDog.prototype = Object.create(AnimalBase.prototype);
BigDog.prototype.constructor = BigDog;

BigDog.prototype.bark = function() {
    return this.name + ' barks... with age ' + this.age;
};

function PuppyDog(name, age) {
    AnimalBase.call(this, name);
    this.age = age;
}

PuppyDog.prototype = Object.create(BigDog.prototype);
PuppyDog.prototype.constructor = PuppyDog;

PuppyDog.prototype.cry = function() {
    return this.name + ' cries... with age ' + this.age;
};

const bigDogObj = new BigDog('Grumpy', 10);
console.log(bigDogObj.eat());
console.log(bigDogObj.bark());

const puppyDogObj = new PuppyDog('Maxie', 3);
console.log(puppyDogObj.eat());
console.log(puppyDogObj.bark());
console.log(puppyDogObj.cry());

console.log(AnimalBase.prototype);
console.log(BigDog.prototype);
console.log(PuppyDog.prototype);
console.log(puppyDogObj instanceof AnimalBase);
//*

//*Object Level Inheritance
console.log('=======================Object Level Inheritance=======================');
/**
 * 1. The object referenced by [[Prototype]] is called a "prototype".
 * 2. If we want to read a property of obj or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype.
 * 3. Write/delete operations work directly on the object, they don't use the prototype (unless the property is actually a setter).
 * 4. If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
 */

//>>single chain
let animal = {
    eats: true
};

let rabbit = {
    jumps: true
};

//Depreciated way
//the .prototype property exists only for construtor functions
rabbit.__proto__ = animal;
//New Way
//or use Object.setPrototypeOf(obj, proto)
let tiger = Object.create(animal);
tiger.kills = true;
// we can find both properties in rabbit now
console.log(rabbit.eats); //true
console.log(rabbit.jumps); //true
console.log(tiger.eats); //true
console.log(tiger.kills); //true
console.log(tiger);
console.log(rabbit);

//>>multilevel chain
let myanimal = {
    eats: true,
    walk() {
        console.log('Animal walk');
    },

    get eatVal() {
        return this.eats;
    },

    set eatVal(val) {
        this.eats = val;
    }
};

let myrabbit = {
    jumps: true,
    __proto__: myanimal
};

let longEar = {
    earLength: 10,
    __proto__: myrabbit
};

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
console.log(longEar.jumps); // true (from rabbit)
console.log(longEar.earLength); // (from own)

//method overriding
//no traversal up the chain for writing data props
//new method added to longEar object
longEar.walk = function() {
    console.log('Rabbit long ear walk');
};
longEar.walk();

//for getters and setters chain traversal is done
console.log(longEar.eatVal);
//a new property created on longEar object itself
//it does not modify the animal object
longEar.eatVal = false;
console.log(longEar.eatVal);
console.log(longEar); //eats : false
console.log(animal); //eats : true
//*

//*ES6 Classes
//the code within classes is always executed in strict mode
//standard class - not hoisted
class Box {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
// | Same as
// v
// function Box(height, width) {
//     this.height = height;
//     this.width = width;
// }

//class expressions - not hoisted
const Triangle = class {
    constructor(angle) {
        this.angle = angle;
    }
};

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        //'this' methods
        //can override the prototype methods
        // this.calcArea = function() {
        //     return this.height * this.height + ' yo';
        // };
    }
    //below are all prototype methods
    //getter
    get area() {
        return this.calcArea();
    }
    //method
    calcArea() {
        return this.height * this.width;
    }
    //static method - utility functions
    static getVal1(obj) {
        //can call other static methods through 'this'
        this.getVal2(obj);
        obj.height = 20;
        return "I'm Static Method " + obj.height + ' ' + obj.calcArea() + ' ' + obj.area;
    }

    static getVal2(obj) {
        obj.height = 30;
        console.log("I'm also Static Method " + obj.height + ' ' + obj.calcArea() + ' ' + obj.area);
    }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
//static methods can't access class members directly so have to pass object
console.log(Rectangle.getVal1(square));
console.log(Rectangle.prototype);

//ES5 Conversion
//      |
//      V
//constructor
function RectOld(height, width) {
    this.height = height;
    this.width = width;
}

//getter method
Object.defineProperty(RectOld.prototype, 'area', {
    get: function() {
        return this.calcArea();
    }
});

//normal method
RectOld.prototype.calcArea = function() {
    return this.height * this.width;
};

//static methods
RectOld.getVal1 = function(obj) {
    obj.height = 20;
    this.getVal2(obj);
    return "I'm Static Metho" + 'd ' + obj.height + ' ' + obj.calcArea() + ' ' + obj.area;
};

RectOld.getVal2 = function(obj) {
    obj.height = 30;
    console.log("I'm also Static Method " + obj.height + ' ' + obj.calcArea() + ' ' + obj.area);
};

const sqr = new RectOld(10, 10);
console.log(sqr.area);

console.log(RectOld.getVal1(sqr));
console.log(RectOld.prototype);

//>>ES6 inheritance
class Shape {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    getArea() {
        return ' Area is ' + this.height * this.width;
    }
}

class MyRectangle extends Shape {
    constructor(height, width, shape) {
        super(height, width);
        this.shape = shape;
    }

    getShape() {
        return 'The shape is ' + this.shape + super.getArea();
    }
}

const rectObj = new MyRectangle(100, 100, 'Rectangle');
console.log(rectObj.getShape());
//*
