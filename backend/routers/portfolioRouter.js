import { createPortfolio,getPortfolio,updatePortfolio,deletePortfolio } from "../controllers/portfolioController.js"
import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";

const portfoilioRouter = express.Router()

portfoilioRouter.post("/", authMiddleware, createPortfolio);
portfoilioRouter.get("/:username", getPortfolio);
portfoilioRouter.put("/:username", authMiddleware, updatePortfolio);
portfoilioRouter.delete("/:username", authMiddleware, deletePortfolio);

export default portfoilioRouter
