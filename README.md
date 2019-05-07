# wait-for
Wait for is a testing utility used for when a test needs to wait for a condition to become true. It will repeadely call a function until the supplied condition becomes true.

## Usage
`waitFor` is called with three parameters:
* `call` - The function to call. This function can be async.
* `condition` - A syncronous function that returns a boolean.
* `ms` - The number of miliseconds to wait before timing out.

`waitFor` resolves to the return value of `call` if the expected `condition` is met. Otherwise it rejects with a Timeout Error.

### Example
The following code will repeatedly call `mockFunction` until it returns `1` or 30 seconds has passed.
```
const expectedValue = 1;
const result = await waitFor(
    mockFunction,
    x => x === expectedValue,
    30000
);
```