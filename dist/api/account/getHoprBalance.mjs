import { getBalances } from "./getBalances";
const getHoprBalance = async (url, apiKey) => {
  try {
    const balances = await getBalances(url, apiKey);
    return balances.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getHoprBalance
};
