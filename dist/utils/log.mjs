import Debug from "debug";
const NAMESPACE = "sdk";
const LOG_SEPERATOR = ":";
const base = Debug(NAMESPACE);
const createLogger = (suffix, extraInfo) => {
  base.log = console.log.bind(console);
  const debug = base.extend([suffix, extraInfo, "verbose"].join(LOG_SEPERATOR));
  const error = base.extend([suffix, extraInfo, "error"].join(LOG_SEPERATOR));
  return {
    debug,
    error
  };
};
export {
  createLogger
};
