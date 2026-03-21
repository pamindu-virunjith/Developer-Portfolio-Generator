import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import portfoilioRouter from './routers/portfolioRouter.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import userRouter from './routers/userRouter.js';
dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(authMiddleware)

mongoose
  .connect(process.env.MOGODB_URL)
  .then(() => {
    console.log("Connected to the Database");
  })
  
  .catch((e) => {
    console.log("Database connnection is failed");
    console.log(e);
});

app.use("/api/portfolio", portfoilioRouter);
app.use("/api/user", userRouter);


app.listen(3000, (req, res) => {
  console.log('Server is running on port 3000');
})
