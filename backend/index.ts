import express, { Express, Request, Response } from "express"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"
import productRoutes from "./routes/product"
import cartRoutes from "./routes/cart"
import authRoutes from "./routes/auth"
import adminRoutes from "./routes/admin"
import orderRoutes from "./routes/order"
import feedbackRoutes from "./routes/feedback"
import { verifyAdmin } from "./middlewear/verifyToken"
import passport from "./passport"
import { initializeCookieSession } from './controller/authController'



dotenv.config();


const app: Express = express(); 
const corsOption = {
  origin:['https://www.mintleaves.in', 'http://mintleaves-bn70gx6b7-sujith-rajans-projects.vercel.app','http://localhost:3000'],
  credentials:true,
}


//////////////////////////// MIDDLEWEARS /////////////////////////////////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.mintleaves.in');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(initializeCookieSession())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())


//////////////////////////// ROUTES ///////////////////////////////////////
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/admin-dashboard",verifyAdmin,adminRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/feedback",feedbackRoutes)

const port = process.env.PORT || 8800;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
