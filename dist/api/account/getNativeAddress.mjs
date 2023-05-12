import { getAddresses } from "./getAddresses";
const getNativeAddress = async (url, apiKey) => {
  try {
    const addresses = await getAddresses(url, apiKey);
    return addresses.native;
  } catch (APIError) {
    throw APIError;
  }
};
export {
  getNativeAddress
};
