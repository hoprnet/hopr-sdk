class APIError extends Error {
  constructor(customError) {
    super(customError.error);
    this.name = "APIError";
    this.status = customError.status;
    this.error = customError.error;
  }
}
export {
  APIError
};
