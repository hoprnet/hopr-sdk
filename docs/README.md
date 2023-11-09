# Project setup

- api: the api routes seperated by resource
- ethereum: ethereum ABIs and Addresses that are relevant to Hopr
- flows: common uses of multiple functions in a row
- types: api response and request types using zod
- utils: extras that are used throughout the repo, such as `fetchWithTimeout`

## API

### Directory Setup

The api folder is used to find routes with ease.

For example if you are looking for `GET /api/v3/node/info` you would go straight
to the node folder and find the file `getInfo.ts` alongside `getInfo.spec.ts` to
understand how this function will react to different responses from the node.

In a more general sense it looks like this:

```
├── api
│   ├── resource (example: node)
│   │   ├── adapter.ts
│   │   ├── getResource.ts
│   │   ├── getResource.spec.ts
```

The adapter creates a resource class used by the [sdk class](./sdk.ts)

#### Adding a new route

The resource of the route can be seen after the `v3` keyword, for example in this example `/api/v3/node/info` the resource is `node`.

##### New Resource

- Create a the resource folder that must contain: adapter.ts and functions with tests.

##### Exisiting Resource

- Add the function to the resource folder with tests showing how the route would react to
  different status codes

#### Basic function structure

```Typescript
async function getResource(payload: ResourcePayloadType) {
    const rawResponse = await fetchResource()

    // received unexpected error from server
    if (isServerError(rawResponse)) {
     throw new Error();
    }

    // received expected response
    // this can either be done with a Zod object or a status code
    if (receivedExpectedResponse(rawResponse)) {
        return parseResponse(rawResponse);
    }

    // check if response has the structure of an expected api error
    if (isApiErrorResponse(rawResponse)) {
        throw new APIError();
    }

    // if we get to this point then we could not parse the response
    // and it is not unexpected error
    // we probably need to update the zod type
    throw new ZodError(parsedRes.error.issues);
    }
```
