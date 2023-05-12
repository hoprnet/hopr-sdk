import { GetStatisticsResponseType } from '../../types/tickets.js';
import 'zod';
import '../../types/general.js';

declare const getStatistics: (url: string, apiKey: string) => Promise<GetStatisticsResponseType>;

export { getStatistics };
