# @hoprnet/hopr-sdk

## Description

The `@hoprnet/hopr-sdk` package is a software development kit for interacting with [HOPRd's Rest API functions](https://docs.hoprnet.org/developers/rest-api).
It provides a set of functions that allow developers to interact with the HOPR protocol and perform various actions such as node and account management, messaging, address retrieval, balance retrieval, and withdrawal and other operations.

## Installation

To install the `@hoprnet/hopr-sdk` package, follow these steps:

1. Make sure you have [node.js](https://nodejs.org) >=18 installed on your machine.
2. Open your terminal or command prompt.
3. Navigate to your project directory.
4. Run the following command to install the package using:

```shell
npm install @hoprnet/hopr-sdk
```

or

```shell
yarn add @hoprnet/hopr-sdk
```

## Usage

You can use the `@hoprnet/hopr-sdk` in two different ways:

### HoprSDK class

By creating a new instance of the HoprSDK class.

1. Import the HoprSDK class from the package:

```ts
import { HoprSDK } from '@hoprnet/hopr-sdk';
```

2. Create an instance of the HoprSDK class by providing the required parameters:

```ts
const sdk = new HoprSDK({
  apiEndpoint: 'http://localhost:3001', // Replace with your HOPR API endopoint.
  apiToken: 'your-api-token', // Replace with your API token
  timeout: 5000 // Optional timeout in milliseconds (defaults to 30000)
});
```

3. You can now use the `sdk` instance to access the available functions. For example, to get the HOPR and native addresses associated with the node:

```ts
const addresses = await sdk.api.account.getAddresses();

console.log(addresses);
```

#### HOPR API functions

By calling directly the rest API functions.

1. Import the API object from the package:

```ts
import { api } from '@hoprnet/hopr-sdk';
```

- If your ts config includes `"moduleResolution": "nodenext" or "node16"`, you can import the functions like this:

```ts
import { getAddresses } from '@hoprnet/hopr-sdk/api';
```

2. Access the desired function, keep in mind that you'll need to provide a **payload object** with the `apiEndpoint` and `apiToken` for each individual function:

```ts
const addresses = await api.getAddresses({
  apiEndpoint: 'http://localhost:3001', // Replace with your HOPR API endopoint
  apiToken: 'your-api-token' // Replace with your API token
  timeout: 5000 // Optional timeout in milliseconds (defaults to 30000)
});

console.log(addresses);
```

#### HOPR Flows functions

By calling directly the flows functions.

1. Import the flows object from the package:

```ts
import { flows } from '@hoprnet/hopr-sdk';
```

- If your ts config includes `"moduleResolution": "nodenext" or "node16"`, you can import the functions like this:

```ts
import { openMultipleChannels } from '@hoprnet/hopr-sdk/flows';
```

2. Access the desired function, keep in mind that you'll need to provide a **payload object** with the `apiEndpoint` and `apiToken` for each individual function:

```ts
const res = await flows.openMultipleChannels({
  apiEndpoint: 'http://localhost:3001', // Replace with your HOPR API endopoint
  apiToken: 'your-api-token' // Replace with your API token
  timeout: 60e3 * 7 // Optional timeout in milliseconds (defaults to 30000) | This function takes really long
});

console.log(res);
```

## Documentation

- [HoprSDK Class](https://github.com/hoprnet/hopr-sdk/blob/docs/docs/classes/HoprSDK.md)
- [API functions](https://github.com/hoprnet/hopr-sdk/blob/docs/docs/modules/api.md)
- [Flows functions](https://github.com/hoprnet/hopr-sdk/blob/docs/docs/modules/flows.md)
- [Utils](https://github.com/hoprnet/hopr-sdk/blob/docs/docs/modules/utils.md)
- [Type Aliases and Variables](https://github.com/hoprnet/hopr-sdk/blob/docs/docs/modules.md)

## Project setup

Source code resides under `src/` folder.

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

    // check if response has the structure of an expected sdk api error
    if (isApiErrorResponse(rawResponse)) {
        throw new sdkApiError();
    }

    // if we get to this point then we could not parse the response
    // and it is not unexpected error
    // we probably need to update the zod type
    throw new ZodError(parsedRes.error.issues);
}
```
