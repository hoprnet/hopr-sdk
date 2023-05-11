export const apiWrapper = (url: string, apiToken: string, fn: Function) => {
  return (...args: any[]) => fn(url, apiToken, ...args);
};
