# wait-for
Wait for is a testing utility used for when a test needs to wait for a condition to become true. It will repeadely call a function until the supplied condition becomes true.

## Installation 
Install with `npm install --save @bmanley91/wait-for`

## Usage
`waitFor` is called with three parameters:
* `call` - The function to call. This function can be async.
* `condition` - A syncronous function that returns a boolean.
* `ms` - The number of miliseconds to wait before timing out.

`waitFor` resolves to the return value of `call` if the expected `condition` is met. Otherwise it rejects with a Timeout Error.

### Example
The following code will repeatedly call `makeRestCall` until a status code of [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) is returned or 30 seconds has passed.
```
async function makeRestCall(url, body) {
    // Make a call to an external API.
    // Returns a body with a status code.
}

const targetUrl = "foo.bar"
const body = { param: "thing" };

const expectedStatusCode = 429;
const result = await waitFor(
    async () => makeRestCall(targetUrl, body),
    body => body.statusCode === expectedStatusCode,
    30000
);
```

To call a function with the same parameters repeatedly, an arrow function containing the function to be called can be used.
```
async function makeRestCall() {
    // Make a call to an external API.
    // Returns a body with a status code.
}

const expectedStatusCode = 429;
const result = await waitFor(
    makeRestCall,
    body => body.statusCode === expectedStatusCode,
    30000
);
```

## Publishing Changes
To publish changes increment the version number appropriately. Then, run `npm publish`. NPM will automattically run the `prepublish` script to assure the code compiles and that tests pass.
