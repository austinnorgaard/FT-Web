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

This is common when your backend just returns some array of objects. _not when an object contains an array as a named element._

The key difference is that we can't pass the type `Array<T>` to the RegisterEventObservable method.

Maybe this can be resolved, but until then, the best way is like so:

```
// Create a wrapper type to be used
class ArrayTestDto {
    @IsArray()
    @Type(() => TestDto)
    items: Array<TestDto>
}

// register
const observable = broker.RegisterEventObservable("eventName", ArrayTestDto);

observable.subscribe((data: Array<TestDto>) => {
    // yay, we got an array of elements
});
```
