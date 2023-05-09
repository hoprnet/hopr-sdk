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

export const getAlias = async (
  alias: string
): Promise<string | { status: string; error?: string }> => {
  const res = await fetch(`${BASEURL}aliases/${alias}`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });

  const aliasResponse = (await res.json()) as {
    peerId?: string;
    status?: string;
    error?: string;
  };

  if (aliasResponse['peerId']) return aliasResponse['peerId'];
  else if (aliasResponse['error'])
    return { status: aliasResponse['status']!, error: aliasResponse['error'] };
  return { status: aliasResponse['status']! };
};
