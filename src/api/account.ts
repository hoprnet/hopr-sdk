// https://docs.hoprnet.org/developers/rest-api

import fetch from 'node-fetch';
import { getHeaders } from './utils';
import 'dotenv/config';

const { BASEURL, APIKEY } = process.env;

if (!BASEURL) {
  throw new Error('No BASEURL found to make API calls');
}
if (!APIKEY) {
  throw new Error('No APIKEY found to make API calls');
}

const withdraw = async (
  currency: string,
  amount: string,
  recipient: string
): Promise<string | { status?: string; error?: string }> => {
  // Fetch and check error responses
  const res = await fetch(`${BASEURL}account/withdraw`, {
    method: 'POST',
    headers: getHeaders(APIKEY),
    body: JSON.stringify({ currency, amount, recipient })
  });

  const response = (await res.json()) as {
    receipt?: string;
    status?: string;
    error?: string;
  };
  if (response['receipt']) return response['receipt'];
  return { status: response['status'], error: response['error'] };
};

const getBalances = async (): Promise<
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

const getNativeBalance = async (): Promise<
  string | { status: string; error: string }
> => {
  const balances = await getBalances();
  if ('native' in balances) return balances['native'];
  return { status: balances['status']!, error: balances['error']! };
};

const getHoprBalance = async (): Promise<
  string | { status: string; error: string }
> => {
  const balances = await getBalances();
  if ('hopr' in balances) return balances['hopr'];
  return { status: balances['status']!, error: balances['error']! };
};

const getAddresses = async (): Promise<
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

const getHoprAddress = async (): Promise<
  string | { status: string; error: string }
> => {
  const addresses = await getAddresses();
  if ('hoprAddress' in addresses) return addresses['hoprAddress'];
  return { status: addresses['status']!, error: addresses['error']! };
};

const getNativeAddress = async (): Promise<
  string | { status: string; error: string }
> => {
  const addresses = await getAddresses();
  if ('nativeAddress' in addresses) return addresses['nativeAddress'];
  return { status: addresses['status']!, error: addresses['error']! };
};

getHoprBalance().then((res) => console.log(res));
