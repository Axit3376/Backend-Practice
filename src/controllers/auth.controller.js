import { theMeService } from "../services/user.services.js";
import { userLoginService } from "../services/userLogin.service.js";

export const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    // if (!email || !password) return res.status(400).json({ message: "All fields are required!" })
    
     const token = await userLoginService(email, password)

     return res.status(200).json({ token })
    
  } catch (error) {
    next(error)
  }
};

export const theMeFunction = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await theMeService(userId)
    return res.status(200).json({user})

  } catch (error) {
    next(error)
  }
}