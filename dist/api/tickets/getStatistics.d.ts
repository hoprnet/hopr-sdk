import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetStatisticsResponseType } from '../../types/tickets.js';
import 'zod';

declare const getStatistics: (payload: BasicAuthenticationPayloadType) => Promise<GetStatisticsResponseType>;

export { getStatistics };
