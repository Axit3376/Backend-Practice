import { Router } from "express";
import { loginUser, theMeFunction } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequired } from "../middlewares/validation.middleware.js";

const authRouter = Router()

authRouter.post('/login', validateRequired(['email', 'password']), loginUser)
authRouter.get("/me", authMiddleware, theMeFunction)

export default authRouter