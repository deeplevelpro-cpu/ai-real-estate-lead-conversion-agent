export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(
    code: string,
    message: string,
    statusCode: number
  ) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;
  }
}

export function unauthorized() {
  return new ApiError(
    "UNAUTHORIZED",
    "Unauthorized",
    401
  );
}

export function forbidden() {
  return new ApiError(
    "FORBIDDEN",
    "Forbidden",
    403
  );
}

export function badRequest(message = "Invalid request") {
  return new ApiError(
    "BAD_REQUEST",
    message,
    400
  );
}
