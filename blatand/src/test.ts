function methodDecorator() {
    console.log("Function which returns the newly wrapped method");
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
        /*console.log(`Target: ${JSON.stringify(target)}. Name: ${name}. Descriptor: ${JSON.stringify(descriptor)}`);
        console.log("Do something here");*/
        console.log(target);
        console.log(`The name: ${target.name}`);
        descriptor.value = () => {
            console.log("Overriden!");
            return 24;
        }
    }
}

function classDecorator(target: Function) {
    console.log(`Class decorator target: ${target}`);
    console.log(typeof(target));
}

@classDecorator
class TestClass {
    public name: string = "hello";
    @methodDecorator()
    test(): number {
        console.log("Test called");
        return 42;
    }
    @methodDecorator()
    test2() : number {
        return 42;
    }
}

let test = new TestClass();

test.test();
test.test();
test.test();