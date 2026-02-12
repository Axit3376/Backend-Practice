import AppError from "../errors/errors.js";

export const errorHandlingMiddleware = (err, req, res, next) => {

  // Known operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  // Unknown / programming errors
  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong"
  });
};
