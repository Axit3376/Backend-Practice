import {Router} from "express"
import { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserRole } from "../controllers/user.controller.js"
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js"

const userRouter = Router()

userRouter.post("/", createUser)
userRouter.get("/",authMiddleware, getUsers)
userRouter.get("/:id", getUserById)
userRouter.patch("/:id",authMiddleware, adminMiddleware, updateUser)
userRouter.delete("/:id",authMiddleware, adminMiddleware, deleteUser)
userRouter.patch("/:id/role",authMiddleware, adminMiddleware, updateUserRole)

export default userRouter