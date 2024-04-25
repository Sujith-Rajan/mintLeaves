import { PrismaClient, User } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import passport from "passport"
import cookieSession from 'cookie-session'

const prisma = new PrismaClient

interface GenerateTokenProps {
   user:{
    id:string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    role: string;
   } 
}

interface ExtendedUser extends User {
    newUser?: User;
  }

const age = 1000 * 60 * 60 * 24 * 7;

const generateToken = ({user}:GenerateTokenProps) => {
  
    return jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET_KEY as string,
        {
            expiresIn:age
        }
    )
}

//////////////////////// CREATE USER // /////////////////////////
export const creatUser = async(req:Request,res:Response) => {
    const {reCapthcToken} = req.body
    if(!reCapthcToken){
        return res.status(400).json({ error: 'reCAPTCHA token is missing' });
    }
    try{

        const { fullname, email, password, phone, role } =await req.body;
        if (!fullname || !email || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        const userExistEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(userExistEmail){
            return res.status(400).json({message:'User with this email already exists'})
        }

        const userExistPhone = await prisma.user.findUnique({
            where:{
                phone
            }
        })
        
        if(userExistPhone){
            return res.status(400).json({message:'User with this phone number already exists'})
        }

        const hashPassword = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data:{
                fullname,
                email,
                password:hashPassword,
                phone,
                role,
            }
        })
        res.status(200).json(user)
    }
    catch(error){
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}


////////////////////////  LOGIN   /////////////////////////////////////////////
export const loginUser = async(req:Request,res:Response) => {
    try{
        const {username,password} = await req.body

        const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: username },
                { phone: username }
              ]
            }
          })



        if(!user){
          return  res.status(400).json({message:"Email or Phone is invalid"})
        }
       
        const checkPasswordMatch = await bcrypt.compare(password,user.password)
        if(!checkPasswordMatch){
            return res.status(400).json({message:'invalid password'})
        }

////////////////////////////// GET TOKEN /////////////////////////////////////////
        const token = generateToken({user:user})
        const {password:userPassword,...remainUserData} = user
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            maxAge: age
        }).status(200).json(remainUserData)
      
    }
    catch(error){
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}




/////////////////////////////////////////  GOOGLE AUTH     //////////////////////////////////////////////////////////////////
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] })

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", (err: any, user: any) => {
    if (err) {
      console.error("Error in Google callback:", err)
      return res.status(500).json({ error: "Internal Server Error" })
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" })
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr)
        return res.status(500).json({ error: "Login failed" })
      }

      if (user && user.newUser) {
        const { id, displayName, emails, photos } = user;

        
        const updatedUser = {
          id,
          displayName,
          email: emails?.[0]?.value || "",
          avatar: photos?.[0]?.value || "",
          phone: "",
          role: "USER",
            
        };

        req.user = updatedUser;
       
    }
    const token = generateToken({user:user?.newUser})
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            maxAge: age
        })
     
    res.redirect(process.env.CLIENT_URL as string)

    })
  })(req, res, next)
}

export const logout = (req: Request, res: Response) => {
 
  req.logout(() => {})
  req.session = null
  res.clearCookie('token')
  res.status(200).json("successfully logout")
  res.redirect(process.env.CLIENT_URL as string)
}


export const loginSuccess = async (req: Request, res: Response) => {
    const newUser = (req.user as ExtendedUser)?.newUser;
    res.status(200).json(newUser) 
} 


export const initializeCookieSession = () => {
  return cookieSession({
    name: 'session',
    keys: [process.env.JWT_COOKIE_SECRET as string],
    maxAge: age,
    secure: false,
    httpOnly: true,
  })
}