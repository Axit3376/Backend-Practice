import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

export const theMeService = async (userId) => {
    const user = await User.findById(userId).select("-password")

    if(!user) throw new Error("User not found")

    return user
}

export const changeRoleService = async (userId, role) => {
    if(role !== "admin" && role !== "user") throw new Error("Bad Request!")

    const updatedUser = await User.findByIdAndUpdate(userId, { role }, {new: true}).select("-password")
    if(updatedUser == null) throw new Error("Bad Request!")
    return updatedUser
}

export const deleteUserService = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId)
    if(deletedUser == null) throw new Error("User not found!")
    else return
}

export const updateUserService = async (userId, updateData) => {

    if(Object.keys(updateData).length == 0) throw new Error("Bad Request!") //return res.status(400).json({message: "No fields to update!"})

    else{
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true})
        if(updatedUser == null)  throw new Error("Bad Request!") //res.status(404).json({message: "User not found!"})
        else return updatedUser //res.status(200).json({updatedUser})
        }
}

export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId).select('-password')
    if(user) return user
        // return res.status(200).json({user})
    else throw new Error("User not found!")
        // return res.status(404).json({message: "User not found!"})
}

export const getUsersService = async () => {
    const user = await User.find({}).select('-password')
    return user
}

export const createUserService = async (username, email, password) => {
    const existingUser = await User.findOne({ email })
    if(existingUser) throw new Error("User already exists!")
                // return res.status(409).json({message: "User already exists!"})
            // hash the password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    
            const user = await User.create({
                username, email, password: hashedPassword
            })
            return user //res.status(201).json(user)
}