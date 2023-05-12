import { getBalances } from "./getBalances";
const getNativeBalance = async (url, apiKey) => {
  try {
    const balances = await getBalances(url, apiKey);
    return balances.native;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getNativeBalance
};
