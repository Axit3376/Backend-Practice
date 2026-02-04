import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { validateObjectId } from "../utils/validateObjectId.js";

const SALT_ROUNDS = 10

export const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body

        // Check if any field is empty
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required!"})
        }

        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(409).json({message: "User already exists!"})
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const user = await User.create({
            username, email, password: hashedPassword
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("Create user error: ", error);
        return res.status(500).json({message: "Server Error!"})    
    }
}

export const getUsers = async (req, res) => {
    try {
        // Find all users and display their info except password
        const user = await User.find({}).select('-password')
        return res.status(200).json({user})

    } catch (error) {
        console.log("Getting users error: ", error);
        return res.status(500).json({message: "Server Error"})
        
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        if(!validateObjectId(userId)){
            return res.status(400).json({message: "Enter a valid user id"})
        }
        else{
            const user = await User.findById(userId).select('-password')
            if(user){
                return res.status(200).json({user})
            }
            else{
                return res.status(404).json({message: "User not found!"})
            }
        }
    } catch (error) {
        console.log("Getting user error: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})

        else{
            if(Object.keys(req.body).length == 0) return res.status(400).json({message: "No fields to update!"})

            const { username, email } = req.body //get only the required data from the body and put it in a new object
            const updateData = {}
            if("username" in req.body) updateData.username = username
            if("email" in req.body) updateData.email = email
            // Alternate way
            // if(req.body.hasOwnProperty("username"))

            if(Object.keys(updateData).length == 0) return res.status(400).json({message: "No fields to update!"})

            else{
                const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true})
                if(updatedUser != null) return res.status(200).json({updatedUser})
                else return res.status(404).json({message: "User not found!"})
            }
        }
    } catch (error) {
        console.log("Error updating user: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})
        else{
            const deletedUser = await User.findByIdAndDelete(userId)
            if(deletedUser != null) return res.status(200).json({message: "User deleted successfully!"})
            else return res.status(404).json({message: "User not found!"})
            }
    } catch (error) {
        console.log("Error deleting user: ", error);
        return res.status(500).json({message: "Server Error!"})
    }
    
}

export const updateUserRole = async (req, res) => {
    try {
        if(req.user.id == req.params.id) return res.status(403).json({message: "Can't update own role"})
        const userId = req.params.id
        if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})

        else{
            if(Object.keys(req.body).length == 0) return res.status(403).json({message: "No fields to update!"})

            const { role } = req.body 
            if(role !== "admin" && role !== "user") return res.status(400).json({message: "Bad Request!"})
            const updateData = {}
            updateData.role = role

            if(Object.keys(updateData).length == 0) return res.status(400).json({message: "No fields to update!"})

            else{
                const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true}).select("-password")
                if(updatedUser != null) return res.status(200).json({updatedUser})
                else return res.status(404).json({message: "User not found!"})
            }
        }
    } catch (error) {
        console.log("Error updating user: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}