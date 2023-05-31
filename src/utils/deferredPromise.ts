/**
 * Creates an instance of a deferred promise.
 */
export class DeferredPromise<T> {
  public promise: Promise<T>;
  public resolve: (value: T | PromiseLike<T>) => void;
  public reject: (reason?: any) => void;

  constructor() {
    this.reject = () => {};
    this.resolve = () => {};
    this.promise = new Promise<T>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
