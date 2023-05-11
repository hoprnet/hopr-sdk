type ExcludeFirstTwoArgs<F> = F extends (
  url: string,
  apiToken: any,
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never;

export type ApiWrapperType<T> = {
  [K in keyof T]: ExcludeFirstTwoArgs<T[K]>;
};
