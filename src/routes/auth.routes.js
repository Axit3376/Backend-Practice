import { Router } from "express";
import { loginUser, theMeFunction } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post('/login', loginUser)
authRouter.get("/me", authMiddleware, theMeFunction)

export default authRouter