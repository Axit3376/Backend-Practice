import { theMeService } from "../services/user.services.js";
import { userLoginService } from "../services/userLogin.service.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "All fields are required!" })
    
     const token = await userLoginService(email, password)

     return res.status(200).json({ token })
    
  } catch (error) {
    if(error.message == "Authentication failed!") return res.status(401).json({message: error.message})
    else{
      console.log("Login error:", error);
      return res.status(500).json({ message: "Server Error!" });
    }
  }
};

export const theMeFunction = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await theMeService(userId)
    return res.status(200).json({user})

  } catch (error) {
    if(error.message == "User not found") return res.status(404).json({message: error.message})
    else{
      console.log("Fetching user error:", error);
      return res.status(500).json({ message: "Server Error!" });
    }
  }
}