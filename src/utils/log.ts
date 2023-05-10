import Debug from 'debug';

const NAMESPACE = 'sdk';
const LOG_SEPERATOR = ':';

const base = Debug(NAMESPACE);

/**
 * Creates a a custom logger
 * @param suffix name of the module you are working on
 * @param extraInfo any other key that can help distinguish where this
 * log is coming from
 * @returns
 */
export const createLogger = (suffix: string, extraInfo?: string) => {
  base.log = console.log.bind(console);
  const debug = base.extend([suffix, extraInfo, 'verbose'].join(LOG_SEPERATOR));
  const error = base.extend([suffix, extraInfo, 'error'].join(LOG_SEPERATOR));
  return {
    debug,
    error
  };
};
