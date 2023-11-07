### Types

This project uses [zod](https://zod.dev/) to validate api responses and requests in order to
get runtime validation.

This means that if the response does not match the zod type then zod will throw a `ZodError` that should be caught in every function.

With this library we make sure that the user of this sdk receives what we expect them to and not we want them to.

### Type structure

Most types in this repo follow the following structure:

- [Verb][Resource][Payload or Response] for the zod type
- [Verb][Resource][Payload or Response][Type] for the typescript type that can be retrieved
  from the zod type using `z.infer<typeof GetPeersPayload>;`

### Important Generic Types

- BasePayload: Represents the minimum payload needed to interact with hoprd node.
- RemoveBasicAuthenticationPayloadType: Removes the basic authentication properties from a payload type

#### Example

In the following example we can see the `GetPeersPayload` zod object that follows the convention and the associated type. However, sometimes response and request types are not so simple and can be re used throughout the project which can be seen with the `Peer` object that is later used for `GetPeersResponse`.

```Typescript
/**
 * Get peers
 */

export const GetPeersPayload = BasePayload.extend({
  quality: z.number().optional()
});

export type GetPeersPayloadType = z.infer<typeof GetPeersPayload>;

export const Peer = z.object({
  peerId: z.string(),
  peerAddress: z.string(),
  multiAddr: z.string(),
  heartbeats: z.object({
    sent: z.number(),
    success: z.number()
  }),
  lastSeen: z.number(),
  quality: z.number(),
  backoff: z.number(),
  isNew: z.boolean(),
  reportedVersion: z.string()
});
export const GetPeersResponse = z.object({
  connected: z.array(Peer),
  announced: z.array(Peer)
});

export type GetPeersResponseType = z.infer<typeof GetPeersResponse>;
```
