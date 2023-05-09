import { getAddresses } from './getAddresses';

export const getNativeAddress = async (): Promise<
  string | { status: string; error: string }
> => {
  const addresses = await getAddresses();
  if ('nativeAddress' in addresses) return addresses['nativeAddress'];
  return { status: addresses['status']!, error: addresses['error']! };
};
