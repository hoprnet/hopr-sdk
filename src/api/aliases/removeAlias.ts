import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

export const removeAlias = async (
  url: string,
  apiKey: string,
  alias: string
) => {
  const res = await fetch(`${url}/api/v2/aliases/${alias}`, {
    method: 'DELETE',
    headers: getHeaders(apiKey)
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
