class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message); // sets this.message and preserves Error behavior
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
