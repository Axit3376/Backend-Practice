import { User } from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../errors/errors.js";

export const userLoginService = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) throw new AppError("Authentication failed!", 401)

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new AppError("Authentication failed!", 401)

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    return token
}