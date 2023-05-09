import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

/**
 * Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.
 *
 * @param {string} url - The URL to send the message to.
 * @param {string} apiKey - The API key to use for authentication.
 * @param {string} body - The message body to send.
 * @param {string} recipient - The recipient of the message.
 * @param {string[]} [path] - The path to take for the message, if any.
 * @param {number} [hops] - The number of hops to take for the message, if any.
 *
 * @returns {Promise<string | { status: string; error: string }>} - A promise that resolves to the sent message, or an object with status and error properties if an error occurred.
 */
export const sendMessage = async (
  url: string,
  apiKey: string,
  body: string,
  recipient: string,
  path?: string[],
  hops?: number
): Promise<string | { status: string; error: string }> => {
  if (!path && !hops)
    throw new Error('We need either the path or number of hops');

  let payload: { [key: string]: any } = {
    body: body,
    recipient: recipient
  };
  if (path) payload.path = path;
  if (hops) payload.hops = hops;

  const res = await fetch(`${url}messages`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(payload)
  });

  const response = (await res.json()) as
    | string
    | { status: string; error: string };
  console.log(response);

  if (typeof response === 'string') return response;
  return { status: response['status'], error: response['error'] };
};
