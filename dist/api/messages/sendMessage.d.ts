import { SendMessagePayloadType } from '../../types/messages.js';
import 'zod';
import '../../types/general.js';

/**
 * Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.
 *
 * @param url - The URL to send the message to.
 * @param apiKey - The API key to use for authentication.
 * @param body - The message body to send.
 * @param recipient - The recipient of the message.
 * @param path - The path to take for the message, if any.
 * @param hops - The number of hops to take for the message, if any.
 *
 * @returns - A promise that resolves to the sent message.
 */
declare const sendMessage: (payload: SendMessagePayloadType) => Promise<string>;

export { sendMessage };
