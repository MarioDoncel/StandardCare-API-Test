class ForbiddenError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly data?: string;

  constructor(message: string, statusCode = 400, data?: any) {
    super(message)
    this.statusCode = statusCode
    this.data = data
  }
}

export default ForbiddenError