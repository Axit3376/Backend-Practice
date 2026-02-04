import mongoose from "mongoose";

export const validateObjectId = (id) => {
  return mongoose.isValidObjectId(id);
};
