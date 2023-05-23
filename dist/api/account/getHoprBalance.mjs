import { getBalances } from "./getBalances";
const getHoprBalance = async (payload) => {
  try {
    const balances = await getBalances({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return balances.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getHoprBalance
};
