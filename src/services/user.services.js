import AppError from "../errors/errors.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

export const theMeService = async (userId) => {
    const user = await User.findById(userId).select("-password")

    if(!user) throw new AppError("User not found", 404)

    return user
}

export const changeRoleService = async (userId, role) => {
    if(role !== "admin" && role !== "user") throw new Error("Bad Request!")

    const updatedUser = await User.findByIdAndUpdate(userId, { role }, {new: true}).select("-password")
    if(updatedUser == null) throw new AppError("Enter role to update!", 400)
    return updatedUser
}

export const deleteUserService = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId)
    if(deletedUser == null) throw new AppError("User not found!", 404)
    else return
}

export const updateUserService = async (userId, updateData) => {

  // Business validation
  if (Object.keys(updateData).length === 0) {
    throw new AppError("No fields to update!", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );

  // Resource existence check
  if (!updatedUser) {
    throw new AppError("User not found!", 404);
  }

  return updatedUser;
};


export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId).select('-password')
    if(user) return user
        // return res.status(200).json({user})
    else throw new AppError("User not found!", 404)
        // return res.status(404).json({message: "User not found!"})
}

export const getUsersService = async () => {
    const user = await User.find({}).select('-password')
    return user
}

export const createUserService = async (username, email, password) => {
    const existingUserEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })
    if(existingUserEmail || existingUsername) throw new AppError("User already exists!", 409)
                // return res.status(409).json({message: "User already exists!"})
            // hash the password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    
            const user = await User.create({
                username, email, password: hashedPassword
            })
            return user //res.status(201).json(user)
}