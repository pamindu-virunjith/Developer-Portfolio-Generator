import express from "express";
import { createUser, loginUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login",loginUser);
userRouter.delete('/:userId', authMiddleware,deleteUser)

export default userRouter;