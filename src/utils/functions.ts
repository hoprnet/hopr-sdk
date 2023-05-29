import { decode } from 'rlp';

/**
 * Decodes the message sent from a hoprd node
 *
 * @param msg - The message to decode
 * @returns a string representing the decoded message
 */
export const decodeMessage = (msg: string): string => {
  console.log('WB: decodeMessage');
  let uint8Array = new Uint8Array(JSON.parse(`[${msg}]`));
  let decodedArray = decode(uint8Array);
  if (decodedArray[0] instanceof Uint8Array) {
    return new TextDecoder().decode(decodedArray[0]);
  }
  throw Error(`Could not decode received message: ${msg}`);
};
