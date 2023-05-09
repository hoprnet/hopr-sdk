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

export const getAliases = async (): Promise<{
  [key: string]: string | { status: string; error: string };
}> => {
  const res = await fetch(`${BASEURL}aliases/`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });

  const aliases = (await res.json()) as {
    [key: string]: string | { status: string; error: string };
  };

  if ('error' in aliases && 'status' in aliases)
    return { status: aliases['status'], error: aliases['error'] };
  return aliases;
};
