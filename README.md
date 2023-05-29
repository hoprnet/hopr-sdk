# hopr-sdk

## Description

---

The `hopr-sdk` package is a software development kit for interacting with [HOPRd's Rest API functions](https://docs.hoprnet.org/developers/rest-api).
It provides a set of functions that allow developers to interact with the HOPR protocol and perform various actions such as account management, address retrieval, balance retrieval, and withdrawal operations.

## Installation

---

To install the HOPR-SDK package, follow these steps:

1. Make sure you have [node.js](https://nodejs.org) >=16 installed on your machine.
2. Open your terminal or command prompt.
3. Navigate to your project directory.
4. Run the following command to install the package using npm or yarn:

```shell
npm install hopr-sdk
```

```shell
yarn add hopr-sdk
```

## Usage

---

You can use the HOPR-SDK in three different ways:

#### HoprSdk class

By creating a new instance of the HoprSdk class.

1. Import the HoprSdk class from the package:

```ts
import { HoprSdk } from '@hoprnet/hopr-sdk';
```

2. Create an instance of the HoprSdk class by providing the required parameters:

```ts
const sdk = new HoprSdk({
  apiEndpoint: 'https://api.example.com', // Replace with the !!URL of the HOPR API server!!
  apiToken: 'your-api-token', // Replace with your API token
  timeout: 5000 // Optional timeout in milliseconds
});
```

3. You can now use the SDK instance to access the available functions. For example, to get the HOPR and native addresses associated with the node:

```ts
const addresses = await sdk.api.account.getAddresses();

console.log(addresses);
```

#### Api object // TODO: improve naming

By using the api object, which is the purest way of doing ... ///

1. Import the api object from the package:

```ts
import { api } from '@hoprnet/hopr-sdk';
```

2. Access the desired function, keep in mind that you'll need to provide a **payload object** with the `apiEndpoint` and `apiToken` for each individual function:

```ts
const addresses = await api.getAddresses({
  apiEndpoint: 'https://api.example.com', // Replace with the !!URL of the HOPR API server!!
  apiToken: 'your-api-token' // Replace with your API token
  timeout: 5000 // Optional timeout in milliseconds
});

console.log(addresses);
```

#### Importing directly the api functions

If your ts config includes `"moduleResolution": "nodenext" or "node16"`.

1. Import the desired function:

```ts
import { getAddresses } from '@hoprnet/hopr-sdk/api';
```

2. Provide the **payload object** with the `apiEndpoint` and `apiToken`:

```ts
const addresses = await getAddresses({
  apiEndpoint: 'https://api.example.com', // Replace with the !!URL of the HOPR API server!!
  apiToken: 'your-api-token' // Replace with your API token
  timeout: 5000 // Optional timeout in milliseconds
});

console.log(addresses);
```

## HoprSdk

---

## Functions

---
