export class TestInterface {
    name: string;
    age: number;
}

function testFunc(): TestInterface {
    return {
        name: "Keaton",
        age: 27,
    };
}

const blah = testFunc();
console.log(blah);
