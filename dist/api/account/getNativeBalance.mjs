import { getBalances } from "./getBalances";
const getNativeBalance = async (payload) => {
  try {
    const balances = await getBalances({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return balances.native;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getNativeBalance
};
