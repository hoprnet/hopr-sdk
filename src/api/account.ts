// https://docs.hoprnet.org/developers/rest-api

import fetch from 'node-fetch';
import { getHeaders } from './utils';
import 'dotenv/config';

const { BASEURL } = process.env;

const APIKEY = 'Lu1s-3dm4nu3l!';

const accountWithdraw = async (
  currency: string,
  amount: string,
  recipient: string
): Promise<{ receipt?: string; status?: string; error?: string }> => {
  // Fetch and check error responses
  const res = await fetch(`${BASEURL}account/withdraw`, {
    method: 'POST',
    headers: getHeaders(APIKEY),
    body: JSON.stringify({ currency, amount, recipient })
  });

  return (await res.json()) as {
    receipt?: string;
    status?: string;
    error?: string;
  };
};

const accountGetBalances = async (): Promise<{
  native?: string;
  hopr?: string;
  status?: string;
  error?: string;
}> => {
  // Fetch and check error responses
  const res = await fetch(`${BASEURL}account/balances`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });
  return (await res.json()) as {
    native?: string;
    hopr?: string;
    status?: string;
    error?: string;
  };
};

const accountGetNativeBalance = async (): Promise<
  string | { status: string; error: string }
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
  if (balances['native']) return balances['native'];
  else return { status: balances['status']!, error: balances['error']! };
};

const accountGetHoprBalance = async (): Promise<
  string | { status: string; error: string }
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
  if (balances['hopr']) return balances['hopr'];
  else return { status: balances['status']!, error: balances['error']! };
};

const accountGetAddresses = async (): Promise<
  [hoprAddress: string, nativeAddress: string]
> => {
  const res = await fetch(`${BASEURL}account/addresses`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });
  const addresses = (await res.json()) as {
    nativeAddress: string;
    native: string;
    hoprAddress: string;
    hopr: string;
  };
  return [addresses['hoprAddress'], addresses['nativeAddress']];
};

const accountGetHoprAddress = async (): Promise<string> => {
  const res = await fetch(`${BASEURL}account/addresses`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });

  const response = (await res.json()) as {
    nativeAddress: string;
    native: string;
    hoprAddress: string;
    hopr: string;
  };

  return response['hoprAddress'];
};

const accountGetNativeAddress = async (): Promise<string> => {
  const res = await fetch(`${BASEURL}account/addresses`, {
    method: 'GET',
    headers: getHeaders(APIKEY)
  });

  const response = (await res.json()) as {
    nativeAddress: string;
    native: string;
    hoprAddress: string;
    hopr: string;
  };

  return response['nativeAddress'];
};
