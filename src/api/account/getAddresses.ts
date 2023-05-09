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

export const getAddresses = async (): Promise<
  | { hoprAddress: string; nativeAddress: string }
  | { status: string; error: string }
> => {
  const res = await fetch(`${BASEURL}account/addresses`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });
  const addresses = (await res.json()) as {
    nativeAddress?: string;
    native?: string;
    hoprAddress?: string;
    hopr?: string;
    status?: string;
    error?: string;
  };
  if (addresses['hoprAddress'] && addresses['nativeAddress'])
    return {
      hoprAddress: addresses['hoprAddress'],
      nativeAddress: addresses['nativeAddress']
    };
  return { status: addresses['status']!, error: addresses['error']! };
};
