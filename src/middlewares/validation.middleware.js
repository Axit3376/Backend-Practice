import AppError from "../errors/errors.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export const validateRequired = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return next(
        new AppError(
          `Missing required fields: ${missingFields.join(", ")}`,
          400
        )
      );
    }

    next();
  };
};


export const validateId = (req, res, next) => {
    const userId = req.params.id
    if(!validateObjectId(userId)){
      return next(
        new AppError(
          "Enter a valid user id",
          400
        )
      );
    }
    next()
  }