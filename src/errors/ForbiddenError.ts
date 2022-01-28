class ForbiddenError extends Error {
  public readonly statusCode: number;

  public readonly data?: unknown;

  constructor(message: string, data?: unknown, statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ForbiddenError;
