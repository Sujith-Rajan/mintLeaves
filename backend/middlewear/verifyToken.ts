
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    userId?: string;
  }

  //////////////////VERFIY AUTH//////////////////////////////////////////////////

export const verfyToken = (req:CustomRequest,res:Response,next:NextFunction) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, async (error : any , payload: any) => {
        if (error) return res.status(403).json({ message: "Token is not Valid!" });
        req.userId = payload.id
        next();
      });
}

/////////////////////////VERIFY ADMIN//////////////////////////////////////////

export const verifyAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
   
    const userId = req.userId;
  
 
    const userRole = "ADMIN"; 
    if (userRole !== "ADMIN") {
      return res.status(403).json({ message: "You are not an admin!" });
    }
  
    next(); 
  };