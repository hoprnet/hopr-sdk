export const apiWrapper = (fn: Function, url: string, apiToken: string) => {
  return (...args: any[]) => fn(url, apiToken, ...args);
};
