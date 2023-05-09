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

export const withdraw = async (
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
