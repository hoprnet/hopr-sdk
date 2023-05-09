import { getAddresses } from './getAddresses';

export const getHoprAddress = async (): Promise<
  string | { status: string; error: string }
> => {
  const addresses = await getAddresses();
  if ('hoprAddress' in addresses) return addresses['hoprAddress'];
  return { status: addresses['status']!, error: addresses['error']! };
};
