import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "User creation failed", error: e.message });
    }
}


export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials (username incorrect)" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials (password incorrect)" });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_KEY);
        res.status(200).json({
            message : "User login successfully",
            token,
            user: user.username
         });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Login failed", error: e.message });
    } 
}

export async function deleteUser(req,res) {
    try{
    const deleted = await User.findByIdAndDelete(req.params.userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message:"User deleted successfully"
    })

  }catch(err){
    res.status(500).json({
      message: "Failes to delete User",
      error: err
    })
  }
}
