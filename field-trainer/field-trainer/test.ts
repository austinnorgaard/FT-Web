class Test {
    id: number;

    public isEqualTo = (other: Test) => other.id === this.id;
}

let testArray: Array<Test> = new Array<Test>();
let localInstance = new Test();
localInstance.id = 0;
testArray.push(new Test());
testArray.push(new Test());

let idx = testArray.findIndex(t => t.isEqualTo(localInstance));
console.log(idx);

// Some abstract class, which normally has like validators on it
// The front end and backend can specialize it by extending it..
abstract class AbstractTest {
    constructor() {}
    id: number;

    // I wanted a nice easy way to test for equality without having to repeat myself
    isEqualTo = (other: AbstractTest) => other.id === this.id;
}

class ConcreteTest extends AbstractTest {
    // Nothing necessarily added, but in my use case this is the UI-specific extended version
    // which might have angular-specific bits of info...
    constructor() {
        super();
    }
}

// Make an array of these things
let tests: Array<AbstractTest> = new Array<AbstractTest>();
[1, 2, 3, 4].forEach(x => tests.push({ id: x } as ConcreteTest));

// Find an item's index, the way I DONT want to (digging into the member vars...)
const index = tests.findIndex(t => t.id === 2);
console.log(index); // works just fine

// If I have an existing instance, and I want to find out how it fits into
// an existing array, I want to do this...
const localTest = { id: 3 } as ConcreteTest;
const index2 = tests.findIndex(t => {
    console.log(typeof t);
    return t.isEqualTo(localTest);
});
console.log(index2);
