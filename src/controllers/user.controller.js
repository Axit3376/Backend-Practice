import { validateObjectId } from "../utils/validateObjectId.js";
import { changeRoleService, createUserService, deleteUserService, getUserByIdService, getUsersService, updateUserService } from "../services/user.services.js";


export const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body

        // Check if any field is empty
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required!"})
        }

        const user = await createUserService(username, email, password)
        return res.status(201).json(user)
    } catch (error) {
        if(error.message == "User already exists!") return res.status(409).json({message: error.message})
        console.log("Create user error: ", error);
        return res.status(500).json({message: "Server Error!"})    
    }
}

export const getUsers = async (req, res) => {
    try {
        // Find all users and display their info except password
        const user = await getUsersService()
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
            const user = await getUserByIdService(userId)
            return res.status(200).json({user})
        }
    } catch (error) {
        if(error.message == "User not found!") return res.status(404).json({message: error.message})
        console.log("Getting user error: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})

        else{
            const { username, email } = req.body //get only the required data from the body and put it in a new object
            const updateData = {}
            if("username" in req.body) updateData.username = username
            if("email" in req.body) updateData.email = email
                        // Alternate way
                        // if(req.body.hasOwnProperty("username"))
            if(Object.keys(updateData).length == 0) return res.status(400).json({message: "No fields to update!"})
            const updatedUser = await updateUserService(userId, updateData)
            return res.status(200).json({updatedUser})
        }
    } catch (error) {
        if(error.message == "Bad Request!") return res.status(400).json({message: error.message})
        console.log("Error updating user: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})
        else{
            await deleteUserService(userId)
            return res.status(200).json({message: "User deleted successfully"})
        }
    } catch (error) {
        if(error.message == "User not found!") return res.status(404).json({message: error.message})
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
            if(Object.keys(req.body).length == 0) return res.status(400).json({message: "No fields to update!"})

            const { role } = req.body 
            const user = await changeRoleService(userId, role)

            return res.status(200).json({user})
        }
    } catch (error) {
        if(error.message == "Bad Request!") return res.status(400).json({message: error.message})
        console.log("Error updating user: ", error);
        return res.status(500).json({message: "Server Error!"})
        
    }
}