import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req,res,next)=>{
   try{
     const tokenString = req.header("Authorization");
    if(tokenString != null){
        const token = tokenString.replace("Bearer ","");

        jwt.verify(token, process.env.JWT_KEY,(err,decoded)=>{
            if(decoded != null){
                req.user = decoded;
                next();
            }else{
                console.log("Invalid token");
                res.satus(403).json({message:"Invalid token"});
            }
        })
    }else{
        next();
    }

   }catch(e){
       res.status(403).json({message:"Invalid token"});
       console.log(e.message);
   }
}