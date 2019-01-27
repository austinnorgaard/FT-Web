# Docs for Socket Message Broker

Use this class in order to register type-safe incoming socket transactions.

Each registered endpoint has a Type associated with it and the user only gets an emitted event
if the type checking passes. Can use any feature from class-validator and class-transformer

# Examples / Usage

## Basic

The typical usage: your data is flat and simple.

```
const broker = new SocketMessageBroker(socket); // any already-connected socket, the broker should now be the owner

// Some type we defined which defines the shape of the data
export class TestDto {
    @IsNumber() id: number;
    @IsString() name: string;
}
```

If we expect someone to emit data of this shape, we'll make sure to validate each of the fields
and also transform the plain object to the actual class (so functions can be used). This takes the 'any'
out of the hands for actual users.

```
// Register an eventName, intent: I want to receive this shape of data when this event is emitted
const myObservable = broker.RegisterEventObservable("eventName", TestDto);

myObservable.subscribe((data: TestDto) => {
    // yay, type-safe data.
});
```

The broker will throw an exception if incoming data for "eventName" fail validation. I consider this to be
a disastrous event, when the data you are receiving is not what you thought it was (i.e. string instead of Date).

## Arrays

This section refers to plain objects which look like this:

```
[
    {
        id: 10,
        name: "test"
    },
    {
        id: 11,
        name: "test2"
    }
]
```

The above will _NOT_ work. Make sure this always get transformed to look like:

```
{
    items: [
        {
            id: 10,
            name: "test"
        },
        {
            id: 11,
            name: "test2"
        }
    ]
}
```

In other words, we need the array to be a sub-item of an object with some generic name.
This is common when your backend just returns some array of objects. _not when an object contains an array as a named element._

NOTE: The happy path (no type errors, etc) works without doing this. But type-checking will essentially be disabled on the items in the array

For arrays we also need to create a small wrapper type. This can be generalized pretty easily assuming the variable name is.

```
// Create a wrapper type to be used
class ArrayDto {
    @IsArray({
        each: true // required!
    })
    @ValidateNested()
    @Type(() => TestDto)
    items: Array<TestDto>
}

// register
const observable = broker.RegisterEventObservable("eventName", ArrayDto);

observable.subscribe((data: ArrayDto) => {
    // yay, we got an array of elements
});
```

# Nested

Nested objects work as you'd expect, mixing the two rules above

Following is a sample class with nested object. It represents the following plain object shape:
{
id: 10,
dto: {
id: 11,
name: "Test"
}
}

```
class NestedDto {
    @IsNumber()
    id: number;

    @Type(() => TestDto)
    @ValidateNested()
    dto: TestDto;
}
```

Otherwise, nothing changes. Just make sure to pass the correct class to Register as usual.

# Validation Failure

Currently if validation fails, a nasty exception is thrown and no way is provided to swallow this exception.

Will consider adding different error handling based on config, but for now I think this should be treated like an
assert (i.e. unacceptable).
