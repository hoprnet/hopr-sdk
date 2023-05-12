import { GetInfoResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const getInfo: (url: string, apiKey: string) => Promise<GetInfoResponseType>;

export { getInfo };
