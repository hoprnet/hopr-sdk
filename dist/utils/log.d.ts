import Debug from 'debug';

/**
 * Creates a a custom logger
 * @param suffix name of the module you are working on
 * @param extraInfo any other key that can help distinguish where this
 * log is coming from
 * @returns
 */
declare const createLogger: (suffix: string, extraInfo?: string) => {
    debug: Debug.Debugger;
    error: Debug.Debugger;
};

export { createLogger };
