import fetch from 'cross-fetch';
import { getHeaders } from '../utils';
import 'dotenv/config';

const { BASEURL, APIKEY } = process.env;
if (!BASEURL) {
  throw new Error('No BASEURL found to make API calls');
}
if (!APIKEY) {
  throw new Error('No APIKEY found to make API calls');
}

export const setAlias = async (
  peerId: string,
  alias: string
): Promise<void | { status: string; error?: string }> => {
  const res = await fetch(`${BASEURL}aliases/`, {
    method: 'POST',
    headers: getHeaders(APIKEY),
    body: JSON.stringify({ peerId, alias })
  });
  try {
    const response = (await res.json()) as {
      status: string;
      error?: string;
    };
    return response;
  } catch (e) {
    // If it can't turn the response into json, then it was successful
  }
};
