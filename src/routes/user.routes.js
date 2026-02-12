import {Router} from "express"
import { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserRole } from "../controllers/user.controller.js"
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js"
import { validateId, validateRequired } from "../middlewares/validation.middleware.js"

const userRouter = Router()

userRouter.post("/", validateRequired(['email', 'password', 'username']), createUser)
userRouter.get("/", authMiddleware, getUsers)
userRouter.get("/:id", validateId, getUserById)
userRouter.patch("/:id", validateId,authMiddleware, adminMiddleware, updateUser)
userRouter.delete("/:id", validateId,authMiddleware, adminMiddleware, deleteUser)
userRouter.patch("/:id/role", validateId,authMiddleware, adminMiddleware, updateUserRole)

export default userRouter