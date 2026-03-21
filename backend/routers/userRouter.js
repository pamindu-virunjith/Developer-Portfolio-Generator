import express from "express";
import { createUser, loginUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login",loginUser);
userRouter.delete('/:userId',deleteUser)

export default userRouter;