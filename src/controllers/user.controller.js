import { validateObjectId } from "../utils/validateObjectId.js";
import { changeRoleService, createUserService, deleteUserService, getUserByIdService, getUsersService, updateUserService } from "../services/user.services.js";


export const createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body

        // // Check if any field is empty
        // if(!username || !email || !password){
        //     return res.status(400).json({message: "All fields are required!"})
        // }

        const user = await createUserService(username, email, password)
        return res.status(201).json(user)
    } catch (error) {
        next(error)   
    }
}

export const getUsers = async (req, res, next) => {
    try {
        // Find all users and display their info except password
        const user = await getUsersService()
        return res.status(200).json({user})

    } catch (error) {
        next(error)
        
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        // if(!validateObjectId(userId)){
        //     return res.status(400).json({message: "Enter a valid user id"})
        // }
        
        const user = await getUserByIdService(userId)
        return res.status(200).json({user})
        
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        // if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})

            const { username, email } = req.body //get only the required data from the body and put it in a new object
            const updateData = {}
            if("username" in req.body) updateData.username = username
            if("email" in req.body) updateData.email = email
                        // Alternate way
                        // if(req.body.hasOwnProperty("username"))
            const updatedUser = await updateUserService(userId, updateData)
            return res.status(200).json({updatedUser})
    } catch (error) {
       next(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        // if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})
            await deleteUserService(userId)
            return res.status(200).json({message: "User deleted successfully"})
        }
    catch (error) {
       next(error)
    }
    
}

export const updateUserRole = async (req, res) => {
    try {
        if(req.user.id == req.params.id) return res.status(403).json({message: "Can't update own role"})
        const userId = req.params.id
        // if(!validateObjectId(userId)) return res.status(400).json({message: "Enter a valid user id"})

            if(Object.keys(req.body).length == 0) return res.status(400).json({message: "No fields to update!"})

            const { role } = req.body 
            const user = await changeRoleService(userId, role)

            return res.status(200).json({user})
        }
    catch (error) {
        next(error)
        
    }
}
