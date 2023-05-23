import { getAddresses } from "./getAddresses";
const getNativeAddress = async (payload) => {
  try {
    const addresses = await getAddresses({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return addresses.native;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getNativeAddress
};
