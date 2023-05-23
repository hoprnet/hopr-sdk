import { getAddresses } from "./getAddresses";
const getHoprAddress = async (payload) => {
  try {
    const addresses = await getAddresses({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return addresses.hopr;
  } catch (APIError2) {
    throw APIError2;
  }
};
export {
  getHoprAddress
};
