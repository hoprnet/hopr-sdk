import { getAddresses } from "./getAddresses";
const getHoprAddress = async (url, apiKey) => {
  try {
    const addresses = await getAddresses(url, apiKey);
    return addresses.hopr;
  } catch (APIError2) {
    throw APIError2;
  }
};
export {
  getHoprAddress
};
