import { createPortfolio,getPortfolio,updatePortfolio,deletePortfolio } from "../controllers/portfolioController.js"
import express from "express"

const portfoilioRouter = express.Router()

portfoilioRouter.post("/", createPortfolio);
portfoilioRouter.get("/:username", getPortfolio);
portfoilioRouter.put("/:username", updatePortfolio);
portfoilioRouter.delete("/:username", deletePortfolio);

export default portfoilioRouter
