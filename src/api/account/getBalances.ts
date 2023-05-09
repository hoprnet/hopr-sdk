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

export const getBalances = async (): Promise<
  | {
      native: string;
      hopr: string;
    }
  | {
      status: string;
      error: string;
    }
> => {
  // Fetch and check error responses
  const res = await fetch(`${BASEURL}account/balances`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });
  const balances = (await res.json()) as {
    native?: string;
    hopr?: string;
    status?: string;
    error?: string;
  };

  if (balances.hopr && balances.native)
    return { hopr: balances.hopr, native: balances.native };
  return { status: balances.status!, error: balances.error! };
};
