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
  origin:'https://www.mintleaves.in',
  credentials:true,
}
// Set preflight
app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://mintleaves.onrender.com" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");

//////////////////////////// MIDDLEWEARS /////////////////////////////////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.mintleaves.in');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  res.setHeader("Access-Control-Allow-Private-Network", 'true');
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
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
