import { GetEntryNodesResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const getEntryNodes: (url: string, apiKey: string) => Promise<GetEntryNodesResponseType>;

export { getEntryNodes };
