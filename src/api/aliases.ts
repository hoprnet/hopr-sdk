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

const getAliases = async (): Promise<{
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

const setAlias = async (
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

const getAlias = async (
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

const removeAlias = async (alias: string) => {
  const res = await fetch(`${BASEURL}aliases/${alias}`, {
    method: 'DELETE',
    headers: getHeaders(APIKEY)
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

removeAlias('pingbot4').then((res) => console.log(res));
